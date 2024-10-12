import type { PageServerLoad } from './$types';
import type { Description, Item } from '$lib';
import { client } from '$lib/utils/sanity/client';

export const load = (async ({ params }) => {

  // Items are stored in sanity with the singular type. The url /scrolls/ should search for 'scroll'
  const data = await client.fetch<Item[]>(`*[_type == "item" && type == "${params.itemType.slice(0, -1)}"] | order(name) {
    name,
    slug,
    descriptionIdentified,
  }`)

  const description = await client.fetch<Description[]>(`*[_type == 'description' && name match '${params.itemType}'] {
    name,
    description,
  }`)

  return {
    items: data,
    description: description[0]
  };
}) satisfies PageServerLoad;