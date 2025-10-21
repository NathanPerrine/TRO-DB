import { z } from 'zod';

// ====================
// Base Schemas
// ====================
// These are reusable building blocks for common fields

export const slugSchema = z.object({
  current: z.string()
});

export const raritySchema = z.enum(['white', 'green', 'blue', 'purple', 'orange', 'red']);

export const areaTypeSchema = z.enum(['dungeon', 'town', 'zone']);

// Schema for the nested dropArea data
export const dropAreaItemSchema = z.object({
  name: z.string(),
  slug: slugSchema,
  areaType: areaTypeSchema
});

// export const spellDamageModiferSchema =

// Schema for the full page data response
export const descriptionSchema = z.object({
  name: z.string(),
  description: z.any(), // PortableText - can be refined later
  extras: z.any().optional() // PortableText - can be refined later
});