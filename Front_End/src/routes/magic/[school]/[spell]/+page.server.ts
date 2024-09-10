import type { PageServerLoad } from './$types';
import { client } from '$lib/utils/sanity/client';
import { error } from '@sveltejs/kit';
import type { FullSpell } from '$lib/types/index'



export const load = (async ({ params }) => {
  console.log(params)
  console.log(params.spell)
  const data = await client.fetch<FullSpell[]>(`*[_type == 'spell' && slug.current == '${params.spell}'] {
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
    }`)

    if (!data){
      error(404, {
        message: "Sorry, that spell has not been found. Please try again later."
      })
    }

    console.log(data[0])
    return {spell: data[0]};
}) satisfies PageServerLoad;