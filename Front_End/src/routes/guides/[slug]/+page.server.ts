import type { Guide } from '$lib';
import { client } from '$lib/utils/sanity/client';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
  const guide = await client.fetch<Guide>(
    `*[_type == "guide" && slug.current == $slug][0]{
      title,
      author,
      summary,
      category,
      content[] {
        ...,
        _type == "image" => {
          "asset": asset->,
          alt,
        }
      },
      _createdAt,
      _updatedAt,
    }`,
    { slug: params.slug }
  );

  if (!guide) {
    throw error(404, 'Guide not found :(');
  }

  return guide;
};
