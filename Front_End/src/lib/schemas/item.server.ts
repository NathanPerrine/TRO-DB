import { z } from 'zod';
import { sanityImageSchema, slugSchema } from './common.server';
import { ITEM_TYPE_VALUES } from '$lib/utils/itemTypes';

export const itemDetailSchema = z.object({
  name: z.string(),
  slug: slugSchema,
  image: sanityImageSchema.nullish(),
  type: z.enum(ITEM_TYPE_VALUES),
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
  descriptionIdentified: true
});

export type ItemDetail = z.infer<typeof itemDetailSchema>;
