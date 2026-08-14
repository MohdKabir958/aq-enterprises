import type { ContentBase } from './common';
import type { SEO } from './seo';

/** Single FAQ entry — reusable across pages and FAQ schema. */
export interface FAQ {
  id: string;
  slug?: string;
  question: string;
  answer: string;
  /** Optional entity scoping for filtered FAQ sets. */
  relatedServices?: string[];
  relatedLocations?: string[];
  relatedIndustries?: string[];
  status?: 'draft' | 'published' | 'archived';
}

/** Optional dedicated FAQ collection page (future). */
export interface FAQPage extends ContentBase {
  summary?: string;
  faqIds: string[];
  seo: SEO;
}
