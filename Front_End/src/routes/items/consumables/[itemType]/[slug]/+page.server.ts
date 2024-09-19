import type { Item } from '$lib/types';
import { client } from '$lib/utils/sanity/client';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
  const data = await client.fetch<Item[]>(`*[_type == "item" && slug.current == '${params.slug}'] {
    name,
    slug,
    type,
    description,
    descriptionIdentified,
    weight,
    condition,
    buyPrice,
    sellPrice,
    charges,
    notes,
  }`)

  if (!data[0]){
    error(404, {
      message: "Sorry, that page has not been found. Please try again later."
    })
  }

  return {item: data[0]};
}) satisfies PageServerLoad;