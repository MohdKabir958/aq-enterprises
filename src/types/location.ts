import type { ContentBase } from './common';
import type { SEO } from './seo';
import type { FAQ } from './faq';
import type {
  ContentListSection,
  ContentSection,
  ImagePlaceholder,
  ProcessStep,
  ServiceCta,
  ServiceHero,
} from './service';

/** Geo / service-area page model (e.g. Banjara Hills, Hyderabad). */
export interface Location extends ContentBase {
  /** Short summary for cards and meta fallbacks. */
  summary: string;
  /** SEO-optimized H1. */
  h1: string;
  /** City / region hierarchy for display (not a branch address). */
  city: string;
  region: string;
  country?: string;
  hero: ServiceHero;
  introduction: string;
  /** Property / customer types common in this area (general, not claimed customers). */
  propertyTypes: ContentListSection;
  /** Realistic security considerations for the area. */
  securityRequirements: ContentListSection;
  /** Recommended system approaches for the area. */
  recommendedSolutions: ContentSection;
  /** Optional intro above the related-services links. */
  servicesIntro?: string;
  installationProcess: {
    heading: string;
    intro?: string;
    steps: ProcessStep[];
  };
  maintenance: ContentSection;
  whyLocal?: ContentListSection;
  cta: ServiceCta;
  faqs: FAQ[];
  /**
   * IDs from `PROJECTS_DATA` in `@/lib/constants` only.
   * Do not invent projects — leave empty when none are verified for this area.
   */
  verifiedProjectIds?: string[];
  imagePlaceholders?: ImagePlaceholder[];
  /** Optional lat/lng — prefer omit on neighborhood pages (no fake branch pins). */
  geo?: {
    latitude: number;
    longitude: number;
  };
  body?: string;
  relatedServices?: string[];
  relatedLocations?: string[];
  relatedProjects?: string[];
  relatedIndustries?: string[];
  relatedBlogs?: string[];
  relatedFaqs?: string[];
  seo: SEO;
}
