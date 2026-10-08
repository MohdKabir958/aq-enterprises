import { z } from 'zod';
export const CHANNELS = ['Google', 'Justdial', 'Facebook', 'Instagram', 'WhatsApp', 'Direct', 'Other'] as const;
export const activitySchema = z.object({
  event: z.enum(['page_view', 'phone_click', 'whatsapp_click', 'cart_share']),
  path: z.string().max(220).regex(/^\/(?:[a-z0-9-]+\/?)*$/).refine(p => !/^\/(?:admin|api)(?:\/|$)/.test(p)),
  channel: z.enum(CHANNELS),
});
export type ActivityEvent = z.infer<typeof activitySchema>['event'];
export function sourceChannel(source: string): typeof CHANNELS[number] {
  const text = source.toLowerCase();
  if (text.includes('google') || text === 'gmb' || text === 'gbp') return 'Google';
  if (text.includes('justdial')) return 'Justdial';
  if (text.includes('facebook') || text === 'fb') return 'Facebook';
  if (text.includes('instagram') || text === 'ig') return 'Instagram';
  if (text.includes('whatsapp')) return 'WhatsApp';
  if (!text || text === 'direct') return 'Direct';
  return 'Other';
}
