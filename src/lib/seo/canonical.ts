/**
 * Canonical URL helpers.
 */

import { siteConfig } from '@/lib/config';

/**
 * Builds an absolute canonical URL from a path or absolute URL.
 * @example generateCanonical('/services/home-cctv')
 */
export function generateCanonical(pathOrUrl: string): string {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }

  const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${siteConfig.url}${path}`;
}

/**
 * Normalizes a site-relative path for `alternates.canonical`.
 */
export function toCanonicalPath(pathOrUrl: string): string {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    try {
      const url = new URL(pathOrUrl);
      return url.pathname || '/';
    } catch {
      return pathOrUrl;
    }
  }

  return pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
}
