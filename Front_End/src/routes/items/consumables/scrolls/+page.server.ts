import type { Item } from '$lib/types';
import { client } from '$lib/utils/sanity/client';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
  const data = await client.fetch<Item[]>(`*[_type == "item" && type == "scroll"] {
    name,
    slug,
    descriptionIdentified,
  }`)

  if (!data[0]){
    error(404, {
      message: "Sorry, that page has not been found. Please try again later."
    })
  }

  // Sort array of objects by object property 'name'
  data.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );

  return {scrolls: data};
}) satisfies PageServerLoad;