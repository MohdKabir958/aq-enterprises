import { getProducts } from '@/lib/cms/catalogue';
export const dynamic = 'force-dynamic';
import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';
import { getAllContentPaths } from '@/lib/content/getters';

/**
 * Generates the sitemap for AQ Enterprises.
 *
 * RULES:
 * - Only indexable, canonical URLs are listed.
 * - Never use fake dates like `new Date()`.
 * - If real `lastModified` date is available from content metadata, format it.
 * - If no trustworthy modification date exists, omit `lastModified`.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteConfig.url}/products`, changeFrequency: 'weekly', priority: 0.9 },
    {
      url: `${siteConfig.url}`,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${siteConfig.url}/about`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/services`,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/commercial-internet-hyderabad`,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/projects`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/locations`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/blog`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/contact`,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = (await getAllContentPaths()).map((entry) => {
    const item: MetadataRoute.Sitemap[number] = {
      url: `${siteConfig.url}${entry.path}`,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    };
    if (entry.lastModified) {
      item.lastModified = entry.lastModified.split('T')[0];
    }
    return item;
  });

  const products = (await getProducts()).map(p => ({ url: `${siteConfig.url}/products/${p.slug}`, changeFrequency: 'weekly' as const, priority: 0.8 }));
  return [...staticRoutes, ...dynamicRoutes, ...products];
}
