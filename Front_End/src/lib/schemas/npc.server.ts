import { z } from 'zod';
import { slugSchema } from './common.server';
import { linkedAreaSchema, linkedShopSchema } from './links.server';

export const npcDetailSchema = z.object({
  name: z.string(),
  slug: slugSchema,
  npcType: z.enum(['shopkeeper', 'gatekeeper']),
  description: z.string().nullish(),
  location: linkedAreaSchema.nullable(),
  shop: linkedShopSchema.nullable(),
  stats: z.object({
    level: z.number().nullish(),
    hp: z.number().nullish(),
    alignment: z.enum(['Good', 'Neutral', 'Evil']).nullish(),
  }).nullish(),
  emotes: z.array(z.string()).nullable().transform(val => val ?? []),
  notes: z.any().nullish() // PortableText
});

export type NpcDetail = z.infer<typeof npcDetailSchema>;
