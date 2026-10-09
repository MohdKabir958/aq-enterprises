/**
 * @file business.ts
 * @description Single source of truth for verified AQ Enterprises business identity (NAP).
 *
 * RULES:
 * - UI, schema, and config MUST import contact fields from here (or via constants re-exports).
 * - Do not invent phone, email, hours, GBP, socials, stats, or certifications.
 * - Fields marked `clientConfirmationRequired` need client sign-off before marketing claims.
 *
 * PHONE RESOLUTION (Phase 6):
 * Live CTAs / Footer / WhatsApp already used +91 78159 15792 from the previous constants file.
 * `siteConfig` held placeholder 99999 numbers — those were never the live UI source.
 * We treat the live CTA number as the working contact until the client confirms otherwise.
 */

export type VerificationStatus = 'verified' | 'pending' | 'placeholder' | 'unverified';

export type BusinessField<T> = {
  value: T;
  status: VerificationStatus;
  notes?: string;
};

/** Legal / display business name */
export const BUSINESS_NAME = 'AQ Enterprises';

export const WEBSITE_URL = 'https://www.aqenterprises.in';

/**
 * Working phone used across live CTAs.
 * CLIENT CONFIRMATION: Confirm this is the official business line (not a personal mobile only).
 */
export const PHONE: BusinessField<string> = {
  value: '+917815915792',
  status: 'pending',
  notes:
    'Used site-wide in tel: links before Phase 6. Confirm as official business number. Former siteConfig value +91 99999 99999 was a placeholder and was discarded.',
};

export const PHONE_DISPLAY: BusinessField<string> = {
  value: '+91 78159 15792',
  status: 'pending',
  notes: 'Display formatting of PHONE.value',
};

export const WHATSAPP_URL: BusinessField<string> = {
  value: 'https://wa.me/917815915792',
  status: 'pending',
  notes: 'Derived from PHONE.value. Former siteConfig wa.me/919999999999 was a placeholder.',
};

/** Canonical tel: href. Always derive from PHONE — do not hardcode elsewhere. */
export const telHref = () => `tel:${PHONE.value}`;

/** Canonical mailto: href. Always derive from EMAIL — do not hardcode elsewhere. */
export const mailtoHref = () => `mailto:${EMAIL.value}`;

/**
 * Owner-confirmed public business email.
 * Do not guess addresses such as info@aqenterprises.in.
 */
export const EMAIL: BusinessField<string> = {
  value: 'aqenterprises204@gmail.com',
  status: 'verified',
  notes:
    'Confirmed by the owner on 9 October 2026 as the website contact email.',
};

export const ADDRESS = {
  line1: 'Mallapur, Chanakyapuri Colony, Masjid-e-Ashraf,',
  line2: 'FCI Godown Road, Hyderabad',
  state: 'Telangana',
  pincode: '500076',
  full: 'Mallapur, Chanakyapuri Colony, Masjid-e-Ashraf, FCI Godown Road, Hyderabad, Telangana 500076',
  city: 'Hyderabad',
  region: 'Telangana',
  status: 'pending' as VerificationStatus,
  notes:
    'Single physical HQ — do not publish neighborhood branch addresses. Phase 9 brief listed only “Mallapur, Hyderabad”; this longer string is the existing site value and is kept pending confirmation. Do not silently shorten or invent a replacement.',
} as const;

/** Owner-confirmed location link; does not imply Google profile verification. */
export const MAP_LOCATION: BusinessField<string> = {
  value: 'https://share.google/udMz1Wsj3KMziK1tH',
  status: 'verified',
  notes: 'Provided by the business owner as the real location on 2026-10-08. The destination address, coordinates, and Google verification status have not been independently checked.',
};

