import type { PageServerLoad } from './$types';
import { client } from '$lib/utils/sanity/client';
import { error } from '@sveltejs/kit';
import {
  groupedArmorSchema,
  groupedWeaponsSchema,
  groupedAccessoriesSchema
} from '$lib/schemas/equipment';
import { descriptionSchema } from '$lib/schemas/common';
import { z } from 'zod';



const armorPageDataSchema = z.object({
  description: descriptionSchema,
  equipment: groupedArmorSchema
});

const weaponsPageDataSchema = z.object({
  description: descriptionSchema,
  equipment: groupedWeaponsSchema
});

const accessoriesPageDataSchema = z.object({
  description: descriptionSchema,
  equipment: groupedAccessoriesSchema
});

const VALID_SLUGS = ['weapons', 'armor', 'accessories'] as const;
type ValidSlug = (typeof VALID_SLUGS)[number];

const baseProjection = `{
  identifiedName,
  slug,
  rarity,
  attributes,
  levelRequirement,
  dropArea[]->{name, slug, areaType}
}`;

const armorProjection = `{
  ...${baseProjection},
  armorWeapon,
  'armorType': armorAttributes.armorType,
}`;

const weaponProjection = `{
  ...${baseProjection},
  armorWeapon,
  'weaponType': weaponAttributes.weaponType->name,
}`;

const accessoryProjection = `{
  ...${baseProjection},
  slot,
}`;

function isValidSlug(slug: string): slug is ValidSlug {
  return VALID_SLUGS.includes(slug as ValidSlug);
}

export const load = (async ({ params }) => {
  if (!isValidSlug(params.slug)) {
    throw error(404, 'Page not found');
  }

  if (params.slug === 'armor') {
    // Fetch raw data from Sanity (no type assertion)
    const rawData = await client.fetch(
      `{
      'description': *[_type == 'description' && name match $slug][0] {
        name,
        description,
        extras
      },
      'equipment': {
        'helm': *[_type == 'equipment' && armorWeapon == 'armor' && armorAttributes.armorType == 'helm'] | order(levelRequirement) ${armorProjection},

        'cowl': *[_type == 'equipment' && armorWeapon == 'armor' && armorAttributes.armorType == 'cowl'] | order(levelRequirement) ${armorProjection},

        'chest': *[_type == 'equipment' && armorWeapon == 'armor' && armorAttributes.armorType == 'chest'] | order(levelRequirement) ${armorProjection},

        'robe': *[_type == 'equipment' && armorWeapon == 'armor' && armorAttributes.armorType == 'robe'] | order(levelRequirement) ${armorProjection},

        'wrists': *[_type == 'equipment' && armorWeapon == 'armor' && armorAttributes.armorType == 'wrists'] | order(levelRequirement) ${armorProjection},

        'skirt': *[_type == 'equipment' && armorWeapon == 'armor' && armorAttributes.armorType == 'skirt'] | order(levelRequirement) ${armorProjection},

        'legs': *[_type == 'equipment' && armorWeapon == 'armor' && armorAttributes.armorType == 'legs'] | order(levelRequirement) ${armorProjection},

        'feet': *[_type == 'equipment' && armorWeapon == 'armor' && armorAttributes.armorType == 'feet'] | order(levelRequirement) ${armorProjection},

        'shield': *[_type == 'equipment' && armorWeapon == 'armor' && armorAttributes.armorType == 'shield'] | order(levelRequirement) ${armorProjection}
      }
    }`,
      { slug: params.slug }
    );

    // Validate and parse the data - this will throw if validation fails
    const data = armorPageDataSchema.parse(rawData);

    return {
      description: data.description,
      equipment: data.equipment
    };
  }

  if (params.slug === 'weapons') {
    // Fetch raw data from Sanity (no type assertion)
    const rawData = await client.fetch(
      `{
        'description': *[_type == 'description' && name match $slug][0] {
          name,
          description,
          extras
        },
        'equipment': {
          'axe': *[_type == 'equipment' && armorWeapon == 'weapon' && weaponAttributes.weaponType->name == 'axe'] | order(levelRequirement) ${weaponProjection},

          'club': *[_type == 'equipment' && armorWeapon == 'weapon' && weaponAttributes.weaponType->name == 'club'] | order(levelRequirement) ${weaponProjection},

          'mace': *[_type == 'equipment' && armorWeapon == 'weapon' && weaponAttributes.weaponType->name == 'mace'] | order(levelRequirement) ${weaponProjection},

          'maul': *[_type == 'equipment' && armorWeapon == 'weapon' && weaponAttributes.weaponType->name == 'maul'] | order(levelRequirement) ${weaponProjection},

          'two handed sword': *[_type == 'equipment' && armorWeapon == 'weapon' && weaponAttributes.weaponType->name == 'two handed sword'] | order(levelRequirement) ${weaponProjection},

          'dagger': *[_type == 'equipment' && armorWeapon == 'weapon' && weaponAttributes.weaponType->name == 'dagger'] | order(levelRequirement) ${weaponProjection},

          'throwing dagger': *[_type == 'equipment' && armorWeapon == 'weapon' && weaponAttributes.weaponType->name == 'throwing dagger'] | order(levelRequirement) ${weaponProjection},

          'fist': *[_type == 'equipment' && armorWeapon == 'weapon' && weaponAttributes.weaponType->name == 'fist'] | order(levelRequirement) ${weaponProjection},

          'long sword': *[_type == 'equipment' && armorWeapon == 'weapon' && weaponAttributes.weaponType->name == 'long sword'] | order(levelRequirement) ${weaponProjection},

          'short sword': *[_type == 'equipment' && armorWeapon == 'weapon' && weaponAttributes.weaponType->name == 'short sword'] | order(levelRequirement) ${weaponProjection}
        }
      }`,
      { slug: params.slug }
    );

    // Validate and parse the data - this will throw if validation fails
    const data = weaponsPageDataSchema.parse(rawData);

    return {
      description: data.description,
      equipment: data.equipment
    };
  }

  if (params.slug === 'accessories') {
    // Fetch raw data from Sanity (no type assertion)
    const rawData = await client.fetch(
      `{
        'description': *[_type == 'description' && name match $slug][0]
        {
          name,
          description,
          extras
        },

        'equipment':
        {
          'amulet': *[_type == 'accessory' && slot == 'amulet'] | order(levelRequirement) ${accessoryProjection},
          'belt': *[_type == 'accessory' && slot == 'belt'] | order(levelRequirement) ${accessoryProjection},
          'baldric': *[_type == 'accessory' && slot == 'baldric'] | order(levelRequirement) ${accessoryProjection},
          'backpack': *[_type == 'accessory' && slot == 'backpack'] | order(levelRequirement) ${accessoryProjection},
          'ring': *[_type == 'accessory' && slot == 'ring'] | order(levelRequirement) ${accessoryProjection}
        }
      }`,
      { slug: params.slug }
    );

    // Validate and parse the data - this will throw if validation fails
    const data = accessoriesPageDataSchema.parse(rawData);

    return {
      description: data.description,
      equipment: data.equipment
    };
  }
}) satisfies PageServerLoad;
