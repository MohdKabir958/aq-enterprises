/**
 * @file json-ld.tsx
 * @description Reusable JSON-LD schema generators for enterprise technical SEO.
 */

import { siteConfig } from './config';
import {
  EMAIL,
  HOURS_SCHEMA,
  PHONE,
  SERVICE_AREA,
  postalAddressSchema,
  schemaSameAs,
} from './business';

/**
 * Injects a JSON-LD script tag safely into the React component tree.
 */
export function JsonLd({ schema }: { schema: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Base LocalBusiness / ProfessionalService schema.
 * One physical address (Mallapur HQ). Neighborhoods are areaServed, not branches.
 * No invented geo coordinates. sameAs only when independently verified.
 *
 * telephone / email / address / openingHours are the live published NAP from
 * business.ts (status pending client confirmation — not invented placeholders).
 */
export function generateLocalBusinessSchema() {
  const sameAs = schemaSameAs();
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteConfig.name,
    image: siteConfig.logo,
    '@id': `${siteConfig.url}/#business`,
    url: siteConfig.url,
    telephone: PHONE.value,
    email: EMAIL.value,
    address: postalAddressSchema(),
    areaServed: {
      '@type': 'City',
      name: SERVICE_AREA.primary,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [...HOURS_SCHEMA.days],
        opens: HOURS_SCHEMA.opens,
        closes: HOURS_SCHEMA.closes,
      },
    ],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

/**
 * Organization schema (best for home page).
 */
export function generateOrganizationSchema() {
  const sameAs = schemaSameAs();
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: siteConfig.logo,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: PHONE.value,
      email: EMAIL.value,
      contactType: 'customer service',
      areaServed: SERVICE_AREA.primary,
      availableLanguage: ['en', 'hi', 'te'],
    },
    address: postalAddressSchema(),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

/**
 * Breadcrumb schema generator.
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  };
}

/**
 * FAQ schema generator.
 */
export function generateFAQSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}
