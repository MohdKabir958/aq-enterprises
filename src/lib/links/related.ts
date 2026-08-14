/**
 * Internal link engine.
 *
 * Resolves related entity slug arrays into link-ready objects for templates.
 * Prefer explicit `related*` fields on content; fall back to reciprocal lookups
 * and category/tag heuristics so pages stay interlinked as the dataset grows.
 */

import {
  getAllBlogs,
  getAllLocations,
  getAllProjects,
  getAllServices,
  getBlogBySlug,
  getBrandBySlug,
  getIndustryBySlug,
  getLocationBySlug,
  getProjectBySlug,
  getServiceBySlug,
} from '@/lib/content/getters';
import type {
  BlogPost,
  Brand,
  Industry,
  Location,
  Project,
  Service,
} from '@/types';

export interface InternalLink {
  slug: string;
  name: string;
  href: string;
  summary?: string;
}

export interface RelatedLinksBundle {
  services: InternalLink[];
  locations: InternalLink[];
  projects: InternalLink[];
  blogs: InternalLink[];
  brands: InternalLink[];
  industries: InternalLink[];
}

const DEFAULT_LIMIT = 6;

function uniqueBySlug<T extends { slug: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.slug)) return false;
    seen.add(item.slug);
    return true;
  });
}

function toServiceLink(item: Service): InternalLink {
  return {
    slug: item.slug,
    name: item.name,
    href: `/services/${item.slug}`,
    summary: item.summary,
  };
}

function toLocationLink(item: Location): InternalLink {
  return {
    slug: item.slug,
    name: item.name,
    href: `/locations/${item.slug}`,
    summary: item.summary,
  };
}

function toProjectLink(item: Project): InternalLink {
  return {
    slug: item.slug,
    name: item.name,
    href: `/projects/${item.slug}`,
    summary: item.summary,
  };
}

function toBlogLink(item: BlogPost): InternalLink {
  return {
    slug: item.slug,
    name: item.title || item.name,
    href: `/blog/${item.slug}`,
    summary: item.summary,
  };
}

function toBrandLink(item: Brand): InternalLink {
  return {
    slug: item.slug,
    name: item.name,
    href: `/brands/${item.slug}`,
    summary: item.summary,
  };
}

function toIndustryLink(item: Industry): InternalLink {
  return {
    slug: item.slug,
    name: item.name,
    href: `/industries/${item.slug}`,
    summary: item.summary,
  };
}

function resolveSlugs<T>(
  slugs: string[] | undefined,
  getter: (slug: string) => T | undefined,
  limit: number,
): T[] {
  if (!slugs?.length) return [];
  return slugs
    .map(getter)
    .filter((item): item is T => Boolean(item))
    .slice(0, limit);
}

function fallbackServices(excludeSlug?: string, limit = DEFAULT_LIMIT): Service[] {
  return getAllServices()
    .filter((s) => s.slug !== excludeSlug)
    .slice(0, limit);
}

function fallbackLocations(excludeSlug?: string, limit = DEFAULT_LIMIT): Location[] {
  return getAllLocations()
    .filter((l) => l.slug !== excludeSlug)
    .slice(0, limit);
}

function fallbackProjects(excludeSlug?: string, limit = DEFAULT_LIMIT): Project[] {
  return getAllProjects()
    .filter((p) => p.slug !== excludeSlug)
    .slice(0, limit);
}

function fallbackBlogs(excludeSlug?: string, limit = DEFAULT_LIMIT): BlogPost[] {
  return getAllBlogs()
    .filter((b) => b.slug !== excludeSlug)
    .slice(0, limit);
}

/** Related services for any entity that declares `relatedServices`. */
export function getRelatedServices(
  slugs: string[] | undefined,
  options?: { excludeSlug?: string; limit?: number; fallback?: boolean },
): InternalLink[] {
  const limit = options?.limit ?? DEFAULT_LIMIT;
  let items = resolveSlugs(slugs, getServiceBySlug, limit);

  if (options?.fallback !== false && items.length < limit) {
    items = uniqueBySlug([
      ...items,
      ...fallbackServices(options?.excludeSlug, limit - items.length),
    ]);
  }

  return items
    .filter((s) => s.slug !== options?.excludeSlug)
    .slice(0, limit)
    .map(toServiceLink);
}

export function getRelatedLocations(
  slugs: string[] | undefined,
  options?: { excludeSlug?: string; limit?: number; fallback?: boolean },
): InternalLink[] {
  const limit = options?.limit ?? DEFAULT_LIMIT;
  let items = resolveSlugs(slugs, getLocationBySlug, limit);

  if (options?.fallback !== false && items.length < limit) {
    items = uniqueBySlug([
      ...items,
      ...fallbackLocations(options?.excludeSlug, limit - items.length),
    ]);
  }

  return items
    .filter((l) => l.slug !== options?.excludeSlug)
    .slice(0, limit)
    .map(toLocationLink);
}

export function getRelatedProjects(
  slugs: string[] | undefined,
  options?: { excludeSlug?: string; limit?: number; fallback?: boolean },
): InternalLink[] {
  const limit = options?.limit ?? DEFAULT_LIMIT;
  let items = resolveSlugs(slugs, getProjectBySlug, limit);

  if (options?.fallback !== false && items.length < limit) {
    items = uniqueBySlug([
      ...items,
      ...fallbackProjects(options?.excludeSlug, limit - items.length),
    ]);
  }

  return items
    .filter((p) => p.slug !== options?.excludeSlug)
    .slice(0, limit)
    .map(toProjectLink);
}

