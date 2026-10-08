import { z } from 'zod';

export const SERVICE_OPTIONS = [
  ['cctv', 'CCTV installation'],
  ['networking', 'Internet, LAN and Wi-Fi'],
  ['access-control', 'Access control, biometric or door entry'],
  ['other', 'Other services'],
] as const;
export const TIME_OPTIONS = ['Morning', 'Afternoon', 'Evening'] as const;
export const requirementsSchema = z.object({
  service: z.enum(['', 'cctv', 'networking', 'access-control', 'other']),
  installation: z.enum(['', 'new', 'existing']),
  cameraCount: z.number().int().min(1).max(500).nullable(),
  networkPoints: z.number().int().min(1).max(1000).nullable(),
  doors: z.number().int().min(1).max(100).nullable(),
  locality: z.string().trim().max(120),
  surveyRequested: z.boolean(),
  preferredDate: z.union([z.literal(''), z.iso.date()]),
  preferredTime: z.enum(['', ...TIME_OPTIONS]),
});
export type Requirements = z.infer<typeof requirementsSchema>;
export const emptyRequirements: Requirements = {
  service: '', installation: '', cameraCount: null, networkPoints: null,
  doors: null, locality: '', surveyRequested: false,
  preferredDate: '', preferredTime: '',
};
export function indiaToday() {
  return new Date(Date.now() + 330 * 60000).toISOString().slice(0, 10);
}
export function surveyDateLimit() {
  return new Date(Date.now() + (90 * 24 * 60 + 330) * 60000).toISOString().slice(0, 10);
}
export function requirementsSummary(r?: Requirements) {
  if (!r) return '';
  return [
    r.service && `Service: ${SERVICE_OPTIONS.find(([id]) => id === r.service)?.[1]}`,
    r.installation && `Installation: ${r.installation === 'new' ? 'New system' : 'Existing system'}`,
    r.locality && `Hyderabad locality: ${r.locality}`,
    r.service === 'cctv' && r.cameraCount && `Approximate cameras: ${r.cameraCount}`,
    r.service === 'networking' && r.networkPoints && `Approximate network points: ${r.networkPoints}`,
    r.service === 'access-control' && r.doors && `Doors / entry points: ${r.doors}`,
    r.surveyRequested && `Survey requested: ${r.preferredDate}, ${r.preferredTime} (Hyderabad time; awaiting confirmation)`,
  ].filter(Boolean).join('\n');
}
