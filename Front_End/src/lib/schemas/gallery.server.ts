import { z } from 'zod';
import { sanityImageSchema, slugSchema } from './common.server';
import { linkedAccessorySchema, linkedEquipmentSchema, linkedItemSchema } from './links.server';


export const galleryDetailSchema = z.object({
  title: z.string(),
  slug: slugSchema,
  image: sanityImageSchema,
  alt: z.string().nullish(),
  description: z.string().nullish(),
  category: z.enum(['screenshots', 'dyes', 'weapons', 'helm', 'cowl', 'chest', 'robe', 'skirt', 'wrists', 'legs', 'feet', 'shield', 'amulet', 'backpack', 'baldric', 'belt', 'ring']),
  tags: z.array(z.string()).nullish(),
  relatedEquipment: linkedEquipmentSchema.nullish(),
  relatedAccessory: linkedAccessorySchema.nullish(),
  relatedItem: linkedItemSchema.nullish(),
})

export const galleryListItemSchema = galleryDetailSchema.pick({
  title: true,
  slug: true,
  image: true,
  alt: true,
  category: true
})

export type GalleryDetail   = z.infer<typeof galleryDetailSchema>
export type GalleryListItem = z.infer<typeof galleryListItemSchema>