import type { Description, Mob } from '$lib';
import { client } from '$lib/utils/sanity/client';
import type { PageServerLoad } from './$types';

export const load = (async ({}) => {
  const description = await client.fetch<Description[]>(`
    *[_type == 'description' && name match 'mobs'] {
      name,
      description,
      extras,
    }
  `);

  type partialMob = Pick<Mob, 'name' | 'slug' | 'levelRange' | 'hpRange' | 'inhabitedAreas'>;

  const mobs = await client.fetch<partialMob[]>(`
    *[_type == 'mob'] | order(name) {
      name,
      slug,
      levelRange,
      hpRange,
      inhabitedAreas[] -> {
        name,
        slug,
        areaType,
      },
    }
  `);

  return {
    description: description[0],
    mobs: mobs
  };
}) satisfies PageServerLoad;
