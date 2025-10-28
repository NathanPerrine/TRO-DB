// Client-safe type exports derived from our Zod schemas
// These types can be imported in .svelte components
// The source of truth remains the .server.ts schema files

export type SkillLevel =
  | 'familiar'
  | 'proficient'
  | 'expert'
  | 'master'
  | 'grandmaster'
  | 'supreme-master';

export type Rarity = 'white' | 'green' | 'blue' | 'purple' | 'orange' | 'red';

export type SpellSchool = 'sorcery' | 'elementalism' | 'mysticism' | 'thaumaturgy' | 'necromancy';

export type AreaType = 'dungeon' | 'town' | 'zone';

// Description type for PageHeader component
export type Description = {
  name: string;
  description: unknown; // PortableText
  extras?: unknown; // PortableText
};
