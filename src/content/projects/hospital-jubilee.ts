import { createVerifiedProject } from './_factory';

export const hospitalJubileeProject = createVerifiedProject({
  sourceId: 'hospital-jubilee',
  slug: 'hospital-jubilee',
  name: 'Hospital, Jubilee Hills',
  category: 'Office',
  locationLabel: 'Jubilee Hills, Hyderabad',
  locationSlug: 'jubilee-hills',
  cameras: 35,
  brandLabel: 'Honeywell',
  duration: '6 Days',
  imageAlt: 'Hospital CCTV surveillance system installed at a hospital in Jubilee Hills, Hyderabad',
  summary:
    'Published hospital CCTV installation in Jubilee Hills — 35 Honeywell cameras, completed in 6 days.',
  overview: `This published project record covers CCTV at a hospital in Jubilee Hills, Hyderabad.

Recorded fields: category Office (commercial/institutional portfolio classification in source data), 35 cameras, Honeywell brand, installation duration 6 days. Ward-level privacy zoning and clinical area policies are not detailed in the published record and are not invented here.`,
  relatedServices: [
    'hospital-cctv-installation',
    'access-control-systems',
    'ip-camera-installation',
    'cctv-amc-maintenance',
  ],
  relatedProjects: ['office-hitech', 'villa-banjara', 'school-kompally'],
  seoTitle: 'Hospital CCTV Project — Jubilee Hills | AQ Enterprises',
  seoDescription:
    'Case study: Hospital CCTV in Jubilee Hills — 35 Honeywell cameras, 6-day install. Published project from AQ Enterprises.',
  keywords: ['hospital CCTV Jubilee Hills', 'clinic CCTV Hyderabad', 'Honeywell hospital cameras'],
});
