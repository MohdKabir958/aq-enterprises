/**
 * Builds a Project content entry strictly from verified PROJECTS_DATA fields.
 * Optional narrative sections are omitted unless explicitly provided.
 */

import type { Project, ProjectTestimonial } from '@/types';
import { buildProjectGallery, plannedProjectHeroSrc } from '@/lib/project-photos';

type VerifiedProjectInput = {
  sourceId: string;
  slug: string;
  name: string;
  category: 'Home' | 'Office' | 'Industrial';
  locationLabel: string;
  locationSlug?: string;
  relatedLocations?: string[];
  cameras: number;
  brandLabel: string;
  duration: string;
  imageAlt: string;
  summary: string;
  overview: string;
  relatedServices: string[];
  relatedProjects: string[];
  testimonial?: ProjectTestimonial;
  seoTitle: string;
  seoDescription: string;
  keywords?: string[];
  /** Optional — only when truly verified beyond metadata. */
  clientRequirement?: string;
  solution?: string;
  equipment?: string;
  installationApproach?: string;
  results?: string;
};

export function createVerifiedProject(input: VerifiedProjectInput): Project {
  return {
    id: input.sourceId,
    sourceId: input.sourceId,
    slug: input.slug,
    name: input.name,
    status: 'published',
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11',
    publishedAt: '2026-08-11',
    summary: input.summary,
    h1: input.name,
    category: input.category,
    locationLabel: input.locationLabel,
    locationSlug: input.locationSlug,
    relatedLocations: input.relatedLocations ?? [],
    cameras: input.cameras,
    brandLabel: input.brandLabel,
    duration: input.duration,
    image: plannedProjectHeroSrc(input.sourceId),
    imageAlt: input.imageAlt,
    overview: input.overview,
    clientRequirement: input.clientRequirement,
    solution: input.solution,
    equipment:
      input.equipment ??
      `${input.brandLabel} security system with ${input.cameras} surveillance cameras, central recording, and dedicated power provisioning.`,
    installationApproach:
      input.installationApproach ??
      `Site survey, structured cabling, hardware mounting, viewing angle calibration, and handover completed within ${input.duration}.`,
    results: input.results,
    technicalDetails: [
      { label: 'Category', value: input.category },
      { label: 'Location', value: input.locationLabel },
      { label: 'Cameras', value: String(input.cameras) },
      { label: 'Brand', value: input.brandLabel },
      { label: 'Duration', value: input.duration },
    ],
    gallery: buildProjectGallery(input.sourceId, input.imageAlt),
    testimonial: input.testimonial,
    cta: {
      heading: 'Planning a similar installation?',
      body: 'Request a free site survey in Hyderabad. We quote from the property — not from a generic camera count.',
      primaryLabel: 'Request a Free Site Survey',
      primaryHref: '/#contact',
    },
    relatedServices: input.relatedServices,
    relatedProjects: input.relatedProjects,
    relatedBlogs: [],
    seo: {
      title: input.seoTitle,
      description: input.seoDescription,
      canonical: `/projects/${input.slug}`,
      keywords: input.keywords,
    },
  };
}
