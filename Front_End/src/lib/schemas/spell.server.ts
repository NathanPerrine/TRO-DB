import { z } from 'zod';
import { skillLevelSchema, slugSchema, spellSchoolSchema } from './common.server';
import { bookLinkSchema } from './links.server';

export const spellDetailSchema = z.object({
  title: z.string(),
  spellSchool: spellSchoolSchema.nullish(),
  level: skillLevelSchema.nullish(),
  slug: slugSchema,
  spellEffect: z.string().nullish(),
  mpCost: z.number().nullish(),
  dropOnly: z.boolean().nullish(),
  description: z.string().nullish(),
  spellDelay: z.string().nullish(),
  duration: z.string().nullish(),
  chant: z.string().nullish(),
  extendable: z.boolean().nullish(),
  enchantable: z.boolean().nullish(),
  notes: z.array(z.any()).nullable().transform(val => val ?? []), // PortableText
  spellbook: bookLinkSchema.nullish(),
});

// Schema for spell list items
export const spellListItemSchema = spellDetailSchema.pick({
  title: true,
  spellSchool: true,
  level: true,
  slug: true,
  spellEffect: true,
  mpCost: true,
  dropOnly: true
});

export type SpellDetail = z.infer<typeof spellDetailSchema>;