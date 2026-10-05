import type { PageServerLoad } from './$types';
import { client } from '$lib/utils/sanity/client';
import { error } from '@sveltejs/kit';
import { z } from 'zod';
import { descriptionSchema } from '$lib/schemas/common.server';
import { itemListItemSchema } from '$lib/schemas/item.server';
import { portableTextProjection } from '$lib/utils/sanity/portableTextProjection';
import { getBySlug } from '$lib/utils/itemTypes';

const itemPageDataSchema = z.object({
  description: descriptionSchema,
  items: z.array(itemListItemSchema)
});

export const load = (async ({ params }) => {
  const entry = getBySlug(params.itemType);

  if (!entry) {
    throw error(404, 'Page not found');
  }

  const rawData = await client.fetch(
    `{
      'description': *[_type == 'description' && name match $itemType][0]{
        name,
        description${portableTextProjection},
        extras${portableTextProjection},
      },

      'items': *[_type == 'item' && type == $type] | order(name) {
        name,
        slug,
        descriptionIdentified,
      }
    }`,
    {
      itemType: params.itemType,
      type: entry.type
    }
  );

  const data = itemPageDataSchema.parse(rawData);

  return {
    description: data.description,
    items: data.items,
    slug: entry.slug
  };
}) satisfies PageServerLoad;
