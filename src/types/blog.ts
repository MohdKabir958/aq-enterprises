import type { ContentBase } from './common';
import type { FAQ } from './faq';
import type { SEO } from './seo';

/** Blog / resource article model. */
export interface BlogPost extends ContentBase {
  title: string;
  summary: string;
  /**
   * Article body using lightweight markup:
   * - `## Heading` for H2 sections (TOC anchors)
   * - blank-line separated paragraphs
   * - `- item` for unordered lists
   * - `[label](/path)` for internal links
   */
  body: string;
  author: string;
  /** Categories for index filtering/grouping */
  categories: string[];
  tags?: string[];
  /** Prefer this field; falls back to coverImage when rendering */
  featuredImage?: string;
  /** @deprecated Prefer featuredImage */
  coverImage?: string;
  featuredImageAlt?: string;
  /** Optional FAQ block — only when the article genuinely answers Q&A */
  faq?: FAQ[];
  relatedServices?: string[];
  relatedLocations?: string[];
  relatedIndustries?: string[];
  relatedBrands?: string[];
  relatedProjects?: string[];
  relatedBlogs?: string[];
  /** CTA overrides */
  ctaHeading?: string;
  ctaBody?: string;
  seo: SEO;
}
