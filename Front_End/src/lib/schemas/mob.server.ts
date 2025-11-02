import { z } from 'zod';
import { rangeSchema, slugSchema, spellSchoolValueSchema } from './common.server';
import { linkedAreaSchema, knownSpellSchema } from './links.server';

const meleeAttributesSchema = z.object({
  mdm: z.number().nullish(),
  evilMDM: z.number().nullish(),
  goodMDM: z.number().nullish(),
  meleePhase: z.number().nullish()
});

export const mobDetailSchema = z.object({
  name: z.string(),
  slug: slugSchema,
  description: z.string().nullish(),
  levelRange: rangeSchema.nullish(),
  hpRange: rangeSchema.nullish(),
  alignment: z.enum(['Good', 'Evil', 'Neutral']).nullish(),
  boss: z.boolean().nullish(),
  meleeDefense: rangeSchema.nullish(),
  meleeAttributes: meleeAttributesSchema.nullish(),
  spellResistances: spellSchoolValueSchema,
  spellDamageModifiers: spellSchoolValueSchema,
  knownSpells: z.array(knownSpellSchema.nullable())
    .nullable()
    .transform(val => val?.filter(item => item !== null) ?? []),
  inhabitedAreas: z.array(linkedAreaSchema.nullable())
    .nullable()
    .transform(val => val?.filter(item => item !== null) ?? []),
  emotes: z.array(z.string()).nullish(),
  notes: z.array(z.any()).nullish() // PortableText
})

export const mobListItemSchema = mobDetailSchema.pick({
  name: true,
  slug: true,
  boss: true,
  levelRange: true,
  hpRange: true
});

export const mobAreaListItemSchema = mobListItemSchema.extend({
  inhabitedAreas: mobDetailSchema.shape.inhabitedAreas
})

export type MobListItem = z.infer<typeof mobListItemSchema>;
export type MobAreaListItem = z.infer<typeof mobAreaListItemSchema>;
export type MobDetail = z.infer<typeof mobDetailSchema>;
