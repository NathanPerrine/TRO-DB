import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { client } from '$lib/utils/sanity/client';
import { bookSchema } from '$lib/schemas/book.server';

export const load = (async ({ params }) => {
  if (params.bookType == 'spellbook') {
    const rawData = await client.fetch(
      `*[_type == 'book' && slug.current == $slug]{
      ...,
      linkedSpell->{
        title,
        spellSchool,
        slug,
        dropOnly,
      }
    }`,
      { slug: params.slug }
    );

    if (!rawData || rawData.length === 0) {
      throw error(404, 'Book not found');
    }

    const book = bookSchema.parse(rawData[0]);
    return { book };
  } else if (params.bookType == 'skillbook') {
    const rawData = await client.fetch(
      `*[_type == 'book' && slug.current == $slug]{
      ...,
    }`,
      { slug: params.slug }
    );

    if (!rawData || rawData.length === 0) {
      throw error(404, 'Book not found');
    }

    const book = bookSchema.parse(rawData[0]);
    return { book };
  }

  throw error(404, 'Invalid book type');
}) satisfies PageServerLoad;