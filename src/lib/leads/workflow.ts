import { z } from 'zod';
import type { NormalizedLeadPayload } from './provider';
export const LEAD_STAGES = [
  ['new', 'New'], ['contacted', 'Contacted'], ['survey_scheduled', 'Survey Scheduled'],
  ['quotation_sent', 'Quotation Sent'], ['won', 'Won'], ['lost', 'Lost'],
] as const;
export const leadStageSchema = z.enum(['new', 'contacted', 'survey_scheduled', 'quotation_sent', 'won', 'lost']);
export type LeadStage = z.infer<typeof leadStageSchema>;
export const leadUpdateSchema = z.object({
  id: z.uuid(), revision: z.number().int().min(1),
  lead_status: leadStageSchema, notes: z.string().trim().max(5000),
  follow_up_at: z.iso.datetime({ offset: true }).nullable(),
  appointment_at: z.iso.datetime({ offset: true }).nullable(),
}).refine(v => v.lead_status !== 'survey_scheduled' || v.appointment_at !== null, {
  message: 'Choose a confirmed appointment time before marking the survey scheduled.',
});
export interface LeadRecord {
  id: string; payload: NormalizedLeadPayload; email_status: string;
  created_at: string; lead_status: LeadStage; notes: string;
  follow_up_at: string | null; appointment_at: string | null;
  revision: number; email_attempts: number; last_email_attempt_at: string | null;
}
export type StoredLeadRecord = Omit<LeadRecord, 'created_at' | 'follow_up_at' | 'appointment_at' | 'last_email_attempt_at'> & {
  created_at: Date; follow_up_at: Date | null; appointment_at: Date | null; last_email_attempt_at: Date | null;
};
export function serializeLead(lead: StoredLeadRecord): LeadRecord {
  return { ...lead, created_at: lead.created_at.toISOString(),
    follow_up_at: lead.follow_up_at?.toISOString() ?? null,
    appointment_at: lead.appointment_at?.toISOString() ?? null,
    last_email_attempt_at: lead.last_email_attempt_at?.toISOString() ?? null,
  };
}
