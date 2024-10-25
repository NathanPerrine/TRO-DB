import type { PageServerLoad } from './$types';
import type { Book, Description } from '$lib';
import { client } from '$lib/utils/sanity/client';

const skillLevels = [
  'familiar',
  'proficient',
  'expert',
  'master',
  'grandmaster',
  'supreme-master'
] as const;

type SkillLevel = (typeof skillLevels)[number];
type SkillLevels = Record<SkillLevel, Book[]>;

interface Data {
  description: Description;
  books: Book[];
}

export const load = (async ({ params }) => {
  const data = await client.fetch<Data>(
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
          dropOnly
        }
      } | order(skill asc, name asc)
    }
  `,
    { bookType: params.bookType }
  );

  const organizedBooks = data.books.reduce<Record<string, SkillLevels>>((acc, book) => {
    const { skill, skillLevel } = book;
    acc[skill] ||= skillLevels.reduce<SkillLevels>((levels, level) => {
      levels[level] = [];
      return levels;
    }, {} as SkillLevels);

    if (skillLevels.includes(skillLevel as SkillLevel)) {
      acc[skill][skillLevel as SkillLevel].push(book);
    }

    return acc;
  }, {});

  return {
    description: data.description,
    books: organizedBooks
  };
}) satisfies PageServerLoad;
