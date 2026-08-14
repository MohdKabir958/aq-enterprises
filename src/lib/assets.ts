/**
 * @file assets.ts
 * @description Paths and helpers for verified business media under /public/images.
 *
 * Do not invent photographs. Place real files only after client approval.
 * Prefer next/image with explicit width/height or fill + sizes to avoid CLS.
 *
 * Filesystem checks live in `assets-server.ts` so this module stays client-safe.
 */

export const IMAGE_ROOT = '/images' as const;

export const ASSET_DIRS = {
  company: `${IMAGE_ROOT}/company`,
  team: `${IMAGE_ROOT}/team`,
  projects: `${IMAGE_ROOT}/projects`,
  brands: `${IMAGE_ROOT}/brands`,
  services: `${IMAGE_ROOT}/services`,
  location: `${IMAGE_ROOT}/location`,
} as const;

/** Existing verified logo (legacy path kept until moved). */
export const LOGO_SRC = '/assets/aq-logo.png';

/** Existing about hero video (legacy path). */
export const ABOUT_VIDEO_SRC = '/assets/about-hero.mp4';

/**
 * Build a project image path once the client supplies files.
 * Example: projectImagePath('factory-nacharam', 'exterior') →
 * `/images/projects/factory-nacharam/exterior.webp`
 */
export function projectImagePath(projectId: string, slug: string, ext = 'webp') {
  return `${ASSET_DIRS.projects}/${projectId}/${slug}.${ext}`;
}

export function companyImagePath(slug: string, ext = 'webp') {
  return `${ASSET_DIRS.company}/${slug}.${ext}`;
}

export function teamImagePath(slug: string, ext = 'webp') {
  return `${ASSET_DIRS.team}/${slug}.${ext}`;
}

/** Default responsive sizes for content images */
export const IMAGE_SIZES = {
  hero: '100vw',
  content: '(max-width: 768px) 100vw, 720px',
  card: '(max-width: 768px) 100vw, 400px',
  thumb: '(max-width: 768px) 50vw, 200px',
} as const;

/** P0 company photographs the client must supply. */
export const COMPANY_PHOTO_SLOTS = [
  {
    slug: 'office-exterior',
    filename: 'office-exterior.webp',
    alt: 'AQ Enterprises office or workshop exterior in Mallapur, Hyderabad',
    caption: 'Mallapur base — storefront or workshop approach.',
  },
  {
    slug: 'office-interior',
    filename: 'office-interior.webp',
    alt: 'Interior of the AQ Enterprises Mallapur office or workshop',
    caption: 'Reception, counter, or workshop interior.',
  },
  {
    slug: 'installation-team',
    filename: 'installation-team.webp',
    alt: 'AQ Enterprises installation team at a Hyderabad CCTV job (consent required)',
    caption: 'On-site installation team. Written consent required.',
  },
] as const;

/** P0/P1 team photographs — names and roles only with consent. */
export const TEAM_PHOTO_SLOTS = [
  {
    slug: 'lead',
    filename: 'lead.webp',
    alt: 'AQ Enterprises founder or installation lead (name confirmed by client)',
  },
  {
    slug: 'technicians',
    filename: 'technicians.webp',
    alt: 'AQ Enterprises CCTV installation technicians (consent required)',
  },
] as const;
