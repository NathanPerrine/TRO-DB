import { error } from '@sveltejs/kit';
import { client } from '$lib/utils/sanity/client';
import type { PageServerLoad } from './$types';
import { areaDetailSchema } from '$lib/schemas/area.server';

const mobProjection = `{
  name,
  slug,
  levelRange,
  hpRange,
  boss
}`

const bookProjection = `{
  name,
  slug,
  bookType,
}`

const armorProjection = `{
  name,
  identifiedName,
  slug,
  rarity,
  levelRequirement,
  armorWeapon,
  armorAttributes {
    armorType,
    material,
    armorRating
  },
  attributes
}`

const weaponProjection = `{
  name,
  identifiedName,
  slug,
  rarity,
  levelRequirement,
  armorWeapon,
  weaponAttributes {
    weaponType->{name},
    damage
  },
  attributes
}`

const accessoryProjection = `{
  identifiedName,
  slug,
  rarity,
  slot
}`

export const load = (async ({ params }) => {
  const rawData = await client.fetch(
    `*[_type == "area" && slug.current == $slug][0]{
      name,
      slug,
      areaType,
      description,
      map,
      directions[]{
        town->{name, slug},
        directions,
      },
      walkthrough,
      notes,
      "drops": {
        "books": *[_type == 'book' && references(^._id)] | order(name) ${bookProjection},
        "armors": *[_type == 'equipment' && armorWeapon == 'armor' && references(^._id)] | order(identifiedName) ${armorProjection},
        "weapons": *[_type == 'equipment' && armorWeapon == 'weapon' && references(^._id)] | order(identifiedName) ${weaponProjection},
        "accessories": *[_type == 'accessory' && references(^._id)] ${accessoryProjection},
      },
      'mobs': *[_type == 'mob' && references(^._id)] | order(boss desc, name) ${mobProjection},
      connectedAreas[] -> {
        name,
        slug,
        areaType,
      },
    }`,
    { slug: params.slug }
  );

  if (!rawData) {
    throw error(404, 'Area not found');
  }

  const area = areaDetailSchema.parse(rawData);

  return { area };
}) satisfies PageServerLoad;
