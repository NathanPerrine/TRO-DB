import { z } from 'zod';
import { rangeSchema, slugSchema, areaTypeSchema } from './common.server';
import { bookSchema } from './book.server';
import { accessoryDetailSchema, armorDetailSchema, weaponDetailSchema } from './equipment.server';
import { mobListItemSchema } from './mob.server';
import { linkedAreaSchema } from './links.server';

const dropsSchema = z.object({
  books: z.array(bookSchema.pick({
    name: true,
    slug: true,
    bookType: true
  })),
  armors: z.array(armorDetailSchema.pick({
    name: true,
    identifiedName: true,
    slug: true,
    rarity: true,
    levelRequirement: true,
    armorWeapon: true,
    armorAttributes: true,
    attributes: true
  })),
  weapons: z.array(weaponDetailSchema.pick({
    name: true,
    identifiedName: true,
    slug: true,
    rarity: true,
    levelRequirement: true,
    armorWeapon: true,
    weaponAttributes: true,
    attributes: true
  })),
  accessories: z.array(accessoryDetailSchema.pick({
    identifiedName: true,
    slug: true,
    slot: true,
    rarity: true
  })),
})

const directionSchema = z.object({
  town: linkedAreaSchema.nullable(),
  directions: z.string()
});

export const areaDetailSchema = z.object({
  name: z.string(),
  slug: slugSchema,
  areaType: areaTypeSchema,
  description: z.string().nullish(),
  map: z.string().nullish(),
  directions: z.array(directionSchema)
    .nullable()
    .transform(val => val?.filter(d => d.town !== null) ?? []),
  levelRange: rangeSchema.nullish(),
  walkthrough: z.any().nullish(), // PortableText
  notes: z.any().nullish(), // PortableText
  drops: dropsSchema.nullish(),
  mobs: z.array(mobListItemSchema).nullish(),
  connectedAreas: z.array(linkedAreaSchema.nullable())
    .nullable()
    .transform(val => val?.filter(item => item !== null) ?? [])
});

export const areaListItemSchema = areaDetailSchema.pick({
  name: true,
  slug: true,
  areaType: true,
  directions: true,
  levelRange: true,
});

export type AreaDetail = z.infer<typeof areaDetailSchema>;
export type AreaListItem = z.infer<typeof areaListItemSchema>;