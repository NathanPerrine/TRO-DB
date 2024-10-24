import type { PageServerLoad } from './$types';
import type { Accessory, Armor, Weapon } from '$lib';
import { client } from '$lib/utils/sanity/client';

export const load = (async ({ params }) => {
  if (params.slug === 'weapon' || params.slug === 'armor') {
    const equipment = await client.fetch<Armor | Weapon>(
      `
      *[_type == 'equipment' && slug.current == $item][0]{
        name,
        identifiedName,
        slug,
        armorWeapon,
        rarity,
        description,
        identifiedDescription,
        attributes,
        weight,
        condition,
        sellPrice,
        excludes,
        levelRequirement,
        dropArea[]->{name, slug, areaType},
        notes,
        armorWeapon == 'armor' => {armorAttributes},
        armorWeapon == 'weapon' => {
          weaponAttributes{
            damage,
            weaponType->{
              name,
              range,
              attributeScaling,
              skill
            }
          }
        }
      }`,
      { item: params.item }
    );

    if (equipment.armorWeapon === 'armor') {
      return { equipment: equipment as Armor };
    }
    if (equipment.armorWeapon === 'weapon') {
      return { equipment: equipment as Weapon };
    }
  }

  if (params.slug === 'accessories') {
    const equipment = await client.fetch<Accessory>(
      `
      *[_type == 'accessory' && slug.current == $item][0]{
        name,
        identifiedName,
        slug,
        slot,
        rarity,
        description,
        identifiedDescription,
        attributes,
        armor,
        weight,
        condition,
        sellPrice,
        levelRequirement,
        dropArea[]->{name, slug, areaType},
        notes
      }`,
      { item: params.item }
    );

    return { equipment: equipment };
  }
}) satisfies PageServerLoad;
