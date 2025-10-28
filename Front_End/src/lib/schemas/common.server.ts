import { z } from 'zod';

// ====================
// Base Schemas
// ====================
// These are reusable building blocks for common fields

export const slugSchema = z.object({
  current: z.string()
});

export const raritySchema = z.enum(['white', 'green', 'blue', 'purple', 'orange', 'red']);

export const areaTypeSchema = z.enum(['dungeon', 'town', 'zone']);

export const rangeSchema = z.object({
  min: z.number().nullish(),
  max: z.number().nullish()
})

// List of spell schools
export const spellSchoolSchema = z.enum(['sorcery', 'elementalism', 'mysticism', 'thaumaturgy', 'necromancy']);

// List of spell schools with numeric values
export const spellSchoolValueSchema = z.object({
  thaumaturgy: z.number(),
  sorcery: z.number(),
  elementalism: z.number(),
  mysticism: z.number(),
  necromancy: z.number()
});

// Skill Level Schema
export const skillLevelSchema = z.enum([
  'familiar',
  'proficient',
  'expert',
  'master',
  'grandmaster',
  'supreme-master'
]);

export type SkillLevel = z.infer<typeof skillLevelSchema>;
export const skillLevels = skillLevelSchema.options;

// Schema for the full page data response
export const descriptionSchema = z.object({
  name: z.string(),
  description: z.any(), // PortableText - can be refined later
  extras: z.any().optional() // PortableText - can be refined later
});

// Sanity document metadata (fields Sanity adds to all documents)
export const sanityDocumentSchema = z.object({
  _id: z.string(),
  _rev: z.string(),
  _type: z.string(),
  _createdAt: z.string(),
  _updatedAt: z.string()
});