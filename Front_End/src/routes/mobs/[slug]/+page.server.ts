import type { Mob } from '$lib';
import { client } from '$lib/utils/sanity/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
  const mob = await client.fetch<Mob[]>(`
    *[_type == 'mob' && slug.current == '${params.slug}'] {
      ...
    }
  `)
    return {mob: mob[0]};
}) satisfies PageServerLoad;