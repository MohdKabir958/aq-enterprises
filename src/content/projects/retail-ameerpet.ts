import { createVerifiedProject } from './_factory';

/** Published project record from PROJECTS_DATA. Handover quote stays draft until the client confirms permission. */
export const retailAmeerpetProject = createVerifiedProject({
  sourceId: 'retail-ameerpet',
  slug: 'retail-ameerpet',
  name: 'Retail Chain, 6 Outlets',
  category: 'Office',
  locationLabel: 'Ameerpet & Kukatpally, Hyderabad',
  locationSlug: 'ameerpet',
  relatedLocations: ['kukatpally'],
  cameras: 48,
  brandLabel: 'CP Plus',
  duration: '9 Days',
  imageAlt: 'CCTV camera system deployed across retail chain outlets in Hyderabad',
  summary:
    'Published multi-outlet retail CCTV rollout across Ameerpet and Kukatpally — 48 CP Plus cameras, 9 days.',
  overview: `This published project record covers a retail chain CCTV deployment across six outlets in Ameerpet and Kukatpally, Hyderabad.

Recorded fields: category Office (commercial/retail portfolio), 48 cameras, CP Plus brand, installation duration 9 days, six outlets. Per-store camera maps and SKU lists are not published and are omitted.`,
  relatedServices: [
    'retail-shop-cctv-installation',
    'office-cctv-installation',
    'ip-camera-installation',
    'cctv-amc-maintenance',
  ],
  relatedProjects: ['office-hitech', 'hospital-jubilee'],
  seoTitle: 'Retail CCTV Project — Ameerpet & Kukatpally | AQ Enterprises',
  seoDescription:
    'Case study: 6-outlet retail CCTV in Ameerpet and Kukatpally — 48 CP Plus cameras, 9-day rollout. Published project from AQ Enterprises.',
  keywords: ['retail CCTV Ameerpet', 'multi outlet CCTV Hyderabad', 'CP Plus shop cameras'],
});
