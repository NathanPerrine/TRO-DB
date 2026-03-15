import { client } from '$lib/utils/sanity/client';
import { questListItemSchema } from '$lib/schemas/quest.server';
import { z } from 'zod';
import type { PageServerLoad } from './$types';

const questListSchema = z.object({
  quests: z.array(questListItemSchema),
});

export const load = (async () => {
  const rawData = await client.fetch(
    `{
      'quests': *[_type == 'quest'] | order(title asc) {
        title,
        slug,
        "author": coalesce(author->displayName, author->name),
        summary,
        recommendedLevel,
        _createdAt,
        _updatedAt,
      }
    }`
  );

  const data = questListSchema.parse(rawData);

  return data;
}) satisfies PageServerLoad;
