import type { Area } from '$lib';
import type { Rarity } from './rarity';
import type { Slug } from '$lib';

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
