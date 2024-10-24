import type { PageServerLoad } from './$types';
import type {
  Description,
  Weapon,
  WeaponType,
  PickedArmor,
  GroupedEquipment,
  PickedWeapon
} from '$lib';
import { client } from '$lib/utils/sanity/client';

export const load = (async ({ params }) => {
  const description =
    await client.fetch<Description>(`*[_type == 'description' && name match '${params.slug}'][0] {
    name,
    description,
    extras
  }`);

  if (params.slug == 'armor') {
    const armor = await client.fetch<PickedArmor[]>(`
      *[_type == 'equipment' && armorWeapon == 'armor']{
        identifiedName,
        slug,
        armorWeapon,
        rarity,
        attributes,
        levelRequirement,
        'armorType': armorAttributes.armorType,
        dropArea[]->{name, slug, areaType},
      }`);

    const groupedByArmorType = armor.reduce<GroupedEquipment>((acc, item: PickedArmor) => {
      if (!acc[item.armorType]) {
        acc[item.armorType] = [];
      }
      (acc[item.armorType] as PickedArmor[]).push(item);
      return acc;
    }, {});

    return {
      description: description,
      equipment: groupedByArmorType
    };
  }

  if (params.slug == 'weapons') {
    const weapons = await client.fetch<PickedWeapon[]>(`
      *[_type == 'equipment' && armorWeapon == 'weapon']{
        identifiedName,
        slug,
        armorWeapon,
        rarity,
        attributes,
        levelRequirement,
        'weaponType': weaponAttributes.weaponType->name,
        dropArea[]->{name, slug, areaType},
      }`);

    const groupedByWeaponType = weapons.reduce<GroupedEquipment>((acc, item: PickedWeapon) => {
      if (!acc[item.weaponType]) {
        acc[item.weaponType] = [];
      }
      (acc[item.weaponType] as PickedWeapon[]).push(item);
      return acc;
    }, {});

    return {
      description: description,
      equipment: groupedByWeaponType
    };
  }
}) satisfies PageServerLoad;
