import type { Area } from './area';
import type { Rarity } from './rarity';
import type { Slug } from './slug';
import type { WeaponType } from './weaponType';

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

export interface GroupedEquipment {
  [key: string]: PickedArmor[] | PickedWeapon[];
}

type PickedEquipment = Pick<
  Armor,
  'identifiedName' | 'slug' | 'rarity' | 'levelRequirement' | 'armorWeapon' | 'attributes'
>;

export type PickedArmor = PickedEquipment & {
  armorType: string;
  dropArea: Pick<Area, 'name' | 'slug' | 'areaType'>[];
};

export type PickedWeapon = PickedEquipment & {
  weaponType: string;
  dropArea: Pick<Area, 'name' | 'slug' | 'areaType'>[];
};
