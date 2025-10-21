import { z } from 'zod';
import { slugSchema, raritySchema, dropAreaItemSchema } from './common';

// ====================
// Equipment List Item Schemas
// ====================
// These define the exact shape of data returned from Sanity queries
//
// Note: Sanity returns `null` for missing/empty fields, not `undefined`
// - Use `.nullish()` for optional fields that might be missing (handles both null and undefined)
// - Use `.nullable().transform(val => val ?? [])` for arrays that should default to empty

// Base fields shared by all equipment list items
const baseEquipmentListSchema = z.object({
  identifiedName: z.string(),
  slug: slugSchema,
  rarity: raritySchema.nullish(), // Can be null in Sanity when not set
  attributes: z.array(z.string()).optional().nullable().transform(val => val ?? []),
  levelRequirement: z.number().nullish(), // Can be null in Sanity when not set
  armorWeapon: z.enum(['armor', 'weapon']),
  dropArea: z.array(dropAreaItemSchema).nullable().transform(val => val ?? [])
});

// Armor-specific list item
export const armorListItemSchema = baseEquipmentListSchema.extend({
  armorWeapon: z.literal('armor'),
  armorType: z.enum(['helm', 'cowl', 'chest', 'robe', 'wrists', 'skirt', 'legs', 'feet', 'shield']).nullish() // Handle legacy items
});

// Weapon-specific list item
export const weaponListItemSchema = baseEquipmentListSchema.extend({
  armorWeapon: z.literal('weapon'),
  weaponType: z.string().nullish() // Optional in WeaponAttributes type, comes from Sanity as weaponType->name
});

// Accessory-specific list item
export const accessoryListItemSchema = z.object({
  identifiedName: z.string(),
  slug: slugSchema,
  rarity: raritySchema.nullish(), // Can be null in Sanity when not set
  attributes: z.array(z.string()).optional().nullable().transform(val => val ?? []),
  levelRequirement: z.number().nullish(), // Can be null in Sanity when not set
  slot: z.enum(['amulet', 'belt', 'baldric', 'backpack', 'ring']),
  dropArea: z.array(dropAreaItemSchema).nullable().transform(val => val ?? [])
});

// ====================
// Grouped Equipment Schema
// ====================
// This validates the entire equipment object returned from the load function

// For armor page - groups by armor type
export const groupedArmorSchema = z.object({
  helm: z.array(armorListItemSchema),
  cowl: z.array(armorListItemSchema),
  chest: z.array(armorListItemSchema),
  robe: z.array(armorListItemSchema),
  wrists: z.array(armorListItemSchema),
  skirt: z.array(armorListItemSchema),
  legs: z.array(armorListItemSchema),
  feet: z.array(armorListItemSchema),
  shield: z.array(armorListItemSchema)
});

// For weapons page - groups by weapon type
export const groupedWeaponsSchema = z.object({
  axe: z.array(weaponListItemSchema),
  club: z.array(weaponListItemSchema),
  mace: z.array(weaponListItemSchema),
  maul: z.array(weaponListItemSchema),
  'two handed sword': z.array(weaponListItemSchema),
  dagger: z.array(weaponListItemSchema),
  'throwing dagger': z.array(weaponListItemSchema),
  fist: z.array(weaponListItemSchema),
  'long sword': z.array(weaponListItemSchema),
  'short sword': z.array(weaponListItemSchema)
});

// For accessories page - groups by slot
export const groupedAccessoriesSchema = z.object({
  amulet: z.array(accessoryListItemSchema),
  belt: z.array(accessoryListItemSchema),
  baldric: z.array(accessoryListItemSchema),
  backpack: z.array(accessoryListItemSchema),
  ring: z.array(accessoryListItemSchema)
});

// ====================
// Type Inference
// ====================
// Generate TypeScript types from the schemas - this is the magic!

export type ArmorListItem = z.infer<typeof armorListItemSchema>;
export type WeaponListItem = z.infer<typeof weaponListItemSchema>;
export type AccessoryListItem = z.infer<typeof accessoryListItemSchema>;

export type GroupedArmor = z.infer<typeof groupedArmorSchema>;
export type GroupedWeapons = z.infer<typeof groupedWeaponsSchema>;
export type GroupedAccessories = z.infer<typeof groupedAccessoriesSchema>;
