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

// Shop Link
export const linkedShopSchema = z.object({
  name: z.string(),
  slug: slugSchema,
});

// NPC Link
export const linkedNpcSchema = z.object({
  name: z.string(),
  slug: slugSchema,
  npcType: z.enum(['shopkeeper', 'gatekeeper']).nullish(),

});

// Known spell link - used when referencing spells from mobs
export const knownSpellSchema = z.object({
  title: z.string(),
  slug: slugSchema,
  spellSchool: spellSchoolSchema.nullish(),
});

// Equipment Link
export const linkedEquipmentSchema = z.object({
  identifiedName: z.string(),
  slug: slugSchema,
  armorWeapon: z.enum(['armor', 'weapon']),
})

// Accessory Link
export const linkedAccessorySchema = z.object({
  identifiedName: z.string(),
  slug: slugSchema,
})

// Item link
export const linkedItemSchema = z.object({
  name: z.string(),
  slug: slugSchema,
});


export type BookLink = z.infer<typeof bookLinkSchema>;
export type LinkedSpell = z.infer<typeof linkedSpellSchema>;
export type LinkedArea = z.infer<typeof linkedAreaSchema>;
export type LinkedShop = z.infer<typeof linkedShopSchema>;
export type KnownSpell = z.infer<typeof knownSpellSchema>;
export type LinkedNpc = z.infer<typeof linkedNpcSchema>;
export type LinkedEquipment = z.infer<typeof linkedEquipmentSchema>;
export type LinkedAccessory = z.infer<typeof linkedAccessorySchema>;
export type LinkedItem = z.infer<typeof linkedItemSchema>;
