import type { ContentBase } from './common';
import type { SEO } from './seo';

/** Camera / security brand page model (e.g. Hikvision). */
export interface Brand extends ContentBase {
  summary: string;
  body?: string;
  logo?: string;
  website?: string;
  /** Set true ONLY when the client supplies a dealer/partner certificate. Omit or false otherwise. */
  authorized?: boolean;
  relatedServices?: string[];
  relatedProjects?: string[];
  relatedBlogs?: string[];
  seo: SEO;
}
