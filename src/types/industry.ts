import type { ContentBase } from './common';
import type { SEO } from './seo';

/** Vertical / use-case page model (e.g. factories, hospitals). */
export interface Industry extends ContentBase {
  summary: string;
  body?: string;
  image?: string;
  relatedServices?: string[];
  relatedLocations?: string[];
  relatedProjects?: string[];
  relatedBlogs?: string[];
  relatedFaqs?: string[];
  seo: SEO;
}
