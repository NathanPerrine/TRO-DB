import { z } from 'zod';
import { slugSchema, raritySchema, rangeSchema } from './common.server';
import { linkedAreaSchema } from './links.server';

// ====================
// Weapon Types
// ====================
// Weapon Types Schema
const AttributeScalingSchema = z.object({
  attribute: z.enum(['strength', 'dexterity', 'intelligence', 'endurance']),
  scalingType: z.enum(['major', 'minor'])
});

export const weaponTypeSchema = z.object({
  name: z.enum(['axe', 'club', 'mace', 'maul', 'two handed sword', 'dagger', 'throwing dagger', 'fist', 'long sword', 'short sword']),
  range: z.number().nullish(), // Optional - not always fetched in list views
  attributeScaling: z.array(AttributeScalingSchema).nullish(), // Optional - not always fetched in list views
  skill: z.enum(['light piercing', 'light one-handed', 'light two-handed', 'heavy two-handed']).nullish() // Optional - not always fetched in list views
});

// ====================
// Equipment Detail Schemas (Full Data)
// ====================
// Start with complete schemas, then derive list items using .pick()

// Base equipment fields (common to all equipment)
const baseEquipmentDetailSchema = z.object({
  name: z.string(),
  identifiedName: z.string(),
  slug: slugSchema,
  armorWeapon: z.enum(['armor', 'weapon']),
  rarity: raritySchema.nullish(),
  description: z.string().nullish(),
  identifiedDescription: z.string().nullish(),
  attributes: z.array(z.string()).nullable().transform(val => val ?? []),
  weight: z.number().nullish(),
  condition: z.number().nullish(),
  sellPrice: z.number().nullish(),
  excludes: z.enum(['Males', 'Females']).nullish(),
  levelRequirement: z.number().nullish(),
  dropArea: z.array(linkedAreaSchema.nullable())
    .nullable()
    .transform(val => val?.filter(item => item !== null) ?? []),
  notes: z.any().nullable() // PortableText
});

// Armor attributes nested object
const armorAttributesSchema = z.object({
  armorType: z.enum(['helm', 'cowl', 'chest', 'robe', 'wrists', 'skirt', 'legs', 'feet', 'shield']).nullish(),
  material: z.enum(['cloth', 'leather', 'chain mail', 'plate mail']).nullish(),
  armorRating: z.number().nullish()
});

// Weapon attributes nested object
const weaponAttributesSchema = z.object({
  damage: rangeSchema.nullish(),
  weaponType: weaponTypeSchema.nullish()
});

// Full armor detail schema (for /equipment/armor/iron-helm)
export const armorDetailSchema = baseEquipmentDetailSchema.extend({
  armorWeapon: z.literal('armor'),
  armorAttributes: armorAttributesSchema.nullish()
});

// Full weapon detail schema (for /equipment/weapon/iron-sword)
export const weaponDetailSchema = baseEquipmentDetailSchema.extend({
  armorWeapon: z.literal('weapon'),
  weaponAttributes: weaponAttributesSchema.nullish()
});

// Full accessory detail schema (for /equipment/accessory/skull-ring)
export const accessoryDetailSchema = z.object({
  name: z.string(),
  identifiedName: z.string(),
  slug: slugSchema,
  slot: z.enum(['amulet', 'belt', 'baldric', 'backpack', 'ring']),
  rarity: raritySchema.nullish(),
  description: z.string().nullish(),
  identifiedDescription: z.string().nullish(),
  attributes: z.array(z.string()).nullable().transform(val => val ?? []),
  armor: z.number().nullish(),
  weight: z.number().nullish(),
  condition: z.number().nullish(),
  sellPrice: z.number().nullish(),
  levelRequirement: z.number().nullish(),
  dropArea: z.array(linkedAreaSchema.nullable())
    .nullable()
    .transform(val => val?.filter(item => item !== null) ?? []),
  notes: z.any().nullable()
});

// ====================
// List Item Schemas (Derived from Detail)
// ====================
// Use .pick() to get only the fields needed for list views

export const armorListItemSchema = armorDetailSchema.pick({
  identifiedName: true,
  slug: true,
  rarity: true,
  attributes: true,
  levelRequirement: true,
  armorWeapon: true,
  dropArea: true,
  armorAttributes: true // Includes full armorAttributes for table display
});

export const weaponListItemSchema = weaponDetailSchema.pick({
  identifiedName: true,
  slug: true,
  rarity: true,
  attributes: true,
  levelRequirement: true,
  armorWeapon: true,
  dropArea: true,
  weaponAttributes: true // Includes full weaponAttributes
});

export const accessoryListItemSchema = accessoryDetailSchema.pick({
  identifiedName: true,
  slug: true,
  rarity: true,
  attributes: true,
  levelRequirement: true,
  slot: true,
  dropArea: true
});

// ====================
// Grouped Schemas (for List Pages)
// ====================

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

// Detail types (full data)
export type ArmorDetail = z.infer<typeof armorDetailSchema>;
export type WeaponDetail = z.infer<typeof weaponDetailSchema>;
export type AccessoryDetail = z.infer<typeof accessoryDetailSchema>;

// List item types (subset of data)
export type ArmorListItem = z.infer<typeof armorListItemSchema>;
export type WeaponListItem = z.infer<typeof weaponListItemSchema>;
export type AccessoryListItem = z.infer<typeof accessoryListItemSchema>;

// Grouped types
export type GroupedArmor = z.infer<typeof groupedArmorSchema>;
export type GroupedWeapons = z.infer<typeof groupedWeaponsSchema>;
export type GroupedAccessories = z.infer<typeof groupedAccessoriesSchema>;

// Export nested attribute types for reuse
export type ArmorAttributes = z.infer<typeof armorAttributesSchema>;
export type WeaponAttributes = z.infer<typeof weaponAttributesSchema>;