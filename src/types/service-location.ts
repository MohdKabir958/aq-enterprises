import type { ContentBase } from './common';
import type { SEO } from './seo';
import type { FAQ } from './faq';
import type {
  ContentListSection,
  ContentSection,
  ProcessStep,
  ServiceCta,
  ServiceHero,
} from './service';

/**
 * Service × Location landing page — allowlisted P1 combinations only.
 * Canonical path: /locations/{locationSlug}/{serviceSlug}
 */
export interface ServiceLocationPage extends ContentBase {
  serviceSlug: string;
  locationSlug: string;
  h1: string;
  summary: string;
  hero: ServiceHero;
  introduction: string;
  securityRequirements: ContentListSection;
  recommendedSolution: ContentSection;
  equipmentFeatures: ContentListSection;
  installationProcess: {
    heading: string;
    intro?: string;
    steps: ProcessStep[];
  };
  /** Verified project slug from content/projects only. */
  projectSlug?: string;
  whyChoose: ContentListSection;
  faqs: FAQ[];
  relatedServices?: string[];
  relatedLocations?: string[];
  cta: ServiceCta;
  seo: SEO;
}
