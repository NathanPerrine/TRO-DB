import type { PageServerLoad } from './$types';
import type { Description, Item } from '$lib';
import { client } from '$lib/utils/sanity/client';
import { error } from '@sveltejs/kit';

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

interface Data {
  description: Description;
  items: Item[];
}

export const load = (async ({ params }) => {
  if (!isValidSlug(params.itemType)) {
    throw error(404, 'Page not found');
  }

  const data = await client.fetch<Data>(
    `{
      'description': *[_type == 'description' && name match $itemType][0]{
        name,
        description,
        extras,
      },

      'items': *[_type == 'item' && $itemType match type + "*"] | order(name) {
        name,
        slug,
        descriptionIdentified,
      }
    }`,
    { itemType: params.itemType }
  );

  return {
    description: data.description,
    items: data.items
  };
}) satisfies PageServerLoad;
