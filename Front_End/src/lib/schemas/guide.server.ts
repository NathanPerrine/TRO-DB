import { z } from 'zod';
import { slugSchema, sanityDocumentSchema } from './common.server';

// Full guide detail (extends Sanity metadata)
export const guideDetailSchema = sanityDocumentSchema.extend({
  title: z.string(),
  slug: slugSchema,
  author: z.string(),
  summary: z.string(),
  category: z.enum(['leveling', 'money making', 'new player', 'crafting', 'other']),
  content: z.array(z.any()) // PortableText
});

// List item
export const guideListItemSchema = guideDetailSchema.pick({
  title: true,
  slug: true,
  author: true,
  summary: true,
  _createdAt: true,
  _updatedAt: true
});

// Guide [slug] page data schema
export const guidePageDataSchema = guideDetailSchema.pick({
  title: true,
  author: true,
  summary: true,
  category: true,
  content: true,
  _createdAt: true,
  _updatedAt: true
})

export type GuideDetail = z.infer<typeof guideDetailSchema>;
export type GuideListItem = z.infer<typeof guideListItemSchema>;
export type GuidePageData = z.infer<typeof guidePageDataSchema>;