/**
 * Shared SEO, metadata, Open Graph, and schema contracts.
 * All content entities attach an `seo` field of type `SEO`.
 */

/** Canonical SEO fields stored on every content entity. */
export interface SEO {
  /** Browser / SERP title (layout appends "| AQ Enterprises"). */
  title: string;
  /** Meta description (aim ~150–160 chars). */
  description: string;
  /** Absolute or site-relative canonical path, e.g. `/services/home-cctv`. */
  canonical: string;
  /** Optional keyword list for internal tooling; not always emitted as meta keywords. */
  keywords?: string[];
  /** Open Graph / social image path or absolute URL. */
  ogImage?: string;
  /** Override OG title; falls back to `title`. */
  ogTitle?: string;
  /** Override OG description; falls back to `description`. */
  ogDescription?: string;
  /** When true, emit noindex/nofollow. Default false. */
  noIndex?: boolean;
}

/** Input for building Next.js `Metadata` from content. */
export interface MetadataInput {
  seo: SEO;
  /** Optional absolute page URL override. */
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}

/** Open Graph payload builder input. */
export interface OpenGraphInput {
  title: string;
  description: string;
  url: string;
  image?: string;
  type?: 'website' | 'article';
  siteName?: string;
  locale?: string;
}

/** Visual + JSON-LD breadcrumb crumb. */
export interface BreadcrumbItem {
  name: string;
  url: string;
}

/** Generic JSON-LD object (schema.org). */
export type SchemaObject = Record<string, unknown>;

/** Supported entity kinds for schema generation. */
export type SchemaEntityType =
  | 'service'
  | 'location'
  | 'brand'
  | 'industry'
  | 'project'
  | 'blog'
  | 'faq'
  | 'breadcrumb'
  | 'organization'
  | 'localBusiness';
