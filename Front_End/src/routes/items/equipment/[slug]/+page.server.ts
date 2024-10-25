import type { PageServerLoad } from './$types';
import type { Description, GroupedEquipment } from '$lib';
import { client } from '$lib/utils/sanity/client';
import { error } from '@sveltejs/kit';

interface Data {
  description: Description;
  equipment: GroupedEquipment;
}

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
    const data = await client.fetch<Data>(
      `{
      'description': *[_type == 'description' && name match $slug][0] {
        name,
        description,
        extras
      },
      'equipment': {
        'helm': *[_type == 'equipment' && armorWeapon == 'armor' && armorAttributes.armorType == 'helm'] ${armorProjection},

        'cowl': *[_type == 'equipment' && armorWeapon == 'armor' && armorAttributes.armorType == 'cowl'] ${armorProjection},

        'chest': *[_type == 'equipment' && armorWeapon == 'armor' && armorAttributes.armorType == 'chest'] ${armorProjection},

        'robe': *[_type == 'equipment' && armorWeapon == 'armor' && armorAttributes.armorType == 'robe'] ${armorProjection},

        'wrists': *[_type == 'equipment' && armorWeapon == 'armor' && armorAttributes.armorType == 'wrists'] ${armorProjection},

        'skirt': *[_type == 'equipment' && armorWeapon == 'armor' && armorAttributes.armorType == 'skirt'] ${armorProjection},

        'legs': *[_type == 'equipment' && armorWeapon == 'armor' && armorAttributes.armorType == 'legs'] ${armorProjection},

        'feet': *[_type == 'equipment' && armorWeapon == 'armor' && armorAttributes.armorType == 'feet'] ${armorProjection},

        'shield': *[_type == 'equipment' && armorWeapon == 'armor' && armorAttributes.armorType == 'shield'] ${armorProjection}
      }
    }`,
      { slug: params.slug }
    );

    return {
      description: data.description,
      equipment: data.equipment
    };
  }

  if (params.slug === 'weapons') {
    const data = await client.fetch<Data>(
      `{
        'description': *[_type == 'description' && name match $slug][0] {
          name,
          description,
          extras
        },
        'equipment': {
          'axe': *[_type == 'equipment' && armorWeapon == 'weapon' && weaponAttributes.weaponType->name == 'axe'] ${weaponProjection},

          'club': *[_type == 'equipment' && armorWeapon == 'weapon' && weaponAttributes.weaponType->name == 'club'] ${weaponProjection},

          'mace': *[_type == 'equipment' && armorWeapon == 'weapon' && weaponAttributes.weaponType->name == 'mace'] ${weaponProjection},

          'maul': *[_type == 'equipment' && armorWeapon == 'weapon' && weaponAttributes.weaponType->name == 'maul'] ${weaponProjection},

          'two handed sword': *[_type == 'equipment' && armorWeapon == 'weapon' && weaponAttributes.weaponType->name == 'two handed sword'] ${weaponProjection},

          'dagger': *[_type == 'equipment' && armorWeapon == 'weapon' && weaponAttributes.weaponType->name == 'dagger'] ${weaponProjection},

          'throwing dagger': *[_type == 'equipment' && armorWeapon == 'weapon' && weaponAttributes.weaponType->name == 'throwing dagger'] ${weaponProjection},

          'fist': *[_type == 'equipment' && armorWeapon == 'weapon' && weaponAttributes.weaponType->name == 'fist'] ${weaponProjection},

          'long sword': *[_type == 'equipment' && armorWeapon == 'weapon' && weaponAttributes.weaponType->name == 'long sword'] ${weaponProjection},

          'short sword': *[_type == 'equipment' && armorWeapon == 'weapon' && weaponAttributes.weaponType->name == 'short sword'] ${weaponProjection}
        }
      }`,
      { slug: params.slug }
    );

    return {
      description: data.description,
      equipment: data.equipment
    };
  }

  if (params.slug === 'accessories') {
    const data = await client.fetch<Data>(
      `{
        'description': *[_type == 'description' && name match $slug][0]
        {
          name,
          description,
          extras
        },

        'equipment':
        {
          'amulet': *[_type == 'accessory' && slot == 'amulet'] ${accessoryProjection},
          'belt': *[_type == 'accessory' && slot == 'belt'] ${accessoryProjection},
          'baldric': *[_type == 'accessory' && slot == 'baldric'] ${accessoryProjection},
          'backpack': *[_type == 'accessory' && slot == 'backpack'] ${accessoryProjection},
          'ring': *[_type == 'accessory' && slot == 'ring'] ${accessoryProjection}
        }
      }`,
      { slug: params.slug }
    );

    return {
      description: data.description,
      equipment: data.equipment
    };
  }
}) satisfies PageServerLoad;
