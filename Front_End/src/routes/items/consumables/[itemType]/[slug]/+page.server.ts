import { client } from '$lib/utils/sanity/client';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { itemDetailSchema } from '$lib/schemas/item.server';
import { portableTextProjection } from '$lib/utils/sanity/portableTextProjection';

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
    notes${portableTextProjection},
  }`,
    { slug: params.slug }
  );

  if (!rawData) {
    throw error(404, 'Item not found');
  }

  const data = itemDetailSchema.parse(rawData);

  return { item: data };
}) satisfies PageServerLoad;
