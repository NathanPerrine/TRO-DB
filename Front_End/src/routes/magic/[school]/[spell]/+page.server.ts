import type { PageServerLoad } from './$types';
import { client } from '$lib/utils/sanity/client';
import { error } from '@sveltejs/kit';
import type { FullSpell } from '$lib'

export const load = (async ({ params }) => {
  const data = await client.fetch<FullSpell[]>(`*[_type == 'spell' && slug.current == '${params.spell}'] {
    _id,
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
  }`)

    if (!data){
      error(404, {
        message: "Sorry, that spell has not been found. Please try again later."
      })
    }

    return {spell: data[0]};
}) satisfies PageServerLoad;