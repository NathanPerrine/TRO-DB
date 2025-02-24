import type { Accessory } from '$lib';
import type { Book } from '$lib';
import type { Armor, Weapon } from './equipment';
// import type { Item } from './item';
import type { Mob } from '$lib';
import type { Slug } from '$lib';

type Direction = {
  town: Pick<Area, 'name' | 'slug'>;
  directions: string;
};

type Drops = {
  books: Pick<Book, 'name' | 'slug' | 'bookType'>[];
  armors: Pick<Armor, 'name' | 'identifiedName' | 'slug' | 'rarity' | 'levelRequirement' | 'armorAttributes' | 'attributes'>[];
  weapons: Pick<Weapon, 'name' | 'identifiedName' | 'slug' | 'rarity' | 'levelRequirement' | 'weaponAttributes' | 'attributes'>[];
  accessories: Pick<Accessory, 'identifiedName' | 'slug' | 'slot' | 'rarity'>[];
};

export type Area = {
  name: string;
  slug: Slug;
  areaType: 'dungeon' | 'town' | 'zone';
  description?: string;
  map?: string;
  directions?: Direction[];
  levelRange?: {
    min?: number;
    max?: number;
  };
  walkthrough?: [];
  notes?: [];
  drops?: Drops;
  mobs?: Pick<Mob, 'name' | 'slug' | 'levelRange' | 'hpRange' | 'boss'>[];
  connectedAreas?: Area[];
};
