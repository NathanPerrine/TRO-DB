import { client } from '$lib/utils/sanity/client';
import { error } from '@sveltejs/kit';
import { guidePageDataSchema } from '$lib/schemas/guide.server.js';

export const load = async ({ params }) => {
  const rawData = await client.fetch(
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

  if (!rawData) {
    throw error(404, 'Guide not found :(');
  }

  const guide = guidePageDataSchema.parse(rawData);

  return guide;
};
