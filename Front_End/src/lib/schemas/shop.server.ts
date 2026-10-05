import { z } from 'zod';
import { directionsSchema, slugSchema, raritySchema } from './common.server';
import { linkedAreaSchema, linkedNpcSchema } from './links.server';
import { ITEM_TYPE_VALUES } from '$lib/utils/itemTypes';

// ====================
// Shop Inventory Item Schemas
// ====================
// These represent dereferenced items within a shop's inventory.
// Each reference can be an item, equipment, or accessory — we use a
// discriminated union on _type so the GROQ query must include _type.

const shopItemSchema = z.object({
  _type: z.literal('item'),
  name: z.string(),
  type: z.enum(ITEM_TYPE_VALUES).nullish(),
  slug: slugSchema,
  description: z.string().nullish(),
  descriptionIdentified: z.string().nullish(),
  weight: z.number().nullish(),
  condition: z.number().nullish(),
  buyPrice: z.number().nullish(),
  sellPrice: z.number().nullish(),
  charges: z.number().nullish()
});

const shopBookSchema = z.object({
  _type: z.literal('book'),
  name: z.string(),
  slug: slugSchema,
  bookType: z.enum(['skillbook', 'spellbook']),
  skill: z.string(),
  skillLevel: z.string(),
  linkedSpell: z
    .object({
      title: z.string(),
      slug: slugSchema,
      spellSchool: z.string().nullish()
    })
    .nullish(),
  buildPoints: z.number().nullish(),
  buyPrice: z.number().nullish(),
  sellPrice: z.number().nullish()
});

const shopEquipmentSchema = z.object({
  _type: z.enum(['equipment']),
  name: z.string(),
  slug: slugSchema,
  description: z.string().nullish(),
  identifiedDescription: z.string().nullish(),
  identifiedName: z.string(),
  rarity: raritySchema.nullish(),
  armorWeapon: z.enum(['armor', 'weapon']),
  attributes: z
    .array(z.string())
    .nullable()
    .transform((val) => val ?? []),
  weight: z.number().nullish(),
  condition: z.number().nullish(),
  buyPrice: z.number().nullish(),
  sellPrice: z.number().nullish(),
  levelRequirement: z.number().nullish(),
  excludes: z.enum(['Males', 'Females']).nullish(),
  armorAttributes: z
    .object({
      armorType: z.string().nullish(),
      material: z.string().nullish(),
      armorRating: z.number().nullish()
    })
    .nullish(),
  weaponAttributes: z
    .object({
      damage: z.object({ min: z.number(), max: z.number() }).nullish(),
      weaponType: z
        .object({
          name: z.string(),
          range: z.number().nullish(),
          skill: z.string().nullish(),
          attributeScaling: z
            .array(
              z.object({
                attribute: z.string(),
                scalingType: z.string()
              })
            )
            .nullish()
        })
        .nullish()
    })
    .nullish(),
  dropArea: z
    .array(linkedAreaSchema.nullable())
    .nullable()
    .transform((val) => val?.filter((item) => item !== null) ?? [])
});

const shopAccessorySchema = z.object({
  _type: z.literal('accessory'),
  name: z.string(),
  identifiedName: z.string(),
  slug: slugSchema,
  rarity: raritySchema.nullish(),
  slot: z.enum(['amulet', 'belt', 'baldric', 'backpack', 'ring']),
  description: z.string().nullish(),
  identifiedDescription: z.string().nullish(),
  attributes: z
    .array(z.string())
    .nullable()
    .transform((val) => val ?? []),
  weight: z.number().nullish(),
  condition: z.number().nullish(),
  buyPrice: z.number().nullish(),
  sellPrice: z.number().nullish(),
  levelRequirement: z.number().nullish(),
  dropArea: z
    .array(linkedAreaSchema.nullable())
    .nullable()
    .transform((val) => val?.filter((item) => item !== null) ?? [])
});

export const shopInventoryItemSchema = z.discriminatedUnion('_type', [
  shopBookSchema,
  shopItemSchema,
  shopEquipmentSchema,
  shopAccessorySchema
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
    'skillsCrafter',
    'skillsThief',
    'skillsWarrior',
    'skillsWizard',
    'spellsSorc',
    'spellsEle',
    'spellsMyst',
    'spellsThaum',
    'spellsNecro'
  ]),
  items: z
    .array(shopInventoryItemSchema)
    .nullable()
    .transform((val) => val ?? [])
});

const inventoryType = z.array(
  z.enum([
    'general',
    'clothing',
    'armorWeapons',
    'magicItems',
    'magicSpellBooks',
    'trainerCrafting',
    'trainerThief',
    'trainerWarrior',
    'trainerWizard'
  ])
);

// ====================
// Shop Detail Schema
// ====================

export const shopDetailSchema = z.object({
  name: z.string(),
  slug: slugSchema,
  directions: directionsSchema,
  locations: z
    .array(linkedAreaSchema)
    .nullable()
    .transform((val) => val ?? []),
  description: z.string().nullish(),
  inventoryType: inventoryType.nullable().transform((val) => val ?? []),
  inventory: z
    .array(shopCategorySchema)
    .nullable()
    .transform((val) => val ?? []),
  npc: linkedNpcSchema.nullish()
});

export const shopListItemSchema = shopDetailSchema.pick({
  name: true,
  slug: true,
  directions: true,
  locations: true,
  inventoryType: true
});

// ====================
// Type Inference
// ====================

export type ShopDetail = z.infer<typeof shopDetailSchema>;
export type ShopListItem = z.infer<typeof shopListItemSchema>;
export type ShopInventoryItem = z.infer<typeof shopInventoryItemSchema>;
export type ShopCategory = z.infer<typeof shopCategorySchema>;
