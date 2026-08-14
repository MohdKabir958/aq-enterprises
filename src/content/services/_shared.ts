/**
 * Shared fragments for service content.
 * Keep these factual and non-fabricated; customize per-service copy in each file.
 */

import type { ProcessStep } from '@/types';
import { SUPPORTED_BRANDS, WARRANTY_HANDLING_COPY, WARRANTY_PUBLIC_COPY } from '@/lib/business';

/** Standard installation workflow — descriptions should still be customized per service. */
export function standardProcessSteps(overrides?: Partial<Record<string, string>>): ProcessStep[] {
  return [
    {
      title: 'Site survey',
      description:
        overrides?.survey ??
        'We walk the property with you, note entry points, lighting, power availability, and recording needs, then recommend a practical camera plan before any cabling begins.',
    },
    {
      title: 'Installation',
      description:
        overrides?.installation ??
        'Cameras, recorders, and cabling are installed with neat routing, weather-safe outdoor mounts where needed, and clear labeling for future service.',
    },
    {
      title: 'Configuration',
      description:
        overrides?.configuration ??
        'Recording schedules, motion zones, user accounts, and remote viewing are configured to match how you actually use the property.',
    },
    {
      title: 'Testing',
      description:
        overrides?.testing ??
        'We verify day/night clarity, coverage angles, storage retention, alerts, and remote access before sign-off.',
    },
    {
      title: 'Customer handover',
      description:
        overrides?.handover ??
        'You receive a walkthrough of live view, playback, and basic troubleshooting, plus guidance on what to check during the first weeks of use.',
    },
  ];
}

export const warrantyBody = `${WARRANTY_PUBLIC_COPY}

${WARRANTY_HANDLING_COPY}`;

export const brandsBody = `Depending on the site and budget, we commonly install and support established CCTV and security brands used across Hyderabad projects, including ${SUPPORTED_BRANDS.join(', ')}.

These are brands we supply and install when they fit the brief — not claims of authorized dealership, partnership, or certification unless separately verified. The right brand is a fit decision: resolution needs, low-light performance, storage plan, and supportability matter more than a logo. We recommend options during the site survey rather than pushing a single default.`;
