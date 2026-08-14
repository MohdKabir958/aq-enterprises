import type { ContentBase } from './common';
import type { SEO } from './seo';
import type { FAQ } from './faq';

/** Placeholder until real photography is available. */
export interface ImagePlaceholder {
  id: string;
  /** Descriptive ALT text for accessibility / SEO. */
  alt: string;
  /** Visible label shown in the UI placeholder. */
  label: string;
  /** Planned public path, e.g. `/images/projects/villa-banjara/exterior.webp`. */
  src?: string;
  /** Filename only, e.g. `exterior.webp`. */
  filename?: string;
  /** Caption shown under a real photo, or as guidance on the placeholder. */
  caption?: string;
  width?: number;
  height?: number;
}

export interface ContentSection {
  heading: string;
  /** Plain text; use blank lines between paragraphs. */
  body: string;
}

export interface ContentListSection {
  heading: string;
  intro?: string;
  items: string[];
}

export interface ConfigOption {
  name: string;
  description: string;
  suitableFor?: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface ServiceCta {
  heading: string;
  body: string;
  primaryLabel?: string;
  /** Defaults to `/#contact`. */
  primaryHref?: string;
  secondaryLabel?: string;
  /** Defaults to tel: link from site constants when omitted in template. */
  secondaryHref?: string;
}

export interface ServiceHero {
  eyebrow?: string;
  headline: string;
  subheadline: string;
  image?: ImagePlaceholder;
}

/** CCTV / security service page model. */
export interface Service extends ContentBase {
  /** Short summary for cards, listings, and meta fallbacks. */
  summary: string;
  /** SEO-optimized H1 (may differ slightly from `name`). */
  h1: string;
  hero: ServiceHero;
  introduction: string;
  whatIs: ContentSection;
  whoNeeds: ContentListSection;
  commonProblems: ContentListSection;
  ourSolution: ContentSection;
  systemOptions: {
    heading: string;
    intro?: string;
    options: ConfigOption[];
  };
  keyFeatures: ContentListSection;
  benefits: ContentListSection;
  recommendedConfigurations: {
    heading: string;
    intro?: string;
    configs: ConfigOption[];
  };
  installationProcess: {
    heading: string;
    intro?: string;
    steps: ProcessStep[];
  };
  maintenance: ContentSection;
  brands?: ContentSection;
  warranty: ContentSection;
  whyChoose: ContentListSection;
  hyderabadCoverage: ContentSection;
  cta: ServiceCta;
  /** Page-specific FAQs (also emitted as FAQ schema). */
  faqs: FAQ[];
  /** Extra image placeholders referenced in content. */
  imagePlaceholders?: ImagePlaceholder[];
  /** Optional legacy long-form body (unused when structured fields are present). */
  body?: string;
  image?: string;
  relatedLocations?: string[];
  relatedIndustries?: string[];
  relatedBrands?: string[];
  relatedProjects?: string[];
  relatedBlogs?: string[];
  relatedServices?: string[];
  relatedFaqs?: string[];
  seo: SEO;
}
