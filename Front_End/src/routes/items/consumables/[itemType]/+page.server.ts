import type { PageServerLoad } from './$types';
import type { Description, Item } from '$lib/types';
import { client } from '$lib/utils/sanity/client';

export const load = (async ({ params }) => {

  // Items are stored in sanity with the singular type. The url /scrolls/ should search for 'scroll'
  const data = await client.fetch<Item[]>(`*[_type == "item" && type == "${params.itemType.slice(0, -1)}"] {
    name,
    slug,
    descriptionIdentified,
  }`)

  const description = await client.fetch<Description[]>(`*[_type == 'description' && name match '${params.itemType}'] {
    name,
    description,
  }`)

  // Sort array of objects by object property 'name'
  data.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );

  return {
    scrolls: data,
    description: description[0]
  };
}) satisfies PageServerLoad;