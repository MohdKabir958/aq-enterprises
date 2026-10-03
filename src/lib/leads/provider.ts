/**
 * @file provider.ts
 * @description Lead delivery provider interfaces and contract.
 *
 * ARCHITECTURAL DESIGN:
 * Lead delivery is abstracted via `LeadDeliveryProvider`.
 * Today, SMTP is the primary active delivery method.
 * The architecture is prepared for a durable `LeadStore` (PostgreSQL, Supabase, DynamoDB)
 * when infrastructure becomes available, without relying on unreliable local file persistence.
 */

export interface NormalizedLeadPayload {
  name: string;
  phone: string;
  normalizedPhone: string;
  propertyType: string;
  formSource: string;
  pagePath: string;
  landingPage: string;
  referrer: string;
  firstTouchSource: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  utmTerm: string;
  submittedAt: string;
}

export interface LeadDeliveryResult {
  success: boolean;
  error?: string;
  deliveryId?: string;
}

export interface LeadDeliveryProvider {
  /** Deliver a validated, normalized lead to its destination. */
  deliver(lead: NormalizedLeadPayload): Promise<LeadDeliveryResult>;
}

/**
 * Interface for optional future durable persistence (e.g., Database or CRM webhook).
 * Documented explicitly so production teams know how to connect durable persistence.
 */
export interface LeadStore {
  save(lead: NormalizedLeadPayload): Promise<{ id: string }>;
}
