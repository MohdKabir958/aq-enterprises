import type { ContentBase } from './common';
import type { SEO } from './seo';
import type { ImagePlaceholder, ServiceCta } from './service';

export type ProjectCategory = 'Home' | 'Office' | 'Industrial' | string;

export interface ProjectTechDetail {
  label: string;
  value: string;
}

export interface ProjectTestimonial {
  quote: string;
  name: string;
  role: string;
}

/** Case-study / installation project page model — verified fields only. */
export interface Project extends ContentBase {
  /** Matches `PROJECTS_DATA[].id` in constants. */
  sourceId: string;
  /** Short summary for cards and meta fallbacks. */
  summary: string;
  /** Optional H1 override; defaults to `name`. */
  h1?: string;
  category: ProjectCategory;
  locationLabel: string;
  /** Location content slug when a matching area page exists. */
  locationSlug?: string;
  /** Secondary location slugs when a project spans areas (e.g. Ameerpet & Kukatpally). */
  relatedLocations?: string[];
  cameras?: number;
  brandLabel?: string;
  /** Only set when a brand content page exists. */
  brandSlug?: string;
  duration?: string;
  /**
   * Factual overview built only from verified metadata.
   * Do not invent client problems or outcomes here.
   */
  overview: string;
  /** Omit when not verified. */
  clientRequirement?: string;
  /** Omit when not verified. */
  solution?: string;
  /** Equipment notes limited to verified brand / count / category. */
  equipment?: string;
  /** Omit when not verified beyond duration. */
  installationApproach?: string;
  /** Omit when not verified. */
  results?: string;
  technicalDetails: ProjectTechDetail[];
  /** Real image path under /public when available. */
  image?: string;
  imageAlt?: string;
  /** Placeholders until real photography is supplied — never labeled as project photos. */
  gallery?: ImagePlaceholder[];
  /** Only from existing TESTIMONIALS that clearly match this project. */
  testimonial?: ProjectTestimonial;
  cta?: ServiceCta;
  relatedServices?: string[];
  relatedProjects?: string[];
  relatedIndustries?: string[];
  relatedBlogs?: string[];
  body?: string;
  seo: SEO;
}
