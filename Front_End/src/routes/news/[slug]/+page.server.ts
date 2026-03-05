import { client } from '$lib/utils/sanity/client';
import { error } from '@sveltejs/kit';
import { newsPageDataSchema } from '$lib/schemas/news.server';
import { portableTextProjection } from '$lib/utils/sanity/portableTextProjection';

export const load = async ({ params }) => {
  const rawData = await client.fetch(
    `*[_type == "news" && slug.current == $slug][0]{
      title,
      author,
      publishedAt,
      summary,
      category,
      featuredImage {
        asset->,
        alt
      },
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
      _createdAt,
      _updatedAt
    }`,
    { slug: params.slug }
  );

  if (!rawData) {
    throw error(404, 'News article not found');
  }

  const article = newsPageDataSchema.parse(rawData);

  return article;
};
