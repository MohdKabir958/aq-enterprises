import type { BlogPost, FAQ } from '@/types';

export type BlogInput = {
  slug: string;
  title: string;
  summary: string;
  body: string;
  author?: string;
  categories: string[];
  tags?: string[];
  featuredImage?: string;
  featuredImageAlt?: string;
  faq?: FAQ[];
  relatedServices?: string[];
  relatedLocations?: string[];
  relatedProjects?: string[];
  relatedBlogs?: string[];
  seoTitle: string;
  seoDescription: string;
  keywords?: string[];
  ctaHeading?: string;
  ctaBody?: string;
  publishedAt?: string;
  updatedAt?: string;
  status?: 'draft' | 'published' | 'archived';
};

const DEFAULT_AUTHOR = 'AQ Enterprises';
const DEFAULT_DATE = '2026-08-11';

export function createBlogPost(input: BlogInput): BlogPost {
  return {
    id: input.slug,
    slug: input.slug,
    name: input.title,
    title: input.title,
    summary: input.summary,
    body: input.body,
    author: input.author ?? DEFAULT_AUTHOR,
    categories: input.categories,
    tags: input.tags,
    featuredImage: input.featuredImage,
    coverImage: input.featuredImage,
    featuredImageAlt: input.featuredImageAlt,
    faq: input.faq,
    relatedServices: input.relatedServices,
    relatedLocations: input.relatedLocations,
    relatedProjects: input.relatedProjects,
    relatedBlogs: input.relatedBlogs,
    ctaHeading: input.ctaHeading,
    ctaBody: input.ctaBody,
    status: input.status ?? 'published',
    createdAt: input.publishedAt ?? DEFAULT_DATE,
    publishedAt: input.publishedAt ?? DEFAULT_DATE,
    updatedAt: input.updatedAt ?? input.publishedAt ?? DEFAULT_DATE,
    seo: {
      title: input.seoTitle,
      description: input.seoDescription,
      canonical: `/blog/${input.slug}`,
      keywords: input.keywords,
    },
  };
}
