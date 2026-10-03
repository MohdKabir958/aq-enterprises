'use server';

/**
 * @file submit-lead.ts
 * @description Hardened Server Action for site survey & quote requests.
 *
 * PIPELINE:
 * 1. Honeypot check (silently drop bot submissions)
 * 2. Strict server-side input length & format validation
 * 3. Rate limiting (PII-hashed key, memory-bounded fallback)
 * 4. Normalization and attribution sanitation
 * 5. Delivery via LeadDeliveryProvider (SMTP singleton with retries)
 *
 * SECURITY:
 * Zero customer PII is ever written to console streams or system logs.
 */

import { headers } from 'next/headers';
import {
  LEAD_FIELD_LIMITS,
  normalizeIndianPhoneNumber,
  sanitizeAttributionField,
  validateName,
  validatePhone,
} from '@/lib/validation/lead';
import { defaultLeadRateLimiter, hashRateLimitKey } from '@/lib/security/rate-limiter';
import { defaultSmtpProvider } from '@/lib/leads/smtp-provider';
import type { NormalizedLeadPayload } from '@/lib/leads/provider';

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
  formSource?: 'bottom_form' | 'quote_modal';
  /** Honeypot — must remain empty */
  website?: string;
  attribution?: LeadAttributionPayload;
}

export async function submitLead(
  data: LeadData,
): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. Honeypot protection: bots filling hidden fields are silently accepted without sending email
    if (data.website && data.website.trim().length > 0) {
      return { success: true };
    }

    // 2. Strict input validation with explicit length bounds
    const nameCheck = validateName(data.name || '');
    if (!nameCheck.valid) {
      return { success: false, error: nameCheck.error };
    }

    const phoneCheck = validatePhone(data.phone || '');
    if (!phoneCheck.valid) {
      return { success: false, error: phoneCheck.error };
    }

    const cleanName = data.name.trim().slice(0, LEAD_FIELD_LIMITS.NAME_MAX);
    const cleanPhone = data.phone.trim().slice(0, LEAD_FIELD_LIMITS.PHONE_MAX);
    const normalizedPhone = normalizeIndianPhoneNumber(cleanPhone);
    const cleanProperty = (data.propertyType || 'Not specified')
      .trim()
      .slice(0, LEAD_FIELD_LIMITS.PROPERTY_TYPE_MAX);
    const formSource = (data.formSource || 'bottom_form')
      .trim()
      .slice(0, LEAD_FIELD_LIMITS.FORM_SOURCE_MAX);

    // 3. Request origin hint for rate-limiting (without trusting arbitrary spoofed headers)
    let ipHint = 'unknown';
    try {
      const h = await headers();
      const fwd = h.get('x-forwarded-for')?.split(',')[0]?.trim();
      if (fwd && /^[0-9a-fA-F:.]+$/.test(fwd)) {
        ipHint = fwd;
      }
    } catch {
      ipHint = 'unknown';
    }

    // 4. Rate-limiting check with hashed PII keys
    const rateLimitKey = hashRateLimitKey('lead', `${ipHint}:${normalizedPhone}`);
    const rateCheck = await defaultLeadRateLimiter.check(rateLimitKey);
    if (!rateCheck.allowed) {
      return {
        success: false,
        error: `Please wait ${rateCheck.retryAfterSeconds ?? 30} seconds before submitting again.`,
      };
    }

    // 5. Sanitize attribution payload with strict length caps
    const rawAttr = data.attribution || {};
    const sanitizedPayload: NormalizedLeadPayload = {
      name: cleanName,
      phone: cleanPhone,
      normalizedPhone,
      propertyType: cleanProperty,
      formSource,
      pagePath: sanitizeAttributionField(rawAttr.pagePath, LEAD_FIELD_LIMITS.URL_MAX),
      landingPage: sanitizeAttributionField(rawAttr.landingPage, LEAD_FIELD_LIMITS.URL_MAX),
      referrer: sanitizeAttributionField(rawAttr.referrer, LEAD_FIELD_LIMITS.URL_MAX),
      firstTouchSource: sanitizeAttributionField(rawAttr.firstTouchSource),
      utmSource: sanitizeAttributionField(rawAttr.utmSource),
      utmMedium: sanitizeAttributionField(rawAttr.utmMedium),
      utmCampaign: sanitizeAttributionField(rawAttr.utmCampaign),
      utmContent: sanitizeAttributionField(rawAttr.utmContent),
      utmTerm: sanitizeAttributionField(rawAttr.utmTerm),
      submittedAt: new Date().toISOString(),
    };

    // 6. Deliver lead via abstracted provider (SMTP singleton)
    return await defaultSmtpProvider.deliver(sanitizedPayload);
  } catch (error) {
    console.error('[submitLead] Server action execution failed (details omitted for security).');
    if (process.env.NODE_ENV === 'development') {
      console.error(error);
    }
    return {
      success: false,
      error: 'An unexpected error occurred while processing your request. Please call us directly.',
    };
  }
}
