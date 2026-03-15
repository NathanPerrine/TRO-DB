import { z } from 'zod';
import { directionsSchema, slugSchema, raritySchema } from './common.server';

// ====================
// Shop Inventory Item Schemas
// ====================
// These represent dereferenced items within a shop's inventory.
// Each reference can be an item, equipment, or accessory — we use a
// discriminated union on _type so the GROQ query must include _type.

const shopItemSchema = z.object({
  _type: z.literal('item'),
  name: z.string(),
  slug: slugSchema,
  buyPrice: z.number().nullish(),
});

const shopEquipmentSchema = z.object({
  _type: z.enum(['equipment']),
  name: z.string(),
  identifiedName: z.string(),
  slug: slugSchema,
  rarity: raritySchema.nullish(),
  armorWeapon: z.enum(['armor', 'weapon']),
  buyPrice: z.number().nullish(),
});

const shopAccessorySchema = z.object({
  _type: z.literal('accessory'),
  name: z.string(),
  identifiedName: z.string(),
  slug: slugSchema,
  rarity: raritySchema.nullish(),
  slot: z.enum(['amulet', 'belt', 'baldric', 'backpack', 'ring']),
  buyPrice: z.number().nullish(),
});

export const shopInventoryItemSchema = z.discriminatedUnion('_type', [
  shopItemSchema,
  shopEquipmentSchema,
  shopAccessorySchema,
]);

// ====================
// Shop Category Schema
// ====================

const shopCategorySchema = z.object({
  category: z.enum([
    'accessories',
    'armor',
    'dyes',
    'potions',
    'elixirs',
    'scrolls',
    'wands',
    'orbs',
    'weapons',
    'misc',
  ]),
  items: z.array(shopInventoryItemSchema).nullable().transform(val => val ?? []),
});

// ====================
// Shop Detail Schema
// ====================

export const shopDetailSchema = z.object({
  name: z.string(),
  slug: slugSchema,
  directions: directionsSchema,
  description: z.string().nullish(),
  inventory: z.array(shopCategorySchema).nullable().transform(val => val ?? []),
});

export const shopListItemSchema = shopDetailSchema.pick({
  name: true,
  slug: true,
  directions: true,
});

// ====================
// Type Inference
// ====================

export type ShopDetail = z.infer<typeof shopDetailSchema>;
export type ShopListItem = z.infer<typeof shopListItemSchema>;
export type ShopInventoryItem = z.infer<typeof shopInventoryItemSchema>;
export type ShopCategory = z.infer<typeof shopCategorySchema>;
