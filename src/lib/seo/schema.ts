/**
 * Unified schema.org JSON-LD generators for content entities.
 * Complements site-level schemas in `@/lib/json-ld`.
 */

import type { FAQ, SchemaInput, SchemaObject } from '@/types';
import { siteConfig } from '@/lib/config';
import { getContact, contactAddress } from '@/lib/cms/settings';
import { generateCanonical } from './canonical';
import {
  generateBreadcrumbSchema,
  generateFAQSchema as generateFAQSchemaFromJsonLd,
  generateLocalBusinessSchema,
  generateOrganizationSchema,
} from '@/lib/json-ld';

export { generateBreadcrumbSchema, generateLocalBusinessSchema, generateOrganizationSchema };

/**
 * FAQ schema — accepts architecture `FAQ` objects or `{ q, a }` pairs.
 */
export function generateFAQSchema(
  faqs: FAQ[] | { q: string; a: string }[] | { question: string; answer: string }[],
): SchemaObject {
  const normalized = faqs.map((faq) => {
    if ('q' in faq && 'a' in faq) return { q: faq.q, a: faq.a };
    if ('question' in faq && 'answer' in faq) return { q: faq.question, a: faq.answer };
    return { q: '', a: '' };
  });

  return generateFAQSchemaFromJsonLd(normalized) as SchemaObject;
}

/**
 * Entity-aware schema builder. Returns one or more JSON-LD graphs.
 */
export async function generateSchema(input: SchemaInput): Promise<SchemaObject | SchemaObject[]> {
  const contact = await getContact();
  const url = generateCanonical(input.url);
  const schemas: SchemaObject[] = [];

  switch (input.type) {
    case 'service':
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: input.name,
        description: input.description,
        url,
        image: input.image,
        provider: {
          '@type': 'Organization',
          name: siteConfig.name,
          url: siteConfig.url,
        },
        areaServed: {
          '@type': 'City',
          name: 'Hyderabad',
        },
        ...input.extra,
      });
      break;

    case 'location': {
      // Service-area page — NOT a claim of a physical branch in every neighborhood.
      const extra = { ...(input.extra ?? {}) } as SchemaObject & { areaServedName?: string };
      const areaName =
        (typeof extra.areaServedName === 'string' && extra.areaServedName) || input.name;
      delete extra.areaServedName;
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: input.name,
        description: input.description,
        url,
        serviceType: 'CCTV Installation and Security Systems',
        areaServed: {
          '@type': 'Place',
          name: areaName,
        },
        provider: {
          '@type': 'LocalBusiness',
          name: siteConfig.name,
          url: siteConfig.url,
          telephone: contact.phone,
          address: contactAddress(contact),
        },
        ...extra,
      });
      break;
    }

    case 'brand':
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Brand',
        name: input.name,
        description: input.description,
        url,
        logo: input.image,
        ...input.extra,
      });
      break;

    case 'industry':
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: input.name,
        description: input.description,
        url,
        serviceType: input.name,
        provider: {
          '@type': 'Organization',
          name: siteConfig.name,
          url: siteConfig.url,
        },
        ...input.extra,
      });
      break;

    case 'project':
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: input.name,
        description: input.description,
        url,
        image: input.image,
        ...input.extra,
      });
      break;

    case 'blog':
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: input.name,
        description: input.description,
        url,
        image: input.image,
        publisher: {
          '@type': 'Organization',
          name: siteConfig.name,
          logo: {
            '@type': 'ImageObject',
            url: siteConfig.logo,
          },
        },
        ...input.extra,
      });
      break;

    case 'faq':
      if (input.faqs?.length) {
        schemas.push(generateFAQSchema(input.faqs));
      }
      break;

    case 'organization':
      schemas.push(await generateOrganizationSchema() as SchemaObject);
      break;

    case 'localBusiness':
      schemas.push(await generateLocalBusinessSchema() as SchemaObject);
      break;

    case 'breadcrumb':
      if (input.breadcrumbs?.length) {
        schemas.push(generateBreadcrumbSchema(input.breadcrumbs) as SchemaObject);
      }
      break;

    default:
      break;
  }

  if (input.breadcrumbs?.length && input.type !== 'breadcrumb') {
    schemas.push(generateBreadcrumbSchema(input.breadcrumbs) as SchemaObject);
  }

  if (input.faqs?.length && input.type !== 'faq') {
    schemas.push(generateFAQSchema(input.faqs));
  }

  if (schemas.length === 0) {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: input.name,
      description: input.description,
      url,
      ...input.extra,
    };
  }

  return schemas.length === 1 ? schemas[0] : schemas;
}
