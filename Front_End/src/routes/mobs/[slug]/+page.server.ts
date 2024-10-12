import type { Mob } from '$lib';
import { client } from '$lib/utils/sanity/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
  const mob = await client.fetch<Mob[]>(`
    *[_type == 'mob' && slug.current == '${params.slug}'] {
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
      notes,
    }
  `)
    return {mob: mob[0]};
}) satisfies PageServerLoad;