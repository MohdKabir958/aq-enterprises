/**
 * FAQ content collection.
 *
 * HOW TO ADD AN FAQ:
 * 1. Add an `FAQ` object with unique `id`.
 * 2. Optionally scope it via `relatedServices` / `relatedLocations` / `relatedIndustries`.
 * 3. Attach FAQ ids on entity pages via `relatedFaqs`.
 *
 * Note: Homepage `FAQ_DATA` in `lib/constants.ts` remains until migrated.
 */

import type { FAQ } from '@/types';

export const faqs: FAQ[] = [];