/** Use the owner's location link, with an address search fallback. */
export function mapsLocationUrl(): string {
  if (MAP_LOCATION.status === 'verified' && MAP_LOCATION.value) {
    return MAP_LOCATION.value;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ADDRESS.full)}`;
}

/** schema.org PostalAddress from SSOT. No geo coordinates. */
export function postalAddressSchema() {
  return {
    '@type': 'PostalAddress' as const,
    streetAddress: `${ADDRESS.line1} ${ADDRESS.line2}`.replace(/,\s*$/, ''),
    addressLocality: ADDRESS.city,
    addressRegion: ADDRESS.region,
    postalCode: ADDRESS.pincode,
    addressCountry: 'IN',
  };
}

/** Display string for hours. Schema uses structured HOURS_SCHEMA. */
export const HOURS_DISPLAY: BusinessField<string> = {
  value: 'Mon–Sat, 9am–7pm',
  status: 'pending',
  notes: 'Confirm exact hours and Sunday closed status with client.',
};

/** Structured hours for LocalBusiness schema (Mon–Sat). */
export const HOURS_SCHEMA = {
  days: [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ] as const,
  opens: '09:00',
  closes: '19:00',
  status: 'pending' as VerificationStatus,
};

export const SERVICE_AREA = {
  primary: 'Hyderabad',
  region: 'Telangana',
  country: 'IN',
  notes: 'Service area business — surveys from Mallapur HQ. No fake branch locations.',
} as const;

/**
 * Social / GBP profiles.
 * Only include URLs in schema `sameAs` when status === 'verified'.
 */
export const SOCIAL_PROFILES = {
  whatsapp: {
    url: WHATSAPP_URL.value,
    status: WHATSAPP_URL.status,
  },
  justdial: {
    url: 'https://www.justdial.com/Hyderabad/Aq-Enterprises-Mallapur/040PXX40-XX40-240328220045-N1R5_BZDET',
    status: 'verified' as VerificationStatus,
    notes: 'Profile URL confirmed by the business owner on 2026-10-08. Listing details have not been independently checked.',
  },
  facebook: {
    url: '',
    status: 'unverified' as VerificationStatus,
    notes: 'Former placeholder facebook.com/aqenterprises removed from schema until confirmed.',
  },
  googleBusinessProfile: {
    url: '',
    status: 'unverified' as VerificationStatus,
    notes: 'Client must provide GBP URL. Do not invent or claim verification.',
  },
  instagram: { url: '', status: 'unverified' as VerificationStatus },
  linkedin: { url: '', status: 'unverified' as VerificationStatus },
  youtube: { url: '', status: 'unverified' as VerificationStatus },
} as const;

/** Brands commonly supplied/installed — NOT authorized-dealer claims. */
export const SUPPORTED_BRANDS = [
  'Hikvision',
  'CP Plus',
  'Dahua',
  'Uniview',
  'Honeywell',
  'Bosch',
  'Godrej',
  'Panasonic',
] as const;

/**
 * Brand claim ladder. Public copy may only use “commonly install and support”
 * until the client provides dealer/partner/installer certificates.
 */
export const BRAND_CLAIM_LEVELS = {
  commonlySupported: SUPPORTED_BRANDS,
  verifiedDealer: [] as const,
  authorizedPartner: [] as const,
  certifiedInstaller: [] as const,
};

/**
 * Unverified marketing stats — DO NOT render publicly until client confirms.
 * Kept here so pages stop inventing numbers inline.
 */
export const UNVERIFIED_STATS = {
  installations: { value: '500+', status: 'unverified' as const },
  years: { value: '8+', status: 'unverified' as const },
  cities: { value: '50+', status: 'unverified' as const },
  cameras: { value: '12,000+', status: 'unverified' as const },
  technicians: { value: '18', status: 'unverified' as const },
  founded: { value: '2018', status: 'unverified' as const },
} as const;

/** Verified dealerships/certs — empty until client provides proof. */
export const VERIFIED_CERTIFICATIONS: string[] = [];

/** Convenience getters used by UI */
export const phoneHref = () => telHref();
export const phoneDisplay = () => PHONE_DISPLAY.value;
export const whatsappUrl = () => WHATSAPP_URL.value;
export const emailAddress = () => EMAIL.value;
export const hoursDisplay = () => HOURS_DISPLAY.value;

/**
 * schema.org sameAs — identity URLs only, and only when verified.
 * WhatsApp is a contact deep-link (use telephone / the WhatsApp CTA), not sameAs.
 * Do not invent a Google Business Profile URL.
 */
export function schemaSameAs(): string[] {
  const urls: string[] = [];
  const candidates = [
    SOCIAL_PROFILES.justdial,
    SOCIAL_PROFILES.googleBusinessProfile,
    SOCIAL_PROFILES.facebook,
    SOCIAL_PROFILES.instagram,
    SOCIAL_PROFILES.linkedin,
    SOCIAL_PROFILES.youtube,
  ];
  for (const profile of candidates) {
    if (profile.status === 'verified' && profile.url) {
      urls.push(profile.url);
    }
  }
  return urls;
}

/** Neutral warranty copy safe for public pages — no invented durations. */
export const WARRANTY_PUBLIC_COPY =
  'Warranty terms depend on the selected equipment and installation package. Hardware typically carries the applicable manufacturer warranty shown on your invoice. Workmanship cover for the installation is confirmed in your quotation and handover notes.';

/** Extra warranty handling note used on service pages (still no durations). */
export const WARRANTY_HANDLING_COPY =
  'Warranty handling depends on the product line and fault type. We help you identify whether an issue is configuration, cabling, power, or a hardware claim so support is directed correctly. We do not publish a single fixed workmanship duration in marketing copy because it varies by package.';

/** CTA copy — no unverified response-time promises */
export const CTA_COPY = {
  quote: {
    heading: 'Request a quotation',
    body: 'Share your property type and requirements. We will review your details and follow up to discuss next steps.',
  },
  survey: {
    heading: 'Request a site survey',
    body: 'Tell us about your site. We will contact you to schedule a walkthrough from our Mallapur base.',
  },
  formSuccess:
    'Thank you. Your request has been received. Our team will contact you to discuss a site survey or quotation.',
  formIntro:
    'Share your details to request a site survey or quotation. We will follow up using the phone number you provide.',
} as const;
