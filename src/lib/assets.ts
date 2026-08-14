/**
 * @file assets.ts
 * @description Paths and helpers for verified business media under /public/images.
 *
 * Do not invent photographs. Place real files only after client approval.
 * Prefer next/image with explicit width/height or fill + sizes to avoid CLS.
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
