import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/api/media/'],
      disallow: ['/api/', '/admin', '/cart', '/checkout'], // Block API routes from indexing
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
