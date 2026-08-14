import type { ServiceLocationPage } from '@/types';
import { serviceLocationProcess, whyAqItems } from './_shared';

export type ServiceLocationInput = {
  serviceSlug: string;
  locationSlug: string;
  locationName: string;
  serviceName: string;
  h1: string;
  summary: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroSubheadline: string;
  introduction: string;
  requirementsHeading: string;
  requirementsIntro?: string;
  requirements: string[];
  solutionHeading: string;
  solutionBody: string;
  equipmentHeading: string;
  equipmentIntro?: string;
  equipment: string[];
  processOverrides?: Partial<Record<string, string>>;
  projectSlug?: string;
  whyIntro?: string;
  whyExtra?: string[];
  faqs: { id: string; question: string; answer: string }[];
  relatedServices: string[];
  relatedLocations: string[];
  seoTitle: string;
  seoDescription: string;
  keywords?: string[];
  ctaHeading: string;
  ctaBody: string;
};

export function createServiceLocation(input: ServiceLocationInput): ServiceLocationPage {
  const id = `${input.locationSlug}--${input.serviceSlug}`;
  return {
    id,
    slug: id,
    name: input.h1,
    status: 'published',
    createdAt: '2026-08-11',
    updatedAt: '2026-08-11',
    publishedAt: '2026-08-11',
    serviceSlug: input.serviceSlug,
    locationSlug: input.locationSlug,
    h1: input.h1,
    summary: input.summary,
    hero: {
      eyebrow: input.heroEyebrow,
      headline: input.heroHeadline,
      subheadline: input.heroSubheadline,
    },
    introduction: input.introduction,
    securityRequirements: {
      heading: input.requirementsHeading,
      intro: input.requirementsIntro,
      items: input.requirements,
    },
    recommendedSolution: {
      heading: input.solutionHeading,
      body: input.solutionBody,
    },
    equipmentFeatures: {
      heading: input.equipmentHeading,
      intro: input.equipmentIntro,
      items: input.equipment,
    },
    installationProcess: {
      heading: `How we install ${input.serviceName.toLowerCase()} in ${input.locationName}`,
      intro: 'Process is consistent; the survey notes are specific to this service and area.',
      steps: serviceLocationProcess(input.serviceName, input.locationName, input.processOverrides),
    },
    projectSlug: input.projectSlug,
    whyChoose: {
      heading: `Why AQ Enterprises for ${input.serviceName.toLowerCase()} in ${input.locationName}`,
      intro: input.whyIntro,
      items: [...whyAqItems, ...(input.whyExtra ?? [])],
    },
    faqs: input.faqs.map((f) => ({ ...f, status: 'published' as const })),
    relatedServices: input.relatedServices,
    relatedLocations: input.relatedLocations,
    cta: {
      heading: input.ctaHeading,
      body: input.ctaBody,
      primaryLabel: 'Request a Free Site Survey',
      primaryHref: '/#contact',
    },
    seo: {
      title: input.seoTitle,
      description: input.seoDescription,
      canonical: `/locations/${input.locationSlug}/${input.serviceSlug}`,
      keywords: input.keywords,
    },
  };
}
