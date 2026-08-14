/**
 * Open Graph metadata helpers.
 */

import type { Metadata } from 'next';
import type { OpenGraphInput } from '@/types';
import { siteConfig } from '@/lib/config';
import { generateCanonical } from './canonical';

/**
 * Builds a Next.js Open Graph metadata fragment.
 */
export function generateOpenGraph(input: OpenGraphInput): NonNullable<Metadata['openGraph']> {
  const image = input.image ?? siteConfig.ogImage;

  return {
    type: input.type ?? 'website',
    locale: input.locale ?? 'en_IN',
    url: generateCanonical(input.url),
    title: input.title,
    description: input.description,
    siteName: input.siteName ?? siteConfig.name,
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: input.title,
      },
    ],
  };
}
