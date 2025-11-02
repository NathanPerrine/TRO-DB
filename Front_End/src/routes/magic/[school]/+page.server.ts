import type { PageServerLoad } from './$types';
import { client } from '$lib/utils/sanity/client';
import { error } from '@sveltejs/kit';
import { z } from 'zod';
import { descriptionSchema } from '$lib/schemas/common.server';
import { spellListItemSchema } from '$lib/schemas/spell.server';
import { portableTextProjection } from '$lib/utils/sanity/portableTextProjection';

const VALID_SLUGS = ['thaumaturgy', 'mysticism', 'elementalism', 'sorcery', 'necromancy'];
type ValidSlug = (typeof VALID_SLUGS)[number];

function isValidSlug(slug: string): slug is ValidSlug {
  return VALID_SLUGS.includes(slug as ValidSlug);
}



const spellLevelsSchema = z.object({
  familiar: z.array(spellListItemSchema),
  proficient: z.array(spellListItemSchema),
  expert: z.array(spellListItemSchema),
  master: z.array(spellListItemSchema),
  grandmaster: z.array(spellListItemSchema),
  'supreme-master': z.array(spellListItemSchema),
});

const spellPageDataSchema = z.object({
  description: descriptionSchema,
  spells: spellLevelsSchema
});

const spellProjection = `{
  title,
  spellSchool,
  level,
  slug,
  spellEffect,
  mpCost,
  dropOnly
}`;

export const load = (async ({ params }) => {
  if (!isValidSlug(params.school)) {
    throw error(404, 'Page not Found.');
  }

  const rawData = await client.fetch(
    `{
      'description': *[_type == 'description' && name match $school][0]{
        name,
        description${portableTextProjection},
        extras${portableTextProjection},
      },
      'spells': {
        'familiar': *[_type == 'spell' && spellSchool match $school && level == 'familiar'] | order(title asc) ${spellProjection},

        'proficient': *[_type == 'spell' && spellSchool match $school && level == 'proficient'] | order(title asc) ${spellProjection},

        'expert': *[_type == 'spell' && spellSchool match $school && level == 'expert'] | order(title asc) ${spellProjection},

        'master': *[_type == 'spell' && spellSchool match $school && level == 'master'] | order(title asc) ${spellProjection},

        'grandmaster': *[_type == 'spell' && spellSchool match $school && level == 'grandmaster'] | order(title asc) ${spellProjection},

        'supreme-master': *[_type == 'spell' && spellSchool match $school && level == 'supreme-master'] | order(title asc) ${spellProjection},
      }
    }`,
    { school: params.school }
  );

  const data = spellPageDataSchema.parse(rawData);

  return {
    description: data.description,
    spells: data.spells
  };
}) satisfies PageServerLoad;
