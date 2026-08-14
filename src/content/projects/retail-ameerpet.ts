import { createVerifiedProject } from './_factory';

/** Verified from PROJECTS_DATA + matching TESTIMONIALS (6 stores / retail chain). */
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
    'Verified multi-outlet retail CCTV rollout across Ameerpet and Kukatpally — 48 CP Plus cameras, 9 days.',
  overview: `This published project record covers a retail chain CCTV deployment across six outlets in Ameerpet and Kukatpally, Hyderabad.

Verified facts: category Office (commercial/retail portfolio), 48 cameras, CP Plus brand, installation duration 9 days, six outlets. Per-store camera maps and SKU lists are not published and are omitted.`,
  relatedServices: [
    'retail-shop-cctv-installation',
    'office-cctv-installation',
    'ip-camera-installation',
    'cctv-amc-maintenance',
  ],
  relatedProjects: ['office-hitech', 'hospital-jubilee'],
  testimonial: {
    quote:
      'Rolled out across all 6 stores in under two weeks with zero downtime. Highly recommended.',
    name: 'Arjun Mehta',
    role: 'Retail Operations Manager, Hyderabad',
  },
  seoTitle: 'Retail CCTV Project — Ameerpet & Kukatpally | AQ Enterprises',
  seoDescription:
    'Case study: 6-outlet retail CCTV in Ameerpet and Kukatpally — 48 CP Plus cameras, 9-day rollout. Verified project from AQ Enterprises.',
  keywords: ['retail CCTV Ameerpet', 'multi outlet CCTV Hyderabad', 'CP Plus shop cameras'],
});
