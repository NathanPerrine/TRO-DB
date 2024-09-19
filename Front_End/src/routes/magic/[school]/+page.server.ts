import type { PageServerLoad } from './$types';
import { client } from '$lib/utils/sanity/client';
import type { Spell } from '$lib/types/index';


export const load = (async ({ params }) => {
  const spells = {
    'familiar': [] as Spell[],
    'proficient': [] as Spell[],
    'expert': [] as Spell[],
    'master': [] as Spell[],
    'grandmaster': [] as Spell[],
    'supreme-master': [] as Spell[],
  }

  const description = await client.fetch(`*[_type == 'description' && name match '${params.school}'] {
    name,
    description,
  }`)

  const data = await client.fetch<Spell[]>(`*[_type == 'spell' && spellSchool =='${params.school}'] {
    title,
    spellSchool,
    level,
    slug,
    spellEffect,
    mpCost,
  }`)


  data.forEach(spell => {
    const { level } = spell;
    if (spells[level]) {
      spells[level].push(spell);
    }
  })

  const alphabetizedSpells = Object.fromEntries(
    Object.entries(spells).map(([level, spells]) => [
      level,
      spells.sort((a, b) => a.title.localeCompare(b.title))
    ])
  );

    return {
      spells: alphabetizedSpells,
      description: description[0]};
}) satisfies PageServerLoad;