import type { Description, Area } from '$lib';
import { client } from '$lib/utils/sanity/client';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

const VALID_SLUGS = ['towns', 'zones', 'dungeons'];
type ValidSlug = (typeof VALID_SLUGS)[number];

function isValidSlug(slug: string): slug is ValidSlug {
  return VALID_SLUGS.includes(slug as ValidSlug);
}

interface Data {
  description: Description;
  areas: Area[];
}

export const load = (async ({ params }) => {
  if (!isValidSlug(params.areaType)) {
    throw error(404, 'Page not Found.');
  }

  const data = await client.fetch<Data>(
    `{
      'description': *[_type == 'description' && name match $areaType][0]{
        name,
        description,
        extras,
      },

      'areas': *[_type == 'area' && $areaType match areaType + "*"] | order(name) {
        name,
        slug,
        areaType,
        directions[]{
          town->{name, slug},
          directions,
        },
        'levelRange': select(
          areaType != 'town' => {
            'min': math::min(
              *[_type == 'mob' && references(^._id)].levelRange.min
            ),
            'max': math::max(
              *[_type == 'mob' && references(^._id)].levelRange.max
            )
          }
        ),
      }
    }`,
    { areaType: params.areaType }
  );

  return {
    description: data.description,
    areas: data.areas
  };
}) satisfies PageServerLoad;
