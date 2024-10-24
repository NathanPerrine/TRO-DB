import type { Area } from './area';
import type { Rarity } from './rarity';
import type { Slug } from './slug';

export type Accessory = {
  name: string;
  identifiedName: string;
  slug: Slug;
  slot: 'amulet' | 'belt' | 'ring';
  rarity?: Rarity;
  description?: string;
  identifiedDescription?: string;
  attributes?: string[];
  armor?: number;
  weight?: number;
  condition?: number;
  sellPrice?: number;
  levelRequirement?: number;
  dropArea: Area[];
  notes: [];
};
