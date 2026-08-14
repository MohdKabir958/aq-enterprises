import { createVerifiedProject } from './_factory';

/** Verified from PROJECTS_DATA + matching TESTIMONIALS entry (Villa Owner, Banjara Hills). */
export const villaBanjaraProject = createVerifiedProject({
  sourceId: 'villa-banjara',
  slug: 'villa-banjara',
  name: 'Residential Villa, Banjara Hills',
  category: 'Home',
  locationLabel: 'Banjara Hills, Hyderabad',
  locationSlug: 'banjara-hills',
  cameras: 8,
  brandLabel: 'Hikvision',
  duration: '2 Days',
  imageAlt: 'CCTV installation at a residential villa in Banjara Hills, Hyderabad',
  summary:
    'Verified villa CCTV installation in Banjara Hills — 8 Hikvision cameras, completed in 2 days.',
  overview: `This published project record covers a residential villa CCTV installation in Banjara Hills, Hyderabad.

Verified facts from our project list: category Home, 8 cameras, Hikvision brand, installation duration 2 days. Specific camera models, exact mounting points, and client brief details are not published in the source record, so they are omitted here rather than invented.`,
  relatedServices: ['villa-cctv-installation', 'home-cctv-installation', 'ip-camera-installation', 'cctv-amc-maintenance'],
  relatedProjects: ['apartment-gachibowli', 'hospital-jubilee'],
  testimonial: {
    quote:
      "Quick response every time we've needed support. Worth every rupee of the AMC.",
    name: 'Priya Nair',
    role: 'Villa Owner, Banjara Hills',
  },
  seoTitle: 'Villa CCTV Project — Banjara Hills | AQ Enterprises',
  seoDescription:
    'Case study: residential villa CCTV in Banjara Hills, Hyderabad — 8 Hikvision cameras, 2-day install. Verified project record from AQ Enterprises.',
  keywords: ['villa CCTV Banjara Hills', 'Hikvision villa installation Hyderabad', 'residential CCTV project'],
});
