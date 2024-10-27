import type { Slug, Spell, Area } from '$lib';

type Range = {
  min?: number;
  max?: number;
};

type SpellSchools = {
  sorcery: number;
  elementalism: number;
  mysticism: number;
  thaumaturgy: number;
  necromancy: number;
};

export type Mob = {
  name: string;
  slug: Slug;
  description?: string;
  levelRange?: Range;
  hpRange?: Range;
  alignment?: 'Good' | 'Evil' | 'Neutral';
  boss?: boolean,
  meleeDefense?: Range;
  meleeAttributes?: {
    mdm?: number;
    evilMDM?: number;
    goodMDM?: number;
    meleePhase?: number;
  };
  spellResistances: SpellSchools;
  spellDamageModifiers: SpellSchools;
  knownSpells?: Pick<Spell, 'title' | 'spellSchool' | 'slug'>[];
  inhabitedAreas?: Pick<Area, 'name' | 'slug' | 'areaType'>[];
  emotes?: string[];
  notes?: [];
};
