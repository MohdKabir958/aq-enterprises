import { createVerifiedProject } from './_factory';

export const officeHitechProject = createVerifiedProject({
  sourceId: 'office-hitech',
  slug: 'office-hitech',
  name: 'Tech Park Office Tower, Hitech City',
  category: 'Office',
  locationLabel: 'Hitech City, Hyderabad',
  locationSlug: 'hitech-city',
  cameras: 60,
  brandLabel: 'Bosch',
  duration: '10 Days',
  imageAlt: 'Corporate office CCTV installation at a tech park in Hitech City, Hyderabad',
  summary:
    'Published tech-park office CCTV in Hitech City — 60 Bosch cameras, completed in 10 days.',
  overview: `This published project record covers CCTV at a tech park office tower in Hitech City, Hyderabad.

Recorded fields: category Office, 60 cameras, Bosch brand, installation duration 10 days. Floor counts, landlord constraints, and exact camera models are not in the published record.`,
  relatedServices: [
    'office-cctv-installation',
    'ip-camera-installation',
    'access-control-systems',
    'commercial-lan-cabling-networking',
    'cctv-amc-maintenance',
  ],
  relatedProjects: ['retail-ameerpet', 'hospital-jubilee', 'apartment-gachibowli'],
  seoTitle: 'Office CCTV Project — Hitech City | AQ Enterprises',
  seoDescription:
    'Case study: tech park office tower CCTV in Hitech City — 60 Bosch cameras, 10-day install. Published corporate project from AQ Enterprises.',
  keywords: ['office CCTV Hitech City', 'tech park CCTV Hyderabad', 'Bosch office cameras'],
});
