import type { ContentBase } from './common';

/**
 * Customer testimonial model.
 * Only publish entries with verificationStatus === 'verified'.
 * Pending / unverified items may appear on matching project pages with clear source labels — never as Google star ratings.
 */
export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  /** Optional associations */
  locationSlug?: string;
  brandSlug?: string;
  projectSlug?: string;
  serviceSlug?: string;
  industrySlug?: string;
  /** Only set when independently verified (e.g. Google review with permission). */
  rating?: number;
  /** Review source label, e.g. "Google Business Profile", "Project handover feedback" */
  source?: string;
  sourceUrl?: string;
  verificationStatus: 'verified' | 'pending' | 'unverified';
  status?: 'draft' | 'published' | 'archived';
}

export type TestimonialEntry = Testimonial & Partial<ContentBase>;
