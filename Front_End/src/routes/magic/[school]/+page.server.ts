import type { PageServerLoad } from './$types';
import { client } from '$lib/utils/sanity/client';
import type { Description, Spell } from '$lib';
import { error } from '@sveltejs/kit';

const VALID_SLUGS = ['thaumaturgy', 'mysticism', 'elementalism', 'sorcery', 'necromancy'];
type ValidSlug = (typeof VALID_SLUGS)[number];

function isValidSlug(slug: string): slug is ValidSlug {
  return VALID_SLUGS.includes(slug as ValidSlug);
}

interface SpellLevels {
  familiar: Spell[];
  proficient: Spell[];
  expert: Spell[];
  master: Spell[];
  grandmaster: Spell[];
  'supreme-master': Spell[];
}

interface Data {
  description: Description;
  spells: SpellLevels;
}

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

  const data = await client.fetch<Data>(
    `{
      'description': *[_type == 'description' && name match $school][0]{
        name,
        description,
        extras,
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

  return {
    description: data.description,
    spells: data.spells
  };
}) satisfies PageServerLoad;
