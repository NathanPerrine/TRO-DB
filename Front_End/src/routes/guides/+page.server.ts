import { descriptionSchema } from '$lib/schemas/common.server';
import { guideListItemSchema } from '$lib/schemas/guide.server';
import { client } from '$lib/utils/sanity/client';
import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { portableTextProjection } from '$lib/utils/sanity/portableTextProjection';

const guideProjection = `{
  title,
  slug,
  author,
  summary,
  _createdAt,
  _updatedAt,
}`;

const guidePageDataSchema = z.object({
  description: descriptionSchema,
  guides: z.object({
    'New Player': z.array(guideListItemSchema).nullish().default([]),
    'Leveling': z.array(guideListItemSchema).nullish().default([]),
    'Money Making': z.array(guideListItemSchema).nullish().default([]),
    'Enchanting and Crafting': z.array(guideListItemSchema).nullish().default([]),
    'Other': z.array(guideListItemSchema).nullish().default([]),
  })
});

export const load = (async () => {
  const rawData = await client.fetch(
    `{
    'description': *[_type == 'description' && name match 'guides'][0] {
        name,
        description${portableTextProjection},
        extras${portableTextProjection}
      },

    'guides': {
      'New Player': *[_type == 'guide' && category == 'new player'] | order(_createdAt) ${guideProjection},
      'Leveling': *[_type == 'guide' && category == 'leveling'] | order(_createdAt) ${guideProjection},
      'Money Making': *[_type == 'guide' && category == 'money making'] | order(_createdAt) ${guideProjection},
      'Enchanting and Crafting': *[_type == 'guide' && category == 'enchanting and crafting'] | order(_createdAt) ${guideProjection},
      'Other': *[_type == 'guide' && category == 'other'] | order(_createdAt) ${guideProjection},
    }
  }`
  );

  const data = guidePageDataSchema.parse(rawData);

  return {
    description: data.description,
    guides: data.guides
  };
}) satisfies PageServerLoad;
