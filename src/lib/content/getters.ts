/**
 * Scale-ready content accessors.
 *
 * All public routes should resolve entities through these getters so swapping
 * the storage backend later (CMS, DB, MDX) only requires changing this layer.
 */

import {
  blogs,
  brands,
  faqs,
  industries,
  locations,
  projects,
  serviceLocations,
  services,
  testimonials,
} from '@/content';
import type {
  BlogPost,
  Brand,
  FAQ,
  Industry,
  Location,
  Project,
  Service,
  ServiceLocationPage,
  Testimonial,
} from '@/types';

type WithStatus = { status?: string };
type WithSlug = { slug: string };

function isPublished<T extends WithStatus>(item: T): boolean {
  return !item.status || item.status === 'published';
}

function bySlug<T extends WithSlug>(items: T[], slug: string): T | undefined {
  return items.find((item) => item.slug === slug);
}

function publishedList<T extends WithStatus>(items: T[]): T[] {
  return items.filter(isPublished);
}

// ─── Services ────────────────────────────────────────────────────────────────

export function getAllServices(options?: { includeDrafts?: boolean }): Service[] {
  return options?.includeDrafts ? [...services] : publishedList(services);
}

export function getServiceBySlug(slug: string): Service | undefined {
  const item = bySlug(services, slug);
  return item && isPublished(item) ? item : undefined;
}

export function getServiceSlugs(): string[] {
  return getAllServices().map((s) => s.slug);
}

// ─── Locations ───────────────────────────────────────────────────────────────

export function getAllLocations(options?: { includeDrafts?: boolean }): Location[] {
  return options?.includeDrafts ? [...locations] : publishedList(locations);
}

export function getLocationBySlug(slug: string): Location | undefined {
  const item = bySlug(locations, slug);
  return item && isPublished(item) ? item : undefined;
}

export function getLocationSlugs(): string[] {
  return getAllLocations().map((l) => l.slug);
}

// ─── Brands ──────────────────────────────────────────────────────────────────

export function getAllBrands(options?: { includeDrafts?: boolean }): Brand[] {
  return options?.includeDrafts ? [...brands] : publishedList(brands);
}

export function getBrandBySlug(slug: string): Brand | undefined {
  const item = bySlug(brands, slug);
  return item && isPublished(item) ? item : undefined;
}

export function getBrandSlugs(): string[] {
  return getAllBrands().map((b) => b.slug);
}

// ─── Industries ──────────────────────────────────────────────────────────────

export function getAllIndustries(options?: { includeDrafts?: boolean }): Industry[] {
  return options?.includeDrafts ? [...industries] : publishedList(industries);
}

export function getIndustryBySlug(slug: string): Industry | undefined {
  const item = bySlug(industries, slug);
  return item && isPublished(item) ? item : undefined;
}

export function getIndustrySlugs(): string[] {
  return getAllIndustries().map((i) => i.slug);
}

// ─── Projects ────────────────────────────────────────────────────────────────

export function getAllProjects(options?: { includeDrafts?: boolean }): Project[] {
  return options?.includeDrafts ? [...projects] : publishedList(projects);
}

export function getProjectBySlug(slug: string): Project | undefined {
  const item = bySlug(projects, slug);
  return item && isPublished(item) ? item : undefined;
}

export function getProjectSlugs(): string[] {
  return getAllProjects().map((p) => p.slug);
}

// ─── Blogs ───────────────────────────────────────────────────────────────────

export function getAllBlogs(options?: { includeDrafts?: boolean }): BlogPost[] {
  return options?.includeDrafts ? [...blogs] : publishedList(blogs);
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  const item = bySlug(blogs, slug);
  return item && isPublished(item) ? item : undefined;
}

export function getBlogSlugs(): string[] {
  return getAllBlogs().map((b) => b.slug);
}

export function getBlogCategories(): string[] {
  return Array.from(
    new Set(getAllBlogs().flatMap((b) => b.categories ?? [])),
  ).sort();
}

// ─── FAQs / Testimonials ─────────────────────────────────────────────────────

export function getAllFaqs(options?: { includeDrafts?: boolean }): FAQ[] {
  return options?.includeDrafts ? [...faqs] : publishedList(faqs);
}

export function getFaqById(id: string): FAQ | undefined {
  const item = faqs.find((f) => f.id === id);
  return item && isPublished(item) ? item : undefined;
}

export function getFaqsByIds(ids: string[]): FAQ[] {
  return ids.map(getFaqById).filter((f): f is FAQ => Boolean(f));
}

export function getAllTestimonials(options?: { includeDrafts?: boolean }): Testimonial[] {
  return options?.includeDrafts ? [...testimonials] : publishedList(testimonials);
}

// ─── Service × Location (P1 allowlist) ───────────────────────────────────────

export function getAllServiceLocations(options?: {
  includeDrafts?: boolean;
}): ServiceLocationPage[] {
  return options?.includeDrafts ? [...serviceLocations] : publishedList(serviceLocations);
}

export function getServiceLocation(
  locationSlug: string,
  serviceSlug: string,
): ServiceLocationPage | undefined {
  const item = serviceLocations.find(
    (p) => p.locationSlug === locationSlug && p.serviceSlug === serviceSlug,
  );
  return item && isPublished(item) ? item : undefined;
}

export function getServiceLocationsForLocation(locationSlug: string): ServiceLocationPage[] {
  return getAllServiceLocations().filter((p) => p.locationSlug === locationSlug);
}

export function getServiceLocationsForService(serviceSlug: string): ServiceLocationPage[] {
  return getAllServiceLocations().filter((p) => p.serviceSlug === serviceSlug);
}

export function getServiceLocationStaticParams(): { slug: string; service: string }[] {
  return getAllServiceLocations().map((p) => ({
    slug: p.locationSlug,
    service: p.serviceSlug,
  }));
}

// ─── Static params helpers (App Router) ──────────────────────────────────────

export function toStaticParams(slugs: string[]): { slug: string }[] {
  return slugs.map((slug) => ({ slug }));
}

/** All indexable content URLs for sitemap generation. */
export function getAllContentPaths(): {
  path: string;
  lastModified?: string;
}[] {
  const paths: { path: string; lastModified?: string }[] = [];

  for (const s of getAllServices()) {
    paths.push({ path: `/services/${s.slug}`, lastModified: s.updatedAt ?? s.publishedAt });
  }
  for (const l of getAllLocations()) {
    paths.push({ path: `/locations/${l.slug}`, lastModified: l.updatedAt ?? l.publishedAt });
  }
  for (const pair of getAllServiceLocations()) {
    paths.push({
      path: `/locations/${pair.locationSlug}/${pair.serviceSlug}`,
      lastModified: pair.updatedAt ?? pair.publishedAt,
    });
  }
  for (const b of getAllBrands()) {
    paths.push({ path: `/brands/${b.slug}`, lastModified: b.updatedAt ?? b.publishedAt });
  }
  for (const i of getAllIndustries()) {
    paths.push({ path: `/industries/${i.slug}`, lastModified: i.updatedAt ?? i.publishedAt });
  }
  for (const p of getAllProjects()) {
    paths.push({ path: `/projects/${p.slug}`, lastModified: p.updatedAt ?? p.publishedAt });
  }
  for (const post of getAllBlogs()) {
    paths.push({ path: `/blog/${post.slug}`, lastModified: post.updatedAt ?? post.publishedAt });
  }

  return paths;
}
