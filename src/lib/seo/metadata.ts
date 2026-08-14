/**
 * Next.js Metadata builders for dynamic content pages.
 */

import type { Metadata } from 'next';
import type { MetadataInput, SEO } from '@/types';
import { siteConfig } from '@/lib/config';
import { generateCanonical, toCanonicalPath } from './canonical';
import { generateOpenGraph } from './open-graph';

/**
 * Converts a content `SEO` object (plus optional article fields) into Next.js `Metadata`.
 */
export function generateMetadata(input: MetadataInput): Metadata {
  const { seo } = input;
  const canonicalPath = toCanonicalPath(seo.canonical);
  const absoluteUrl = input.url ?? generateCanonical(canonicalPath);
  const ogTitle = seo.ogTitle ?? seo.title;
  const ogDescription = seo.ogDescription ?? seo.description;
  const ogImage = seo.ogImage ?? siteConfig.ogImage;
  const type = input.type ?? 'website';

  const metadata: Metadata = {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: generateOpenGraph({
      title: ogTitle,
      description: ogDescription,
      url: absoluteUrl,
      image: ogImage,
      type,
    }),
    twitter: {
      card: 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
    },
    robots: seo.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };

  if (type === 'article') {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      ...(input.publishedTime ? { publishedTime: input.publishedTime } : {}),
      ...(input.modifiedTime ? { modifiedTime: input.modifiedTime } : {}),
      ...(input.authors?.length ? { authors: input.authors } : {}),
    };
  }

  return metadata;
}

/**
 * Shorthand when you only have an `SEO` object.
 */
export function generateMetadataFromSEO(seo: SEO, extras?: Omit<MetadataInput, 'seo'>): Metadata {
  return generateMetadata({ seo, ...extras });
}
