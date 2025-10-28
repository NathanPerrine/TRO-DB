import { z } from 'zod';
import { skillLevelSchema, slugSchema } from './common.server';
import { linkedSpellSchema } from './links.server';

export const bookSchema = z.object({
  name: z.string(),
  slug: slugSchema,
  bookType: z.enum(['skillbook', 'spellbook']),
  skill: z.string(),
  skillLevel: skillLevelSchema,
  description: z.string().nullish(),
  weight: z.number().nullish(),
  condition: z.number().nullish(),
  buyPrice: z.number().nullish(),
  sellPrice: z.number().nullish(),
  linkedSpell: linkedSpellSchema.nullish(),
  buildPoints: z.number().nullish()
});

export type Book = z.infer<typeof bookSchema>;