export function getRelatedBlogs(
  slugs: string[] | undefined,
  options?: { excludeSlug?: string; limit?: number; fallback?: boolean },
): InternalLink[] {
  const limit = options?.limit ?? DEFAULT_LIMIT;
  let items = resolveSlugs(slugs, getBlogBySlug, limit);

  if (options?.fallback !== false && items.length < limit) {
    items = uniqueBySlug([
      ...items,
      ...fallbackBlogs(options?.excludeSlug, limit - items.length),
    ]);
  }

  return items
    .filter((b) => b.slug !== options?.excludeSlug)
    .slice(0, limit)
    .map(toBlogLink);
}

export function getRelatedBrands(
  slugs: string[] | undefined,
  options?: { excludeSlug?: string; limit?: number },
): InternalLink[] {
  const limit = options?.limit ?? DEFAULT_LIMIT;
  return resolveSlugs(slugs, getBrandBySlug, limit)
    .filter((b) => b.slug !== options?.excludeSlug)
    .map(toBrandLink);
}

export function getRelatedIndustries(
  slugs: string[] | undefined,
  options?: { excludeSlug?: string; limit?: number },
): InternalLink[] {
  const limit = options?.limit ?? DEFAULT_LIMIT;
  return resolveSlugs(slugs, getIndustryBySlug, limit)
    .filter((i) => i.slug !== options?.excludeSlug)
    .map(toIndustryLink);
}

/** Full related-link bundle for a service page. */
export function getRelatedForService(service: Service, limit = DEFAULT_LIMIT): RelatedLinksBundle {
  return {
    services: getRelatedServices(service.relatedServices, {
      excludeSlug: service.slug,
      limit,
      fallback: true,
    }),
    // Only resolve slugs that exist in content collections (no fabricated links).
    locations: getRelatedLocations(service.relatedLocations, { limit, fallback: false }),
    projects: getRelatedProjects(service.relatedProjects, { limit, fallback: false }),
    blogs: getRelatedBlogs(service.relatedBlogs, { limit, fallback: false }),
    brands: getRelatedBrands(service.relatedBrands, { limit }),
    industries: getRelatedIndustries(service.relatedIndustries, { limit }),
  };
}

export function getRelatedForLocation(location: Location, limit = DEFAULT_LIMIT): RelatedLinksBundle {
  return {
    services: getRelatedServices(location.relatedServices, { limit, fallback: false }),
    locations: getRelatedLocations(location.relatedLocations, {
      excludeSlug: location.slug,
      limit,
      fallback: false,
    }),
    // Only content-layer project slugs — location pages also use verifiedProjectIds from constants.
    projects: getRelatedProjects(location.relatedProjects, { limit, fallback: false }),
    blogs: getRelatedBlogs(location.relatedBlogs, { limit, fallback: false }),
    brands: [],
    industries: getRelatedIndustries(location.relatedIndustries, { limit }),
  };
}

export function getRelatedForBrand(brand: Brand, limit = DEFAULT_LIMIT): RelatedLinksBundle {
  return {
    services: getRelatedServices(brand.relatedServices, { limit }),
    locations: [],
    projects: getRelatedProjects(brand.relatedProjects, { limit }),
    blogs: getRelatedBlogs(brand.relatedBlogs, { limit }),
    brands: getRelatedBrands([], { excludeSlug: brand.slug, limit }),
    industries: [],
  };
}

export function getRelatedForIndustry(industry: Industry, limit = DEFAULT_LIMIT): RelatedLinksBundle {
  return {
    services: getRelatedServices(industry.relatedServices, { limit }),
    locations: getRelatedLocations(industry.relatedLocations, { limit }),
    projects: getRelatedProjects(industry.relatedProjects, { limit }),
    blogs: getRelatedBlogs(industry.relatedBlogs, { limit }),
    brands: [],
    industries: getRelatedIndustries([], { excludeSlug: industry.slug, limit }),
  };
}

export function getRelatedForProject(project: Project, limit = DEFAULT_LIMIT): RelatedLinksBundle {
  const locationSlugs = project.locationSlug
    ? Array.from(new Set([project.locationSlug, ...(project.relatedLocations ?? [])]))
    : project.relatedLocations;

  return {
    services: getRelatedServices(project.relatedServices, { limit, fallback: false }),
    locations: getRelatedLocations(locationSlugs, { limit, fallback: false }),
    projects: getRelatedProjects(project.relatedProjects, {
      excludeSlug: project.slug,
      limit,
      fallback: true,
    }),
    blogs: getRelatedBlogs(project.relatedBlogs, { limit, fallback: false }),
    brands: project.brandSlug ? getRelatedBrands([project.brandSlug], { limit }) : [],
    industries: getRelatedIndustries(project.relatedIndustries, { limit }),
  };
}

export function getRelatedForBlog(post: BlogPost, limit = DEFAULT_LIMIT): RelatedLinksBundle {
  return {
    services: getRelatedServices(post.relatedServices, { limit }),
    locations: getRelatedLocations(post.relatedLocations, { limit }),
    projects: getRelatedProjects(post.relatedProjects, { limit }),
    blogs: getRelatedBlogs(post.relatedBlogs, { excludeSlug: post.slug, limit, fallback: true }),
    brands: getRelatedBrands(post.relatedBrands, { limit }),
    industries: getRelatedIndustries(post.relatedIndustries, { limit }),
  };
}
