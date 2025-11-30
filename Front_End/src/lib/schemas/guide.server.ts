import { z } from 'zod';
import { slugSchema, sanityDocumentSchema } from './common.server';

// PortableText content schema (accepts any array for rich content)
// Sanity returns null for empty arrays, so we transform null to []
const portableTextSchema = z.array(z.any()).nullable().transform(val => val ?? []);

// Subsection schema - nested within sections
export const subsectionSchema = z.object({
  subsectionTitle: z.string(),
  subsectionSlug: slugSchema,
  content: portableTextSchema
});

// Section schema - main chapter-level content blocks
export const sectionSchema = z.object({
  sectionTitle: z.string(),
  sectionSlug: slugSchema,
  content: portableTextSchema,
  subsections: z.array(subsectionSchema).nullable().transform(val => val ?? [])
});

// Related guide reference (only contains basic info for linking)
export const relatedGuideRefSchema = z.object({
  _id: z.string(),
  title: z.string(),
  slug: slugSchema,
  summary: z.string()
});

// Full guide detail (extends Sanity metadata)
export const guideDetailSchema = sanityDocumentSchema.extend({
  title: z.string(),
  slug: slugSchema,
  author: z.string(),
  summary: z.string(),
  category: z.enum(['leveling', 'money making', 'new player', 'enchanting and crafting', 'other']),
  sections: z.array(sectionSchema),
  relatedGuides: z.array(relatedGuideRefSchema.nullable())
    .nullable()
    .transform(val => val?.filter(item => item !== null) ?? [])
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
  sections: true,
  relatedGuides: true,
  _createdAt: true,
  _updatedAt: true
})

export type GuideDetail = z.infer<typeof guideDetailSchema>;
export type GuideListItem = z.infer<typeof guideListItemSchema>;
export type GuidePageData = z.infer<typeof guidePageDataSchema>;
export type Section = z.infer<typeof sectionSchema>;
export type Subsection = z.infer<typeof subsectionSchema>;
export type RelatedGuideRef = z.infer<typeof relatedGuideRefSchema>;