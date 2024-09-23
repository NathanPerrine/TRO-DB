import type { Slug, Book } from '$lib/index'

export type Spell = {
  title: string;
  spellSchool: 'thaumaturgy' | 'mysticism' | 'elementalism' | 'sorcery' | 'necromancy';
  level: 'familiar' | 'proficient' | 'expert' | 'master' | 'grandmaster' | 'supreme-master';
  slug: Slug;
  spellEffect: string;
  mpCost: string;
  dropOnly: boolean;
}

export type FullSpell = Spell & {
  description: string;
  spellDelay: string;
  duration: string;
  chant: string;
  extendable: boolean;
  enchantable: boolean;
  notes?: [],
  spellbook?: Book,
}