'use server';
import { randomUUID } from 'node:crypto';
import { headers } from 'next/headers';
import { z } from 'zod';
import {
  LEAD_FIELD_LIMITS,
  normalizeIndianPhoneNumber,
  sanitizeAttributionField,
  validateName,
  validatePhone,
} from '@/lib/validation/lead';
import {
  defaultLeadRateLimiter,
  hashRateLimitKey,
} from '@/lib/security/rate-limiter';
import { defaultSmtpProvider } from '@/lib/leads/smtp-provider';
import type { NormalizedLeadPayload } from '@/lib/leads/provider';
import { cartItemsSchema, type CartItem } from '@/lib/cms/cart';
import { getProducts } from '@/lib/cms/catalogue';
import { databaseConfigured, db } from '@/lib/cms/db';
import { consumeRateLimit } from '@/lib/cms/auth';
import { requirementsSchema, requirementsSummary, indiaToday, surveyDateLimit, type Requirements } from '@/lib/leads/requirements';
export interface LeadAttributionPayload {
  landingPage?: string;
  referrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  firstTouchSource?: string;
  pagePath?: string;
}
export interface LeadData {
  name: string;
  phone: string;
  propertyType: string;
  formSource?: 'bottom_form' | 'quote_modal' | 'checkout' | 'site_survey';
  requirements?: Requirements;
  website?: string;
  attribution?: LeadAttributionPayload;
  email?: string;
  address?: string;
  message?: string;
  cartItems?: CartItem[];
  submissionId?: string;
}
const leadSchema = z.object({
  name: z.string().max(80),
  phone: z.string().max(20),
  propertyType: z.string().max(80),
  formSource: z
    .enum(['bottom_form', 'quote_modal', 'checkout', 'site_survey'])
    .default('bottom_form'),
  website: z.string().max(100).optional(),
  email: z.union([z.literal(''), z.email().max(254)]).optional(),
  address: z.string().max(500).optional(),
  message: z.string().max(3000).optional(),
  cartItems: cartItemsSchema.optional(),
  submissionId: z.uuid().optional(),
  requirements: requirementsSchema.optional(),
  attribution: z
    .object({
      landingPage: z.string().max(1024).optional(),
      referrer: z.string().max(1024).optional(),
      utmSource: z.string().max(255).optional(),
      utmMedium: z.string().max(255).optional(),
      utmCampaign: z.string().max(255).optional(),
      utmContent: z.string().max(255).optional(),
      utmTerm: z.string().max(255).optional(),
      firstTouchSource: z.string().max(255).optional(),
      pagePath: z.string().max(1024).optional(),
    })
    .optional(),
});
export async function submitLead(
  data: LeadData,
): Promise<{ success: boolean; error?: string }> {
  try {
    const parsed = leadSchema.safeParse(data);
    if (!parsed.success)
      return {
        success: false,
        error: 'Please check your contact details and selected items.',
      };
    const input = parsed.data;
    if (input.website?.trim()) return { success: true };
    const requirements = input.requirements;
    if (input.formSource === 'site_survey' && !requirements?.surveyRequested)
      return { success: false, error: 'Please complete your survey preferences.' };
    if (requirements?.surveyRequested && (
      !requirements.service || requirements.locality.length < 3 ||
      !requirements.preferredTime || requirements.preferredDate < indiaToday() ||
      requirements.preferredDate > surveyDateLimit() || (input.address?.trim().length ?? 0) < 5
    )) return { success: false, error: 'Enter your service, locality, site address and a preferred survey time within the next 90 days.' };
    const nameCheck = validateName(input.name),
      phoneCheck = validatePhone(input.phone);
    if (!nameCheck.valid || !phoneCheck.valid)
      return { success: false, error: nameCheck.error || phoneCheck.error };
    if (
      input.formSource === 'checkout' &&
      (!input.cartItems?.length ||
        !input.address ||
        input.address.trim().length < 5)
    )
      return {
        success: false,
        error: 'Select at least one product and enter your site address.',
      };
    let orderSummary = '';
    const orderItems: {
      id: string;
      name: string;
      quantity: number;
      unitPrice: number | null;
    }[] = [];
    if (input.cartItems?.length) {
      const products = await getProducts();
      for (const item of input.cartItems) {
        const product = products.find((p) => p.id === item.id);
        if (!product)
          return {
            success: false,
            error:
              'An item in your cart is no longer available. Refresh your cart before submitting.',
          };
        const price = product.offerPrice ?? product.price;
        orderItems.push({
          id: product.id,
          name: product.name,
          quantity: item.quantity,
          unitPrice: price,
        });
      }
      orderSummary = orderItems
        .map(
          (i) =>
            `${i.name} × ${i.quantity} — ${i.unitPrice === null ? 'Quotation required' : `₹${i.unitPrice.toLocaleString('en-IN')} each`}`,
        )
        .join('\n');
      orderSummary +=
        '\nFinal installation scope, taxes, delivery and availability are confirmed in the quotation.';
    }
    const h = await headers();
    const ip = process.env.VERCEL
      ? h.get('x-vercel-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
      : 'local';
    const normalizedPhone = normalizeIndianPhoneNumber(input.phone);
    const allowed = databaseConfigured()
      ? (await consumeRateLimit(`lead-ip:${ip}`, 10, 600)) &&
        (await consumeRateLimit(`lead-phone:${normalizedPhone}`, 3, 600))
      : (await defaultLeadRateLimiter.check(hashRateLimitKey('lead-ip', ip)))
          .allowed &&
        (
          await defaultLeadRateLimiter.check(
            hashRateLimitKey('lead-phone', normalizedPhone),
          )
        ).allowed;
    if (!allowed)
      return {
        success: false,
        error: 'Too many requests. Please wait before submitting again.',
      };
    const a = input.attribution ?? {};
    const payload: NormalizedLeadPayload = {
      name: input.name.trim(),
      phone: input.phone.trim(),
      normalizedPhone,
      propertyType: input.propertyType.trim() || 'Not specified',
      formSource: input.formSource,
      email: input.email?.trim() || '',
      address: input.address?.trim() || '',
      message: input.message?.trim() || '',
      orderSummary,
      orderItems,
      requirements,
      requirementsSummary: requirementsSummary(requirements),
      pagePath: sanitizeAttributionField(a.pagePath, LEAD_FIELD_LIMITS.URL_MAX),
      landingPage: sanitizeAttributionField(
        a.landingPage,
        LEAD_FIELD_LIMITS.URL_MAX,
      ),
      referrer: sanitizeAttributionField(a.referrer, LEAD_FIELD_LIMITS.URL_MAX),
      firstTouchSource: sanitizeAttributionField(a.firstTouchSource),
      utmSource: sanitizeAttributionField(a.utmSource),
      utmMedium: sanitizeAttributionField(a.utmMedium),
      utmCampaign: sanitizeAttributionField(a.utmCampaign),
      utmContent: sanitizeAttributionField(a.utmContent),
      utmTerm: sanitizeAttributionField(a.utmTerm),
      submittedAt: new Date().toISOString(),
    };
    const id = input.submissionId ?? randomUUID();
    if (databaseConfigured()) {
      const stored = await db().query(
        "INSERT INTO aq_enquiries(id,payload,email_status,email_attempts,last_email_attempt_at) VALUES($1,$2,'sending',1,now()) ON CONFLICT DO NOTHING RETURNING id",
        [id, JSON.stringify(payload)],
      );
      if (!stored.rowCount) return { success: true };
    }
    const delivery = await defaultSmtpProvider.deliver(payload);
    if (databaseConfigured()) {
      await db().query('UPDATE aq_enquiries SET email_status=$2 WHERE id=$1 AND email_attempts=1', [
        id,
        delivery.success ? 'sent' : 'failed',
      ]);
      return { success: true };
    }
    return delivery;
  } catch {
    console.error('[submitLead] Request failed; customer details omitted.');
    return {
      success: false,
      error:
        'Unable to send your request right now. Please call or WhatsApp us directly.',
    };
  }
}
