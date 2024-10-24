import type { Area } from '$lib';
import { client } from '$lib/utils/sanity/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
  const area = await client.fetch<Area>(`
    *[_type == 'area' && slug.current == '${params.slug}'][0]{
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
    notableDrops{
      books[]->{name, slug, bookType},
      equipment[]->{identifiedName, slug, rarity, armorWeapon},
      accessories[]->{identifiedName, slug, rarity, slot},
    },
    mobs[] -> {
      name,
      slug,
      levelRange,
      hpRange,
      boss,
    },
    connectedAreas[] -> {
      name,
      slug,
      areaType,
    },
  }
  `);

  return { area: area };
}) satisfies PageServerLoad;
