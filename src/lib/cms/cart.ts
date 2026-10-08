import { z } from 'zod';
import { slugSchema } from './models';
export const cartItemsSchema = z
  .array(
    z.object({ id: slugSchema, quantity: z.number().int().min(1).max(99) }),
  )
  .max(40)
  .refine(
    (items) => new Set(items.map((i) => i.id)).size === items.length,
    'Duplicate products are not allowed.',
  );
export type CartItem = z.infer<typeof cartItemsSchema>[number];
