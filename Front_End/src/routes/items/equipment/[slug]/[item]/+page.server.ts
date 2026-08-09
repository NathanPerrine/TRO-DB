import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { client } from '$lib/utils/sanity/client';
import { equipmentSchema, accessoryDetailSchema } from '$lib/schemas/equipment.server';

export const load = (async ({ params }) => {
  if (params.slug === 'weapons' || params.slug === 'armor') {
    const rawData = await client.fetch(
      `*[_type == 'equipment' && slug.current == $item][0]{
        name,
        identifiedName,
        slug,
        image,
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

    if (!rawData) {
      throw error(404, 'Equipment not found');
    }

    // Zod automatically validates and narrows the type
    const equipment = equipmentSchema.parse(rawData);
    const seo = {
      title: equipment.identifiedName || equipment.name,
      description:
        equipment.identifiedDescription ||
        equipment.description ||
        `${equipment.identifiedName || equipment.name} - ${equipment.armorWeapon} in The Realm Online. View stats, requirements, and drop locations.`
    };
    return { equipment, seo };
  }

  if (params.slug === 'accessories') {
    const rawData = await client.fetch(
      `*[_type == 'accessory' && slug.current == $item][0]{
        name,
        identifiedName,
        slug,
        image,
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

    if (!rawData) {
      throw error(404, 'Accessory not found');
    }

    const equipment = accessoryDetailSchema.parse(rawData);
    const seo = {
      title: equipment.identifiedName || equipment.name,
      description:
        equipment.identifiedDescription ||
        equipment.description ||
        `${equipment.identifiedName || equipment.name} - accessory in The Realm Online. View stats, requirements, and drop locations.`
    };
    return { equipment, seo };
  }

  throw error(404, 'Invalid equipment type');
}) satisfies PageServerLoad;
