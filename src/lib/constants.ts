/**
 * @file constants.ts
 * @description Public re-exports and shared site content (FAQ, projects index, nav).
 *
 * Contact / NAP fields are owned by `src/lib/business.ts`.
 * Import contact values from here for backward compatibility, or from `@/lib/business` directly.
 */

import {
  ADDRESS as BUSINESS_ADDRESS,
  EMAIL as BUSINESS_EMAIL,
  HOURS_DISPLAY,
  PHONE as BUSINESS_PHONE,
  PHONE_DISPLAY as BUSINESS_PHONE_DISPLAY,
  SUPPORTED_BRANDS,
  UNVERIFIED_STATS,
  VERIFIED_CERTIFICATIONS,
  WARRANTY_PUBLIC_COPY,
  WHATSAPP_URL as BUSINESS_WHATSAPP,
} from './business';

// ─── Business Contact Information (from business.ts) ─────────────────────────

export const PHONE = BUSINESS_PHONE.value;
export const PHONE_DISPLAY = BUSINESS_PHONE_DISPLAY.value;
export const WHATSAPP_URL = BUSINESS_WHATSAPP.value;
/** Current public email — personal Gmail pending official business email. */
export const EMAIL = BUSINESS_EMAIL.value;

export const ADDRESS = {
  line1: BUSINESS_ADDRESS.line1,
  line2: BUSINESS_ADDRESS.line2,
  state: BUSINESS_ADDRESS.state,
  pincode: BUSINESS_ADDRESS.pincode,
  full: BUSINESS_ADDRESS.full,
  city: BUSINESS_ADDRESS.city,
  region: BUSINESS_ADDRESS.region,
} as const;

export const HOURS = HOURS_DISPLAY.value;

// ─── Navigation ───────────────────────────────────────────────────────────────

export const NAV_ITEMS = [
  { key: 'home', label: 'Home', href: '/' },
  { key: 'about', label: 'About', href: '/about' },
  { key: 'services', label: 'Services', href: '/services' },
  { key: 'projects', label: 'Projects', href: '/projects' },
  { key: 'blog', label: 'Blog', href: '/blog' },
  { key: 'contact', label: 'Contact', href: '/contact' },
] as const;

export type NavKey = (typeof NAV_ITEMS)[number]['key'];

// ─── Statistics ───────────────────────────────────────────────────────────────

/**
 * @deprecated Do not display these publicly until client verifies.
 * Prefer qualitative trust copy or published project counts.
 */
export const STATS = {
  installations: UNVERIFIED_STATS.installations.value,
  years: UNVERIFIED_STATS.years.value,
  cities: UNVERIFIED_STATS.cities.value,
  cameras: UNVERIFIED_STATS.cameras.value,
  technicians: UNVERIFIED_STATS.technicians.value,
  founded: UNVERIFIED_STATS.founded.value,
} as const;

/** Safe public trust labels — no fabricated metrics. */
export const TRUST_HIGHLIGHTS = [
  { label: 'Based in Mallapur, Hyderabad', detail: 'Single physical service base' },
  { label: 'Site survey before quote', detail: 'No fixed package guesses' },
  { label: 'Hyderabad case studies', detail: 'Published project records' },
  { label: 'Hyderabad service area', detail: 'Homes, businesses & institutions' },
] as const;

// ─── Brands ───────────────────────────────────────────────────────────────────

/** Brands commonly supplied/installed — not authorized-dealer claims. */
export const BRANDS = SUPPORTED_BRANDS;

/**
 * Public certifications list — empty until client provides proof.
 * Do not render authorized-dealer badges without verification.
 */
export const CERTIFICATIONS = VERIFIED_CERTIFICATIONS;

// ─── Projects (legacy index — content lives in src/content/projects) ──────────

