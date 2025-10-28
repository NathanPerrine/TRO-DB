import type { PageServerLoad } from './$types';
import { client } from '$lib/utils/sanity/client';
import { error } from '@sveltejs/kit';
import { spellDetailSchema } from '$lib/schemas/spell.server';

export const load = (async ({ params }) => {
  const rawData = await client.fetch(`
    *[_type == 'spell' && slug.current == $slug][0] {
      title,
      spellSchool,
      level,
      slug,
      spellEffect,
      mpCost,
      description,
      spellDelay,
      duration,
      chant,
      extendable,
      enchantable,
      dropOnly,
      notes,
      "spellbook": *[_type == 'book' && linkedSpell._ref == ^._id][0]{
        slug,
        bookType,
      }
    }`,
    {slug: params.spell}
  );

    if (!rawData){
      error(404, {
        message: "Sorry, that spell has not been found. Please try again later."
      })
    }

    const data = spellDetailSchema.parse(rawData);

    return {spell: data};
}) satisfies PageServerLoad;