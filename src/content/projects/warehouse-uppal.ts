import { createVerifiedProject } from './_factory';

export const warehouseUppalProject = createVerifiedProject({
  sourceId: 'warehouse-uppal',
  slug: 'warehouse-uppal',
  name: 'Cold Storage Warehouse, Uppal',
  category: 'Industrial',
  locationLabel: 'Uppal, Hyderabad',
  locationSlug: 'uppal',
  cameras: 28,
  brandLabel: 'Dahua',
  duration: '5 Days',
  imageAlt: 'Warehouse CCTV system installation at a cold storage facility in Uppal, Hyderabad',
  summary:
    'Verified cold-storage warehouse CCTV in Uppal — 28 Dahua cameras, completed in 5 days.',
  overview: `This published project record covers CCTV at a cold storage warehouse in Uppal, Hyderabad.

Verified facts: category Industrial, 28 cameras, Dahua brand, installation duration 5 days, facility type cold storage warehouse. Dock/aisle maps and environmental camera specs are not published.`,
  relatedServices: [
    'warehouse-cctv-installation',
    'factory-cctv-surveillance',
    'ptz-camera-installation',
    'cctv-amc-maintenance',
  ],
  relatedProjects: ['factory-nacharam', 'school-kompally'],
  seoTitle: 'Warehouse CCTV Project — Uppal | AQ Enterprises',
  seoDescription:
    'Case study: cold storage warehouse CCTV in Uppal — 28 Dahua cameras, 5-day install. Verified industrial project from AQ Enterprises.',
  keywords: ['warehouse CCTV Uppal', 'cold storage CCTV Hyderabad', 'Dahua warehouse cameras'],
});
