import type { PageServerLoad } from './$types';
import type { Armor, Weapon } from '$lib';
import { client } from '$lib/utils/sanity/client';

export const load = (async ({ params }) => {
  const equipment = await client.fetch<
    Armor | Weapon
  >(`*[_type == 'equipment' && slug.current == "${params.item}"][0]{
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
  }`);

  if (equipment.armorWeapon === 'armor') {
    return { equipment: equipment as Armor };
  }
  if (equipment.armorWeapon === 'weapon') {
    return { equipment: equipment as Weapon };
  }
}) satisfies PageServerLoad;
