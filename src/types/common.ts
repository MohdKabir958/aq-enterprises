/**
 * Shared primitives used across content entities.
 */

/** URL-safe identifier used in dynamic routes. */
export type Slug = string;

/** Publication lifecycle for search-ready content pipelines. */
export type ContentStatus = 'draft' | 'published' | 'archived';

/** Lightweight cross-entity reference by slug. */
export interface SlugRef {
  slug: Slug;
}

/** Base fields every content entity should carry. */
export interface ContentBase {
  /** Stable internal id (may match slug). */
  id: string;
  slug: Slug;
  /** Human-readable name / title. */
  name: string;
  status: ContentStatus;
  /** ISO date strings for sitemap / article metadata. */
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}
