/**
 * @file config.ts
 * @description Site metadata for SEO. Contact NAP is owned by `business.ts`.
 */

import {
  BUSINESS_NAME,
  EMAIL,
  PHONE_DISPLAY,
  WEBSITE_URL,
  WHATSAPP_URL,
  schemaSameAs,
} from './business';

export const siteConfig = {
  name: BUSINESS_NAME,
  description:
    'CCTV and security system installation for homes, businesses, and institutions across Hyderabad — based in Mallapur.',
  url: WEBSITE_URL,
  /** Replace when a real OG image is supplied under /public/images/company/ */
  ogImage: `${WEBSITE_URL}/assets/aq-logo.png`,
  logo: `${WEBSITE_URL}/assets/aq-logo.png`,
  /** Operational socials only — fake Facebook URL removed */
  socials: {
    whatsapp: WHATSAPP_URL.value,
  },
  contact: {
    email: EMAIL.value,
    phone: PHONE_DISPLAY.value,
  },
  /** Helper for schema — do not invent profiles */
  sameAs: () => schemaSameAs(),
};
