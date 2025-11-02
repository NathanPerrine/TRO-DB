import { client } from '$lib/utils/sanity/client';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { z } from 'zod';
import { descriptionSchema } from '$lib/schemas/common.server';
import { areaListItemSchema } from '$lib/schemas/area.server';
import { portableTextProjection } from '$lib/utils/sanity/portableTextProjection';

const VALID_SLUGS = ['towns', 'zones', 'dungeons'];
type ValidSlug = (typeof VALID_SLUGS)[number];

function isValidSlug(slug: string): slug is ValidSlug {
  return VALID_SLUGS.includes(slug as ValidSlug);
}

const areaPageSchema = z.object({
  description: descriptionSchema,
  areas: areaListItemSchema.array()
});

export const load = (async ({ params }) => {
  if (!isValidSlug(params.areaType)) {
    throw error(404, 'Page not Found.');
  }

  const rawData = await client.fetch(
    `{
      'description': *[_type == 'description' && name match $areaType][0]{
        name,
        description${portableTextProjection},
        extras${portableTextProjection},
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

  const data = areaPageSchema.parse(rawData);

  return {
    description: data.description,
    areas: data.areas
  };
}) satisfies PageServerLoad;
