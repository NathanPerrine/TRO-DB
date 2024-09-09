import type { PageServerLoad } from './$types';
import { client } from '$lib/utils/sanity/client';
import { error } from '@sveltejs/kit';
import { type Spell } from '$lib/types/index';


export const load = (async ({ params }) => {
  const spells = {
    'familiar': [] as Spell[],
    'proficient': [] as Spell[],
    'expert': [] as Spell[],
    'master': [] as Spell[],
    'grandmaster': [] as Spell[],
    'supreme-master': [] as Spell[],
  }

  const data = await client.fetch<Spell[]>(`*[_type == 'spell' && spellSchool=='${params.school}'] {
    title,
    spellSchool,
    level,
    slug,
    spellEffect,
    mpCost,
    }`)

    if (!data[0]){
      error(404, {
        message: "Sorry, that page has not been found. Please try again later."
      })
    }

    data.forEach(spell => {
      const { level } = spell;
      if (spells[level]) {
        spells[level].push(spell);
      }
    })

    console.log(data)
    return {spells};
}) satisfies PageServerLoad;