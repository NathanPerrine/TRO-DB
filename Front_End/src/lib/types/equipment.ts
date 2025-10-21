import type { Area } from '$lib';
import type { Rarity } from './rarity';
import type { Slug } from '$lib';
import type { WeaponType } from '$lib';

export type Equipment = {
  name: string;
  identifiedName: string;
  slug: Slug;
  armorWeapon: 'armor' | 'weapon';
  rarity?: Rarity;
  description?: string;
  identifiedDescription?: string;
  attributes?: string[];
  weight: number;
  condition: number;
  sellPrice: number;
  excludes: 'male' | 'female';
  levelRequirement: number;
  dropArea: Pick<Area, 'name' | 'slug' | 'areaType'>[];
  notes: [];
};

type WeaponAttributes = {
  damage?: {
    min?: number;
    max?: number;
  };
  weaponType?: WeaponType;
};

type ArmorAttributes = {
  armorType: 'helm' | 'cowl' | 'chest' | 'robe' | 'wrists' | 'skirt' | 'legs' | 'feet' | 'shield';
  material?: 'cloth' | 'leather' | 'chain mail' | 'plate mail';
  armorRating?: number;
};

export type Armor = Equipment & {
  armorAttributes: ArmorAttributes;
};

export type Weapon = Equipment & {
  weaponAttributes: WeaponAttributes;
};

// Legacy GroupedEquipment interface - consider migrating to schema-based types
export interface GroupedEquipment {
  [key: string]: unknown[];
}
