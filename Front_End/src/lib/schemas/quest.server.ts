import { z } from 'zod';
import { slugSchema, sanityDocumentSchema } from './common.server';
import { linkedAreaSchema, linkedNpcSchema } from './links.server';

// PortableText content schema (accepts any array for rich content)
// Sanity returns null for empty arrays, so we transform null to []
const portableTextSchema = z.array(z.any()).nullable().transform(val => val ?? []);

// ====================
// Quest Sub-Schemas
// ====================

// Starting area can reference either an area or a shop
const questStartingLocationSchema = z.object({
  _type: z.enum(['area', 'shop']),
  name: z.string(),
  slug: slugSchema,
  areaType: z.string().nullish(), // only present on areas
});

// Required items can be item, equipment, accessory, or book
const questRequiredItemSchema = z.object({
  _type: z.enum(['item', 'equipment', 'accessory', 'book']),
  name: z.string(),
  slug: slugSchema,
});

// Requirements object
const questRequirementsSchema = z.object({
  requiredQuests: z.array(z.object({
    title: z.string(),
    slug: slugSchema,
  }).nullable())
    .nullable()
    .transform(val => val?.filter(item => item !== null) ?? []),
  requiredItems: z.array(questRequiredItemSchema.nullable())
    .nullable()
    .transform(val => val?.filter(item => item !== null) ?? []),
  other: z.string().nullish(),
});

// Walkthrough substep (nested within a walkthrough step)
export type WalkthroughSubstep = {
  _type: 'walkthroughSubstep';
  substepTitle: string;
  substepSlug: { current: string };
  content: unknown[];
};

// Walkthrough step (nested content block within the walkthrough)
// Exported as a type only — used to identify/filter steps from the
// mixed walkthrough PortableText array (e.g., for table of contents)
export type WalkthroughStep = {
  _type: 'walkthroughStep';
  stepTitle: string;
  stepSlug: { current: string };
  content: unknown[];
  substeps?: WalkthroughSubstep[];
};

// Related quest reference
const relatedQuestRefSchema = z.object({
  title: z.string(),
  slug: slugSchema,
  summary: z.string().nullish(),
});

// ====================
// Quest Detail Schema
// ====================

export const questDetailSchema = sanityDocumentSchema.extend({
  title: z.string(),
  slug: slugSchema,
  author: z.string(),
  summary: z.string(),
  questGiver: linkedNpcSchema.nullable(),
  startingArea: z.array(questStartingLocationSchema.nullable())
    .nullable()
    .transform(val => val?.filter(item => item !== null) ?? []),
  recommendedLevel: z.number().nullish(),
  requirements: questRequirementsSchema.nullish(),
  introduction: portableTextSchema,
  walkthrough: portableTextSchema, // mix of PortableText blocks and walkthroughStep objects
  rewards: portableTextSchema,
  tipsAndNotes: portableTextSchema,
  relatedAreas: z.array(linkedAreaSchema.nullable())
    .nullable()
    .transform(val => val?.filter(item => item !== null) ?? []),
  relatedQuests: z.array(relatedQuestRefSchema.nullable())
    .nullable()
    .transform(val => val?.filter(item => item !== null) ?? []),
});

// ====================
// Quest List Item Schema
// ====================

export const questListItemSchema = questDetailSchema.pick({
  title: true,
  slug: true,
  author: true,
  summary: true,
  recommendedLevel: true,
  _createdAt: true,
  _updatedAt: true,
});

// ====================
// Type Inference
// ====================

export type QuestDetail = z.infer<typeof questDetailSchema>;
export type QuestListItem = z.infer<typeof questListItemSchema>;
export type QuestRequiredItem = z.infer<typeof questRequiredItemSchema>;
