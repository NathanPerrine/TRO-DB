import type { PageServerLoad } from './$types';
import { client } from '$lib/utils/sanity/client';
import { error } from '@sveltejs/kit';
import { z } from 'zod';
import { descriptionSchema } from '$lib/schemas/common.server';
import { itemListItemSchema } from '$lib/schemas/item.server';
import { portableTextProjection } from '$lib/utils/sanity/portableTextProjection';

const VALID_SLUGS = [
  'junk',
  'potions',
  'elixirs',
  'baubles',
  'scrolls',
  'wands',
  'orbs',
  'dungeon'
];
type ValidSlug = (typeof VALID_SLUGS)[number];

function isValidSlug(slug: string): slug is ValidSlug {
  return VALID_SLUGS.includes(slug as ValidSlug);
}

const itemPageDataSchema = {
  description: descriptionSchema,
  items: z.array(itemListItemSchema),
};

export const load = (async ({ params }) => {
  if (!isValidSlug(params.itemType)) {
    throw error(404, 'Page not found');
  }

  const rawData = await client.fetch(
    `{
      'description': *[_type == 'description' && name match $itemType][0]{
        name,
        description${portableTextProjection},
        extras${portableTextProjection},
      },

      'items': *[_type == 'item' && $itemType match type + "*"] | order(name) {
        name,
        slug,
        descriptionIdentified,
      }
    }`,
    { itemType: params.itemType }
  );

  const data = z.object(itemPageDataSchema).parse(rawData);

  return {
    description: data.description,
    items: data.items
  };
}) satisfies PageServerLoad;
