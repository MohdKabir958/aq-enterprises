import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'], // Block API routes from indexing
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
