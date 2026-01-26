import { z } from 'zod';
import { skillLevelSchema, slugSchema } from './common.server';
import { linkedAreaSchema, linkedSpellSchema } from './links.server';

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
  buildPoints: z.number().nullish(),
  dropArea: z
    .array(linkedAreaSchema.nullable())
    .nullish()
    .transform((val) => val?.filter((item) => item !== null) ?? [])
});

export type Book = z.infer<typeof bookSchema>;