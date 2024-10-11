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

  const mobs = await client.fetch<Pick<Mob, 'name' | 'slug' | 'levelRange' | 'hpRange'>[]>(`
    *[_type == 'mob']{
      name,
      slug,
      levelRange,
      hpRange
    }
  `);

  return {
    description: description[0],
    mobs: mobs
  };
}) satisfies PageServerLoad;
