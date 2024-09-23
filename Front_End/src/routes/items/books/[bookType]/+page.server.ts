import type { PageServerLoad } from './$types';
import type { Book, Description } from '$lib';
import { client } from '$lib/utils/sanity/client'

export const load = (async ({ params }) => {
  const bookType = params.bookType.slice(0, -1);
  const data = await client.fetch<Book[]>(`*[_type == 'book' && bookType == '${bookType}'] {
    name,
    slug,
    bookType,
    skill,
    skillLevel,
    description,
    linkedSpell->{
      dropOnly
    }
  }`)

  const description = await client.fetch<Description[]>(`*[_type == 'description' && name match '${bookType}*'] {
    name,
    description,
  }`)

  const organizedBooks = data.reduce((acc, book) => {
    const { skill, skillLevel } = book;

    // Initialize the skill object if it doesn't exist
    if (!acc[skill]) {
      acc[skill] = {
        'familiar': [],
        'proficient': [],
        'expert': [],
        'master': [],
        'grandmaster': [],
        'supreme-master': []
      };
    }

    // Ensure the skillLevel is valid and matches one of the predefined levels
    if (acc[skill][skillLevel]) {
      acc[skill][skillLevel].push(book);
    }
    return acc;
  }, {} as { [key: string]: { [key: string]: Book[] } });

  Object.keys(organizedBooks).forEach(skill => {
    Object.keys(organizedBooks[skill]).forEach(skillLevel => {
      organizedBooks[skill][skillLevel].sort((a, b) => a.name.localeCompare(b.name));
    });
  });

  return {
    books: organizedBooks,
    description: description[0],
  };
}) satisfies PageServerLoad;