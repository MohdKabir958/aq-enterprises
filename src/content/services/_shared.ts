/**
 * Shared fragments for service content.
 * Keep these factual and non-fabricated; customize per-service copy in each file.
 */

import type { ProcessStep } from '@/types';

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

export const warrantyBody = `Warranty terms depend on the selected equipment and installation package. Hardware carries the applicable manufacturer warranty for the products supplied on your invoice. Workmanship cover for the installation is confirmed in your quotation and handover notes.

Warranty handling depends on the product line and fault type. We help you identify whether an issue is configuration, cabling, power, or a hardware claim so support is directed correctly. We do not publish a single fixed workmanship duration in marketing copy because it varies by package.`;

export const brandsBody = `Depending on the site and budget, we commonly install and support established CCTV and security brands used across Hyderabad projects, including Hikvision, CP Plus, Dahua, Uniview, Honeywell, Bosch, Godrej, and Panasonic.

These are brands we supply and install when they fit the brief — not claims of authorized dealership, partnership, or certification unless separately verified. The right brand is a fit decision: resolution needs, low-light performance, storage plan, and supportability matter more than a logo. We recommend options during the site survey rather than pushing a single default.`;
