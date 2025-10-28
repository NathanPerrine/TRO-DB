import type { PageServerLoad } from './$types';
import { client } from '$lib/utils/sanity/client';
import { bookSchema } from '$lib/schemas/book.server';
import { descriptionSchema, type SkillLevel } from '$lib/schemas/common.server';
import { z } from 'zod';

type SkillLevels = Record<SkillLevel, z.infer<typeof bookSchema>[]>;

const booksPageDataSchema = z.object({
  description: descriptionSchema,
  books: z.array(bookSchema)
});

export const load = (async ({ params }) => {
  const rawData = await client.fetch(
    `
    {
      "description": *[_type == 'description' && name match $bookType + "*"][0] {
        name,
        description
      },
      "books": *[_type == 'book' && $bookType match bookType + "*"] {
        name,
        slug,
        bookType,
        skill,
        skillLevel,
        description,
        linkedSpell->{
          title,
          slug,
          spellSchool,
          dropOnly
        }
      } | order(skill asc, skillLevel asc, name asc)
    }
  `,
    { bookType: params.bookType }
  );

  const data = booksPageDataSchema.parse(rawData);

  // Group books by skill, then by skill level
  const organizedBooks: Record<string, SkillLevels> = {};

  for (const book of data.books) {
    const { skill, skillLevel } = book;

    // Initialize skill if not exists
    if (!organizedBooks[skill]) {
      organizedBooks[skill] = {
        familiar: [],
        proficient: [],
        expert: [],
        master: [],
        grandmaster: [],
        'supreme-master': []
      };
    }

    // Add book to its skill level array
    organizedBooks[skill][skillLevel].push(book);
  }

  return {
    description: data.description,
    books: organizedBooks
  };
}) satisfies PageServerLoad;
