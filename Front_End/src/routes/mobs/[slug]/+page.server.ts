import { client } from '$lib/utils/sanity/client';
import type { PageServerLoad } from './$types';
import { mobDetailSchema } from '$lib/schemas/mob.server';
import { portableTextProjection } from '$lib/utils/sanity/portableTextProjection';

export const load = (async ({ params }) => {
  const rawData = await client.fetch(`
    *[_type == 'mob' && slug.current == '${params.slug}'][0] {
      name,
      slug,
      description,
      levelRange,
      hpRange,
      alignment,
      meleeDefense,
      meleeAttributes,
      spellResistances,
      spellDamageModifiers,
      inhabitedAreas[] -> {
        name,
        slug,
        areaType,
      },
      knownSpells[] -> {
        title,
        slug,
        spellSchool,
      },
      emotes,
      notes${portableTextProjection},
    }
  `)

  const mob = mobDetailSchema.parse(rawData);
    return mob;
}) satisfies PageServerLoad;