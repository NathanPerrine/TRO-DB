import { type Slug } from '$lib/types/index';

export interface Spell {
  title: string;
  spellSchool: 'thaumaturgy' | 'mysticism' | 'elementalism' | 'sorcery' | 'necromancy';
  level: 'familiar' | 'proficient' | 'expert' | 'master' | 'grandmaster' | 'supreme-master';
  slug: Slug;
  spellEffect: string;
  mpCost: string;
}

