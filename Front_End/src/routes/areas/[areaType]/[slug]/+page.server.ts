import type { Area } from '$lib';
import { client } from '$lib/utils/sanity/client';
import type { PageServerLoad } from './$types';

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
  const area = await client.fetch<Area>(`
    *[_type == "area" && slug.current == "${params.slug}"][0]{
    name,
    slug,
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
  }
  `);

  return { area: area };
}) satisfies PageServerLoad;
