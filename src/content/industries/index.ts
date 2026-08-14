/**
 * Industry / vertical content collection.
 *
 * HOW TO ADD AN INDUSTRY:
 * 1. Add an `Industry` object with unique `slug`.
 * 2. Set `seo.canonical` to `/industries/{slug}`.
 * 3. Wire related service / project / location slugs.
 */

import type { Industry } from '@/types';

export const industries: Industry[] = [];
