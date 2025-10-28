import { client } from '$lib/utils/sanity/client';
import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { descriptionSchema } from '$lib/schemas/common.server';
import { mobAreaListItemSchema } from '$lib/schemas/mob.server';

const mobPageDataSchema = z.object({
  description: descriptionSchema,
  mobs: z.array(mobAreaListItemSchema)
});

export const load = (async () => {
  // Retrieve mob list and description content from Sanity
  const rawData = await client.fetch(
    `{
      'description': *[_type == 'description' && name match 'mobs'][0] {
      name,
      description,
      extras,
      },

      'mobs': *[_type == 'mob'] | order(inhabitedAreas[0]->name asc, name) {
        name,
        slug,
        boss,
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

  // Validate and parse the fetched data
  const data = mobPageDataSchema.parse(rawData);

  return data;
}) satisfies PageServerLoad;
