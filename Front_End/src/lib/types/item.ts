import { type Slug } from '$lib';

export type Item = {
  name: string,
  slug: Slug,
  type: 'junk' | 'potion' | 'elixir' | 'bauble' | 'scroll' | 'wand' | 'orb' | 'spellbook' | 'ability book' | 'dungeon',
  description?: string,
  descriptionIdentified?: string,
  weight?: number,
  condition?: number,
  buyPrice?: number,
  sellPrice?: number,
  charges?: number,
  notes?: [],
}
