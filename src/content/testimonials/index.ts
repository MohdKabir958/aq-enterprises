/**
 * Testimonials content collection.
 *
 * HOW TO ADD A VERIFIED REVIEW:
 * 1. Add a Testimonial with verificationStatus: 'verified' and status: 'published'.
 * 2. Include source (e.g. "Google Business Profile") and optional sourceUrl / rating.
 * 3. Only then will homepage / shared social-proof sections render it.
 *
 * Pending project-handover quotes stay draft until the client confirms permission and authenticity.
 */

import type { Testimonial } from '@/types';

/** Pending project-linked feedback — not shown as Google ratings. */
export const pendingProjectTestimonials: Testimonial[] = [
  {
    id: 'factory-nacharam-feedback',
    quote:
      'Installation was clean and the team explained every camera angle before finalizing. Zero blind spots in our warehouse now.',
    name: 'Ravi Kumar',
    role: 'Factory Owner, Nacharam',
    projectSlug: 'factory-nacharam',
    verificationStatus: 'pending',
    status: 'draft',
    source: 'Project handover feedback',
  },
  {
    id: 'villa-banjara-feedback',
    quote:
      "Quick response every time we've needed support. Worth every rupee of the AMC.",
    name: 'Priya Nair',
    role: 'Villa Owner, Banjara Hills',
    projectSlug: 'villa-banjara',
    verificationStatus: 'pending',
    status: 'draft',
    source: 'Project handover feedback',
  },
  {
    id: 'retail-ameerpet-feedback',
    quote:
      'Rolled out across all 6 stores in under two weeks with zero downtime. Highly recommended.',
    name: 'Arjun Mehta',
    role: 'Retail Operations Manager, Hyderabad',
    projectSlug: 'retail-ameerpet',
    verificationStatus: 'pending',
    status: 'draft',
    source: 'Project handover feedback',
  },
];

/** Published + verified only — empty until client supplies confirmed reviews. */
export const testimonials: Testimonial[] = [];

export function getPublishedVerifiedTestimonials(): Testimonial[] {
  return testimonials.filter(
    (t) => t.status === 'published' && t.verificationStatus === 'verified',
  );
}

export function getVerifiedTestimonialForProject(projectSlug: string): Testimonial | undefined {
  return getPublishedVerifiedTestimonials().find((t) => t.projectSlug === projectSlug);
}
