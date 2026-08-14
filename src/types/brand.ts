import type { ContentBase } from './common';
import type { SEO } from './seo';

/** Camera / security brand page model (e.g. Hikvision). */
export interface Brand extends ContentBase {
  summary: string;
  body?: string;
  logo?: string;
  website?: string;
  /** Whether AQ is an authorized dealer/partner. */
  authorized?: boolean;
  relatedServices?: string[];
  relatedProjects?: string[];
  relatedBlogs?: string[];
  seo: SEO;
}
