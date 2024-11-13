import type { Description, Guide } from '$lib';
import { client } from '$lib/utils/sanity/client';
import type { PageServerLoad } from './$types';

const guideProjection = `{
  title,
  slug,
  author,
  summary,
  _createdAt,
  _updatedAt,
}`;

type GuideProjection = Pick<Guide, 'title' | 'slug' | 'summary' | '_createdAt' | '_updatedAt'>;

interface Guides {
  newPlayer: GuideProjection[];
  leveling: GuideProjection[];
  moneyMaking: GuideProjection[];
  crafting: GuideProjection[];
  other: GuideProjection[];
}

interface Data {
  description: Description;
  guides: Guides;
}

export const load = (async () => {
  const data = await client.fetch<Data>(
    `{
    'description': *[_type == 'description' && name match 'guides'][0] {
        name,
        description,
        extras
      },

    'guides': {
      'New Player': *[_type == 'guide' && category == 'new player'] | order(_createdAt) ${guideProjection},
      'Leveling': *[_type == 'guide' && category == 'leveling'] | order(_createdAt) ${guideProjection},
      'Money Making': *[_type == 'guide' && category == 'money making'] | order(_createdAt) ${guideProjection},
      'Crafting': *[_type == 'guide' && category == 'crafting'] | order(_createdAt) ${guideProjection},
      'Other': *[_type == 'guide' && category == 'other'] | order(_createdAt) ${guideProjection},
    }
  }`
  );

  return {
    description: data.description,
    guides: data.guides
  };
}) satisfies PageServerLoad;
