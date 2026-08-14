/**
 * Shared fragments for location landing pages.
 * Installation steps reuse the service-layer helper so process language stays consistent.
 */

import type { ProcessStep } from '@/types';
import { standardProcessSteps } from '@/content/services/_shared';

export { standardProcessSteps };

export function locationProcessSteps(areaLabel: string, overrides?: Partial<Record<string, string>>): ProcessStep[] {
  return standardProcessSteps({
    survey:
      overrides?.survey ??
      `We visit the property in ${areaLabel}, note entry points, lighting, power, and recording needs, then recommend a practical camera plan before any cabling begins.`,
    installation:
      overrides?.installation ??
      `Cameras, recorders, and cabling are installed with neat routing suited to the building type common in ${areaLabel}, with weather-safe outdoor mounts where needed.`,
    configuration:
      overrides?.configuration ??
      'Recording schedules, motion zones, user accounts, and remote viewing are configured to match how the site is actually used day to day.',
    testing:
      overrides?.testing ??
      'We verify day/night clarity, coverage angles, storage retention, alerts, and remote access before sign-off.',
    handover:
      overrides?.handover ??
      'You receive a walkthrough of live view, playback, and basic checks, plus guidance for the first weeks of use.',
  });
}

export const maintenanceBody = `After installation, cameras still need cleaning, storage health checks, and occasional configuration updates — especially outdoor units exposed to Hyderabad dust and monsoon humidity.

AQ Enterprises offers planned CCTV AMC and maintenance for homes, societies, offices, and industrial sites across our Hyderabad service areas. Ask for an AMC option when we quote your installation, or open the CCTV AMC & Maintenance service page linked below.

Between visits, repair and troubleshooting support is available when a channel drops, night vision weakens, or remote viewing stops working.`;
