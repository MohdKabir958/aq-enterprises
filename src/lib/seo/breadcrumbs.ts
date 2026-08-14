/**
 * Breadcrumb generation helpers (data only — visual UI lives in components/Breadcrumbs).
 */

import type { BreadcrumbItem } from '@/types';

const HOME: BreadcrumbItem = { name: 'Home', url: '/' };

/**
 * Builds a breadcrumb trail, always starting with Home.
 *
 * @example
 * generateBreadcrumb([
 *   { name: 'Services', url: '/services' },
 *   { name: 'Home CCTV', url: '/services/home-cctv' },
 * ])
 */
export function generateBreadcrumb(items: BreadcrumbItem[]): BreadcrumbItem[] {
  if (items.length === 0) return [HOME];
  if (items[0]?.name === 'Home' && items[0]?.url === '/') return items;
  return [HOME, ...items];
}

/** Convenience builders for common content entity trails. */
export function serviceBreadcrumbs(name: string, slug: string): BreadcrumbItem[] {
  return generateBreadcrumb([
    { name: 'Services', url: '/services' },
    { name: name, url: `/services/${slug}` },
  ]);
}

export function locationBreadcrumbs(name: string, slug: string): BreadcrumbItem[] {
  return generateBreadcrumb([
    { name: 'Locations', url: '/locations' },
    { name: name, url: `/locations/${slug}` },
  ]);
}

export function brandBreadcrumbs(name: string, slug: string): BreadcrumbItem[] {
  return generateBreadcrumb([
    { name: 'Brands', url: '/brands' },
    { name: name, url: `/brands/${slug}` },
  ]);
}

export function industryBreadcrumbs(name: string, slug: string): BreadcrumbItem[] {
  return generateBreadcrumb([
    { name: 'Industries', url: '/industries' },
    { name: name, url: `/industries/${slug}` },
  ]);
}

export function projectBreadcrumbs(name: string, slug: string): BreadcrumbItem[] {
  return generateBreadcrumb([
    { name: 'Projects', url: '/projects' },
    { name: name, url: `/projects/${slug}` },
  ]);
}

export function blogBreadcrumbs(title: string, slug: string): BreadcrumbItem[] {
  return generateBreadcrumb([
    { name: 'Blog', url: '/blog' },
    { name: title, url: `/blog/${slug}` },
  ]);
}

export function serviceLocationBreadcrumbs(input: {
  locationName: string;
  locationSlug: string;
  serviceName: string;
  serviceSlug: string;
}): BreadcrumbItem[] {
  return generateBreadcrumb([
    { name: 'Locations', url: '/locations' },
    { name: input.locationName, url: `/locations/${input.locationSlug}` },
    {
      name: input.serviceName,
      url: `/locations/${input.locationSlug}/${input.serviceSlug}`,
    },
  ]);
}
