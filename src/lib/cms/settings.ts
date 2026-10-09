import {
  ADDRESS,
  EMAIL,
  HOURS_DISPLAY,
  HOURS_SCHEMA,
  PHONE,
  PHONE_DISPLAY,
  SOCIAL_PROFILES,
  mapsLocationUrl,
} from '@/lib/business';
import { setting, readRecords } from './store';
import type { ContactSettings, HeroSettings, MediaReplacement } from './models';

export const defaultContact: ContactSettings = {
  phone: PHONE.value,
  phoneDisplay: PHONE_DISPLAY.value,
  email: EMAIL.value,
  line1: ADDRESS.line1,
  line2: ADDRESS.line2,
  city: ADDRESS.city,
  region: ADDRESS.region,
  pincode: ADDRESS.pincode,
  hours: HOURS_DISPLAY.value,
  opens: HOURS_SCHEMA.opens,
  closes: HOURS_SCHEMA.closes,
  days: [...HOURS_SCHEMA.days],
  mapsUrl: mapsLocationUrl(),
  justdialUrl: SOCIAL_PROFILES.justdial.url,
};
export const defaultHero: HeroSettings = {
  eyebrow: 'CCTV Installation · Hyderabad',
  title: 'CCTV Installation in Hyderabad — Homes, Offices & Factories',
  subtitle: 'See everything on your property. Miss nothing that matters.',
  description:
    'We design, install and maintain CCTV and access-control systems for homes, offices and industrial sites across Hyderabad — done right the first time.',
  mediaType: 'default',
  mediaUrl: '',
  mediaAlt: '',
  poster: '',
};
export const getContact = () => setting('contact', defaultContact);
export const getHero = () => setting('hero', defaultHero);
export async function getPublicBusiness() {
  const c = await getContact();
  return {
    PHONE: c.phone,
    PHONE_DISPLAY: c.phoneDisplay,
    EMAIL: c.email,
    HOURS: c.hours,
    WHATSAPP_URL: `https://wa.me/${c.phone.replace('+', '')}`,
    ADDRESS: {
      line1: c.line1,
      line2: c.line2,
      city: c.city,
      region: c.region,
      state: c.region,
      pincode: c.pincode,
      full: [
        c.line1.replace(/,\s*$/, ''),
        c.line2,
        [c.line1, c.line2]
          .join(' ')
          .toLowerCase()
          .includes(c.city.toLowerCase())
          ? ''
          : c.city,
        c.region,
        c.pincode,
      ]
        .filter(Boolean)
        .join(', '),
    },
    mapsLocationUrl: () => c.mapsUrl,
    SOCIAL_PROFILES: { justdial: { url: c.justdialUrl } },
  };
}
export async function getImageReplacements(): Promise<MediaReplacement[]> {
  return (await readRecords('images'))
    .filter((r) => !r.deleted)
    .map((r) => r.value as unknown as MediaReplacement);
}
export function contactAddress(c: ContactSettings) {
  return {
    '@type': 'PostalAddress',
    streetAddress: [c.line1, c.line2].filter(Boolean).join(' '),
    addressLocality: c.city,
    addressRegion: c.region,
    postalCode: c.pincode,
    addressCountry: 'IN',
  };
}
