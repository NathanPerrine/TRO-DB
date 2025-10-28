import { z } from 'zod';
import { slugSchema } from './common.server';

export const itemDetailSchema = z.object({
  name: z.string(),
  slug: slugSchema,
  type: z.enum(['junk', 'potion', 'elixir', 'bauble', 'scroll', 'wand', 'orb', 'spellbook', 'ability book', 'dungeon']),
  description: z.string().nullish(),
  descriptionIdentified: z.string().nullish(),
  weight: z.number().nullish(),
  condition: z.number().nullish(),
  buyPrice: z.number().nullish(),
  sellPrice: z.number().nullish(),
  charges: z.number().nullish(),
  notes: z.array(z.any()).nullish() // PortableText
});

export const itemListItemSchema = itemDetailSchema.pick({
  name: true,
  slug: true,
  descriptionIdentified: true,
});

export type ItemDetail = z.infer<typeof itemDetailSchema>;