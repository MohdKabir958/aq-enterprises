import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';
import { getAllContentPaths } from '@/lib/content/getters';

export default function sitemap(): MetadataRoute.Sitemap {
  const today = new Date().toISOString().split('T')[0];

  const staticRoutes = ['', '/about', '/services', '/commercial-internet-hyderabad', '/projects', '/locations', '/blog', '/contact'].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: today,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : route === '/contact' || route === '/commercial-internet-hyderabad' ? 0.9 : 0.8,
  }));

  const dynamicRoutes = getAllContentPaths().map((entry) => ({
    url: `${siteConfig.url}${entry.path}`,
    lastModified: entry.lastModified?.split('T')[0] ?? today,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
