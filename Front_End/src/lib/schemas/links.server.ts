import { z } from 'zod';
import { slugSchema, spellSchoolSchema, areaTypeSchema } from './common.server';

// Book link - used when referencing books from spells
export const bookLinkSchema = z.object({
  name: z.string().nullish(),
  slug: slugSchema,
  bookType: z.enum(['skillbook', 'spellbook']),
});

// Spell link - used when referencing spells from books
export const linkedSpellSchema = z.object({
  title: z.string(),
  slug: slugSchema,
  dropOnly: z.boolean().nullish(),
  spellSchool: spellSchoolSchema.nullish(),
});

// Area link - used when referencing areas from equipment, mobs, and other areas
export const linkedAreaSchema = z.object({
  name: z.string(),
  slug: slugSchema,
  areaType: areaTypeSchema.nullish()
});

// Known spell link - used when referencing spells from mobs
export const knownSpellSchema = z.object({
  title: z.string(),
  slug: slugSchema,
  spellSchool: spellSchoolSchema.nullish(),
});

export type BookLink = z.infer<typeof bookLinkSchema>;
export type LinkedSpell = z.infer<typeof linkedSpellSchema>;
export type LinkedArea = z.infer<typeof linkedAreaSchema>;
export type KnownSpell = z.infer<typeof knownSpellSchema>;
