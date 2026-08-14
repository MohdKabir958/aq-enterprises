import { createVerifiedProject } from './_factory';

/** Verified from PROJECTS_DATA + matching TESTIMONIALS entry (Factory Owner, Nacharam). */
export const factoryNacharamProject = createVerifiedProject({
  sourceId: 'factory-nacharam',
  slug: 'factory-nacharam',
  name: 'Manufacturing Unit, Nacharam',
  category: 'Industrial',
  locationLabel: 'Nacharam, Hyderabad',
  locationSlug: 'nacharam',
  cameras: 32,
  brandLabel: 'Dahua',
  duration: '6 Days',
  imageAlt: 'Industrial CCTV surveillance system at a manufacturing unit in Nacharam, Hyderabad',
  summary:
    'Verified factory CCTV installation in Nacharam — 32 Dahua cameras, completed in 6 days.',
  overview: `This published project record covers CCTV at a manufacturing unit in Nacharam, Hyderabad.

Verified facts: category Industrial, 32 cameras, Dahua brand, installation duration 6 days. Floor plans, zone lists, and production-line camera maps are not in the published record and are not fabricated here.`,
  relatedServices: [
    'factory-cctv-surveillance',
    'warehouse-cctv-installation',
    'ptz-camera-installation',
    'cctv-amc-maintenance',
  ],
  relatedProjects: ['warehouse-uppal', 'school-kompally'],
  testimonial: {
    quote:
      'Installation was clean and the team explained every camera angle before finalizing. Zero blind spots in our warehouse now.',
    name: 'Ravi Kumar',
    role: 'Factory Owner, Nacharam',
  },
  seoTitle: 'Factory CCTV Project — Nacharam | AQ Enterprises',
  seoDescription:
    'Case study: manufacturing unit CCTV in Nacharam, Hyderabad — 32 Dahua cameras, 6-day install. Verified industrial project from AQ Enterprises.',
  keywords: ['factory CCTV Nacharam', 'industrial CCTV Hyderabad', 'Dahua factory cameras'],
});
