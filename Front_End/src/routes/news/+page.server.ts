import { newsListItemSchema } from '$lib/schemas/news.server';
import { client } from '$lib/utils/sanity/client';
import type { PageServerLoad } from './$types';
import { z } from 'zod';

const newsProjection = `{
  title,
  slug,
  "author": coalesce(author->displayName, author->name),
  publishedAt,
  summary,
  category,
  _createdAt,
  _updatedAt
}`;

const newsPageDataSchema = z.object({
  news: z.object({
    'Game Update': z.array(newsListItemSchema).nullish().default([]),
    'Site Update': z.array(newsListItemSchema).nullish().default([]),
    'Community': z.array(newsListItemSchema).nullish().default([]),
    'Announcement': z.array(newsListItemSchema).nullish().default([])
  })
});

export const load = (async () => {
  const rawData = await client.fetch(
    `{
    'news': {
      'Game Update': *[_type == "news" && category == "game update"] | order(publishedAt desc) ${newsProjection},
      'Site Update': *[_type == "news" && category == "site update"] | order(publishedAt desc) ${newsProjection},
      'Community': *[_type == "news" && category == "community"] | order(publishedAt desc) ${newsProjection},
      'Announcement': *[_type == "news" && category == "announcement"] | order(publishedAt desc) ${newsProjection}
    }
  }`
  );

  const data = newsPageDataSchema.parse(rawData);

  return {
    news: data.news
  };
}) satisfies PageServerLoad;
