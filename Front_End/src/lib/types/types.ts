import { type Slug } from '$lib/types/index';

export type Spell = {
  title: string;
  spellSchool: 'thaumaturgy' | 'mysticism' | 'elementalism' | 'sorcery' | 'necromancy';
  level: 'familiar' | 'proficient' | 'expert' | 'master' | 'grandmaster' | 'supreme-master';
  slug: Slug;
  spellEffect: string;
  mpCost: string;
}

export type FullSpell = Spell & {
  description: string;
  spellDelay: string;
  duration: string;
  chant: string;
  extendable: boolean;
  enchantable: boolean;
  dropOnly: boolean;
  notes?: [],
}

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

export type Description = {
  name: string,
  description: string,
}