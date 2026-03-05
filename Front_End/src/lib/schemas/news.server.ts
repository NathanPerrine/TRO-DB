import { z } from 'zod';
import { slugSchema, sanityDocumentSchema } from './common.server';

// PortableText content schema (accepts any array for rich content)
// Sanity returns null for empty arrays, so we transform null to []
const portableTextSchema = z.array(z.any()).nullable().transform(val => val ?? []);

// Subsection schema - nested within sections
export const newsSubsectionSchema = z.object({
  subsectionTitle: z.string(),
  subsectionSlug: slugSchema,
  content: portableTextSchema
});

// Section schema - main content blocks
export const newsSectionSchema = z.object({
  sectionTitle: z.string(),
  sectionSlug: slugSchema,
  content: portableTextSchema,
  subsections: z.array(newsSubsectionSchema).nullable().transform(val => val ?? [])
});

export const newsCategorySchema = z.enum([
  'game update',
  'site update',
  'community',
  'announcement'
]);

// Featured image schema
export const featuredImageSchema = z
  .object({
    asset: z.any(),
    alt: z.string().nullable().optional()
  })
  .nullable()
  .optional();

// Full news detail
export const newsDetailSchema = sanityDocumentSchema.extend({
  title: z.string(),
  slug: slugSchema,
  author: z.string(),
  publishedAt: z.string(),
  summary: z.string(),
  category: newsCategorySchema,
  featuredImage: featuredImageSchema,
  sections: z.array(newsSectionSchema)
});

// List item for news listing pages
export const newsListItemSchema = newsDetailSchema.pick({
  title: true,
  slug: true,
  author: true,
  publishedAt: true,
  summary: true,
  category: true,
  _createdAt: true,
  _updatedAt: true
});

// News [slug] page data schema
export const newsPageDataSchema = newsDetailSchema.pick({
  title: true,
  author: true,
  publishedAt: true,
  summary: true,
  category: true,
  featuredImage: true,
  sections: true,
  _createdAt: true,
  _updatedAt: true
});

export type NewsDetail = z.infer<typeof newsDetailSchema>;
export type NewsListItem = z.infer<typeof newsListItemSchema>;
export type NewsPageData = z.infer<typeof newsPageDataSchema>;
export type NewsSection = z.infer<typeof newsSectionSchema>;
export type NewsSubsection = z.infer<typeof newsSubsectionSchema>;
export type NewsCategory = z.infer<typeof newsCategorySchema>;
