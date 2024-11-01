import type { Description, Mob } from '$lib';
import { client } from '$lib/utils/sanity/client';
import type { PageServerLoad } from './$types';

interface Data {
  description: Description;
  mobs: Pick<Mob, 'name' | 'slug' | 'levelRange' | 'hpRange' | 'inhabitedAreas'>;
}

export const load = (async () => {
  const data = await client.fetch<Data>(
    `{
      'description': *[_type == 'description' && name match 'mobs'][0] {
      name,
      description,
      extras,
      },

      'mobs': *[_type == 'mob'] | order(name) {
        name,
        slug,
        levelRange,
        hpRange,
        inhabitedAreas[] -> {
          name,
          slug,
          areaType,
        },
      },
    }`
  );

  return {
    description: data.description,
    mobs: data.mobs
  };
}) satisfies PageServerLoad;
