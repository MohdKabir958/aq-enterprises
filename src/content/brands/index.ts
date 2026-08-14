/**
 * Brand content collection.
 *
 * HOW TO ADD A BRAND:
 * 1. Add a `Brand` object with unique `slug`.
 * 2. Set `seo.canonical` to `/brands/{slug}`.
 * 3. Link `relatedServices` / `relatedProjects` as needed.
 */

import type { Brand } from '@/types';

export const brands: Brand[] = [];
