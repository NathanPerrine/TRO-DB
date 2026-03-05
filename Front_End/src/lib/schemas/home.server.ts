import { z } from 'zod';
import { slugSchema } from './common.server';

export const recentItemSchema = z.object({
  _type: z.string(),
  _updatedAt: z.string(),
  slug: slugSchema,
  displayName: z.string(),
  spellSchool: z.string().nullable(),
  armorWeapon: z.enum(['armor', 'weapon']).nullable(),
  areaType: z.enum(['dungeon', 'town', 'zone']).nullable(),
  bookType: z.enum(['skillbook', 'spellbook']).nullable(),
  type: z.string().nullable()
});

export const recentNewsSchema = z.object({
  title: z.string(),
  slug: slugSchema,
  author: z.string(),
  publishedAt: z.string(),
  summary: z.string(),
  category: z.string()
});

export const homePageDataSchema = z.object({
  recentItems: z.array(recentItemSchema),
  recentNews: z.array(recentNewsSchema)
});