export interface Project {
  id: string;
  category: 'Home' | 'Office' | 'Industrial';
  name: string;
  location: string;
  cameras: number;
  brand: string;
  duration: string;
  imageAlt: string;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: 'villa-banjara',
    category: 'Home',
    name: 'Residential Villa, Banjara Hills',
    location: 'Banjara Hills, Hyderabad',
    cameras: 8,
    brand: 'Hikvision',
    duration: '2 Days',
    imageAlt: 'CCTV installation at a residential villa in Banjara Hills, Hyderabad',
  },
  {
    id: 'factory-nacharam',
    category: 'Industrial',
    name: 'Manufacturing Unit, Nacharam',
    location: 'Nacharam, Hyderabad',
    cameras: 32,
    brand: 'Dahua',
    duration: '6 Days',
    imageAlt: 'Industrial CCTV surveillance system at a manufacturing unit in Nacharam, Hyderabad',
  },
  {
    id: 'retail-ameerpet',
    category: 'Office',
    name: 'Retail Chain, 6 Outlets',
    location: 'Ameerpet & Kukatpally, Hyderabad',
    cameras: 48,
    brand: 'CP Plus',
    duration: '9 Days',
    imageAlt: 'CCTV camera system deployed across retail chain outlets in Hyderabad',
  },
  {
    id: 'apartment-gachibowli',
    category: 'Home',
    name: 'Apartment Community, Gachibowli',
    location: 'Gachibowli, Hyderabad',
    cameras: 22,
    brand: 'Uniview',
    duration: '4 Days',
    imageAlt: 'Apartment complex surveillance system installed at an apartment community in Gachibowli',
  },
  {
    id: 'school-kompally',
    category: 'Industrial',
    name: 'School Campus, Kompally',
    location: 'Kompally, Hyderabad',
    cameras: 40,
    brand: 'Hikvision',
    duration: '7 Days',
    imageAlt: 'Campus-wide CCTV system at a school campus in Kompally, Hyderabad',
  },
  {
    id: 'office-hitech',
    category: 'Office',
    name: 'Office Tower, Hitech City',
    location: 'Hitech City, Hyderabad',
    cameras: 60,
    brand: 'Bosch',
    duration: '10 Days',
    imageAlt: 'Corporate office CCTV installation at an office tower in Hitech City, Hyderabad',
  },
  {
    id: 'warehouse-uppal',
    category: 'Industrial',
    name: 'Cold Storage Warehouse, Uppal',
    location: 'Uppal, Hyderabad',
    cameras: 28,
    brand: 'Dahua',
    duration: '5 Days',
    imageAlt: 'Warehouse CCTV system installation at a cold storage facility in Uppal, Hyderabad',
  },
  {
    id: 'hospital-jubilee',
    category: 'Office',
    name: 'Hospital, Jubilee Hills',
    location: 'Jubilee Hills, Hyderabad',
    cameras: 35,
    brand: 'Honeywell',
    duration: '6 Days',
    imageAlt: 'Hospital CCTV surveillance system installed at a hospital in Jubilee Hills, Hyderabad',
  },
];

// ─── Testimonials (legacy — prefer src/content/testimonials) ──────────────────

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /** pending = associated with project notes; not an independent Google review */
  verificationStatus?: 'verified' | 'pending' | 'unverified';
  projectId?: string;
  source?: string;
}

/**
 * Project-linked feedback retained as drafts for case studies.
 * Not published on the website until the client confirms permission and accuracy.
 * Do not treat these as Google reviews or star ratings.
 */
export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Installation was clean and the team explained every camera angle before finalizing. Zero blind spots in our warehouse now.',
    name: 'Ravi Kumar',
    role: 'Factory Owner, Nacharam',
    verificationStatus: 'pending',
    projectId: 'factory-nacharam',
    source: 'Project handover feedback',
  },
  {
    quote:
      "Quick response every time we've needed support. Worth every rupee of the AMC.",
    name: 'Priya Nair',
    role: 'Villa Owner, Banjara Hills',
    verificationStatus: 'pending',
    projectId: 'villa-banjara',
    source: 'Project handover feedback',
  },
  {
    quote:
      'Rolled out across all 6 stores in under two weeks with zero downtime. Highly recommended.',
    name: 'Arjun Mehta',
    role: 'Retail Operations Manager, Hyderabad',
    verificationStatus: 'pending',
    projectId: 'retail-ameerpet',
    source: 'Project handover feedback',
  },
];

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    question: 'How much does CCTV installation cost in Hyderabad?',
    answer:
      'Costs depend on camera count, resolution, and site complexity. We confirm an exact quote after a site survey anywhere in our Hyderabad service area — we do not publish fixed package prices that ignore your property.',
  },
  {
    question: 'Which camera brand is best for me?',
    answer:
      'It depends on your budget and use case. We commonly install and support established brands such as Hikvision, CP Plus, Dahua, and Uniview, and recommend the right fit during your site assessment. We do not claim authorized-dealer status unless separately verified.',
  },
  {
    question: 'Do cameras work without internet?',
    answer:
      'Yes. Recording to a local DVR/NVR works fully offline — internet is only needed if you want to view footage remotely on your phone.',
  },
  {
    question: 'How many days does installation take?',
    answer:
      'Homes and small offices are often completed in 1–2 days. Larger factories and multi-site rollouts take longer depending on scale. Timing is confirmed after survey.',
  },
  {
    question: 'Is warranty included?',
    answer: WARRANTY_PUBLIC_COPY,
  },
  {
    question: 'How many cameras do I actually need?',
    answer:
      'A practical starting point is every entry plus key open areas. We calculate coverage for your property during the site survey rather than selling a fixed kit.',
  },
  {
    question: 'Do you offer AMC (maintenance) plans?',
    answer:
      'Yes — AMC plans can cover cleaning, checks, and repair visits in Hyderabad. Scope and visit frequency are written into the quotation.',
  },
  {
    question: 'Can I view my cameras remotely on my phone?',
    answer:
      'Yes, when internet and app setup are part of the agreed package. We configure remote viewing during handover when you want it.',
  },
];

// ─── Quote Form ───────────────────────────────────────────────────────────────

export const PROPERTY_TYPES = [
  'Home / Villa',
  'Apartment / Housing Society',
  'Office / Commercial Space',
  'Factory / Warehouse',
  'School / College / Institution',
  'Hospital / Clinic',
  'Retail Shop / Showroom',
  'Other',
] as const;

export const SERVICE_OPTIONS = [
  'Home CCTV Installation',
  'Office / Factory Security',
  'IP / Wireless Cameras',
  'Access Control & Biometric',
  'AMC & Maintenance',
  'Other / Not Sure',
] as const;
