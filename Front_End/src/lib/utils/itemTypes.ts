export const ITEM_TYPES = [
  { type: 'junk', slug: 'junk', label: 'Junk' },
  { type: 'potion', slug: 'potions', label: 'Potions' },
  { type: 'elixir', slug: 'elixirs', label: 'Elixirs' },
  { type: 'bauble', slug: 'baubles', label: 'Baubles' },
  { type: 'scroll', slug: 'scrolls', label: 'Scrolls' },
  { type: 'wand', slug: 'wands', label: 'Wands' },
  { type: 'orb', slug: 'orbs', label: 'Orbs' },
  { type: 'dungeon', slug: 'dungeon', label: 'Dungeon' },
  { type: 'dye', slug: 'dyes', label: 'Dyes' },
  { type: 'crafting-material', slug: 'crafting-materials', label: 'Crafting Materials' }
] as const;

export const ITEM_TYPE_VALUES = ITEM_TYPES.map((item) => item.type);

export type ItemTypeEntry = (typeof ITEM_TYPES)[number];
export type ItemType = ItemTypeEntry['type'];

export function getBySlug(slug: string): ItemTypeEntry | undefined {
  return ITEM_TYPES.find((item) => item.slug === slug);
}

export function getByType(type: string): ItemTypeEntry | undefined {
  return ITEM_TYPES.find((item) => item.type === type);
}
