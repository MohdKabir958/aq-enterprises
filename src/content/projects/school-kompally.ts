import { createVerifiedProject } from './_factory';

export const schoolKompallyProject = createVerifiedProject({
  sourceId: 'school-kompally',
  slug: 'school-kompally',
  name: 'School Campus, Kompally',
  category: 'Industrial',
  locationLabel: 'Kompally, Hyderabad',
  locationSlug: 'kompally',
  cameras: 40,
  brandLabel: 'Hikvision',
  duration: '7 Days',
  imageAlt: 'Campus-wide CCTV system at a school campus in Kompally, Hyderabad',
  summary:
    'Published school campus CCTV in Kompally — 40 Hikvision cameras, completed in 7 days.',
  overview: `This published project record covers a campus-wide CCTV system at a school campus in Kompally, Hyderabad.

Recorded fields: listed under Industrial category in the source portfolio (campus/institutional scale), 40 cameras, Hikvision brand, installation duration 7 days. Privacy zoning notes and building-by-building maps are not published.`,
  relatedServices: [
    'school-college-cctv-installation',
    'access-control-systems',
    'ip-camera-installation',
    'cctv-amc-maintenance',
  ],
  relatedProjects: ['factory-nacharam', 'hospital-jubilee'],
  seoTitle: 'School CCTV Project — Kompally | AQ Enterprises',
  seoDescription:
    'Case study: School CCTV in Kompally — 40 Hikvision cameras, 7-day campus install. Published project from AQ Enterprises.',
  keywords: ['school CCTV Kompally', 'campus CCTV Hyderabad', 'Hikvision school cameras'],
});
