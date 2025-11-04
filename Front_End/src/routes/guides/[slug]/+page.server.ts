import { client } from '$lib/utils/sanity/client';
import { error } from '@sveltejs/kit';
import { guidePageDataSchema } from '$lib/schemas/guide.server.js';
import { portableTextProjection } from '$lib/utils/sanity/portableTextProjection';

export const load = async ({ params }) => {
  const rawData = await client.fetch(
    `*[_type == "guide" && slug.current == $slug][0]{
      title,
      author,
      summary,
      category,
      sections[] {
        sectionTitle,
        sectionSlug,
        content${portableTextProjection},
        subsections[] {
          subsectionTitle,
          subsectionSlug,
          content${portableTextProjection}
        }
      },
      relatedGuides[]-> {
        _id,
        title,
        slug,
        summary
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
