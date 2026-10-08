/**
 * @file json-ld.tsx
 * @description Reusable JSON-LD schema generators for enterprise technical SEO.
 */

import { siteConfig } from './config';
import { schemaSameAs } from './business';
import { getContact, contactAddress } from './cms/settings';

/**
 * Safely serializes a JSON-LD schema into a string.
 * Escapes script termination characters (`<`, `>`, `&`) and Unicode line/paragraph separators
 * to prevent XSS injection or premature `<script>` tag closing.
 */
export function safeJsonLdStringify(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}

/**
 * Injects a JSON-LD script tag safely into the React component tree.
 */
export function JsonLd({ schema }: { schema: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLdStringify(schema) }}
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
export async function generateLocalBusinessSchema() {
  const contact = await getContact();
  const sameAs = [...new Set([contact.justdialUrl, ...schemaSameAs().filter(url => !url.startsWith('https://www.justdial.com/'))])];
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: siteConfig.name,
    image: siteConfig.logo,
    '@id': `${siteConfig.url}/#business`,
    url: siteConfig.url,
    telephone: contact.phone,
    email: contact.email,
    address: contactAddress(contact),
    hasMap: contact.mapsUrl,
    areaServed: {
      '@type': 'City',
      name: 'Hyderabad',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: contact.days,
        opens: contact.opens,
        closes: contact.closes,
      },
    ],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

/**
 * Organization schema (best for home page).
 */
export async function generateOrganizationSchema() {
  const contact = await getContact();
  const sameAs = [...new Set([contact.justdialUrl, ...schemaSameAs().filter(url => !url.startsWith('https://www.justdial.com/'))])];
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: siteConfig.logo,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: contact.phone,
      email: contact.email,
      contactType: 'customer service',
      areaServed: 'Hyderabad',
      availableLanguage: ['en'],
    },
    address: contactAddress(contact),
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
