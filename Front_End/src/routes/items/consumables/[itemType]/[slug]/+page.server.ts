import { client } from '$lib/utils/sanity/client';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { itemDetailSchema } from '$lib/schemas/item.server';

export const load = (async ({ params }) => {
  const rawData = await client.fetch(
    `*[_type == "item" && slug.current == $slug][0] {
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
  }`,
    { slug: params.slug }
  );

  if (!rawData) {
    error(404, {
      message: 'Sorry, that page has not been found. Please try again later.'
    });
  }

  const data = itemDetailSchema.parse(rawData);

  return { item: data };
}) satisfies PageServerLoad;
