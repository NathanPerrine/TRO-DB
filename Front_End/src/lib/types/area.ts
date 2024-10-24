import type { Accessory } from './accessory';
import type { Book } from './book';
import type { Equipment } from './equipment';
import type { Item } from './item';
import type { Mob } from './mob';
import type { Slug } from './slug';

type Direction = {
  town: Pick<Area, 'name' | 'slug'>;
  directions: string;
};

type NotableDrop = {
  books: Pick<Book, 'name' | 'slug' | 'bookType'>[];
  equipment: Pick<Equipment, 'identifiedName' | 'slug' | 'rarity' | 'armorWeapon'>[];
  accessories: Pick<Accessory, 'identifiedName' | 'slug' | 'slot' | 'rarity'>[];
};

export type Area = {
  name: string;
  slug: Slug;
  areaType: 'dungeon' | 'town' | 'zone';
  description?: string;
  map?: string;
  directions?: Direction[];
  walkthrough?: [];
  notes?: [];
  notableDrops?: NotableDrop;
  mobs?: Pick<Mob, 'name' | 'slug' | 'levelRange' | 'hpRange' | 'boss'>[];
  connectedAreas?: Area[];
};
