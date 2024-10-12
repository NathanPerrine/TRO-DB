import type { Description, Area } from '$lib';
import { client } from '$lib/utils/sanity/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
  const description = await client.fetch<Description>(`
    *[_type == 'description' && name match '${params.areaType}'][0] {
      name,
      description,
      extras
    }
  `);

  const areas = await client.fetch<Pick<Area, 'name' | 'slug' | 'areaType' | 'directions'>[]>(`
    *[_type == 'area' && areaType match '${params.areaType.slice(0, -1)}'] | order(name) {
      name,
      slug,
      areaType,
      directions,
    }
  `)

  return {
    description: description,
    areas: areas,
  };
}) satisfies PageServerLoad;
