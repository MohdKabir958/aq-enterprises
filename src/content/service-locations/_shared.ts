import type { ProcessStep } from '@/types';
import { locationProcessSteps } from '@/content/locations/_shared';

export { locationProcessSteps };

export function serviceLocationProcess(
  serviceLabel: string,
  locationLabel: string,
  overrides?: Partial<Record<string, string>>,
): ProcessStep[] {
  return locationProcessSteps(locationLabel, {
    survey:
      overrides?.survey ??
      `We survey the site in ${locationLabel} with a ${serviceLabel} brief in mind — entry points, lighting, power, network paths, and how the property is actually used day to day.`,
    installation:
      overrides?.installation ??
      `Installation follows the plan agreed for ${locationLabel}: neat routing for the building type, weather-safe outdoor mounts where needed, and clear labeling for future service.`,
    configuration:
      overrides?.configuration ??
      `Recording, alerts, user accounts, and remote viewing are configured for how ${serviceLabel.toLowerCase()} is expected to operate at this site.`,
    testing:
      overrides?.testing ??
      'We verify coverage, day/night clarity, storage retention, and remote access before handover.',
    handover:
      overrides?.handover ??
      'You get a walkthrough of live view, playback, and basic checks — plus guidance for the first weeks of use.',
  });
}

export const whyAqItems = [
  'Survey-led design from our Mallapur, Hyderabad base — we do not claim a branch office in every neighborhood.',
  'Systems sized to the property type, not a one-size kit.',
  'Honest scope: we omit claims we cannot verify in published project data.',
  'AMC and repair paths available after install when you need ongoing support.',
];
