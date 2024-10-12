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
    directions,
    walkthrough,
    notes,
    notableDrops[] -> {
      name,
      slug,
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

  console.log(area)
  return { area: area };
}) satisfies PageServerLoad;



