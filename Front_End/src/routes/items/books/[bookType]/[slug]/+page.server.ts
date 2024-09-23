import type { PageServerLoad } from './$types';
import { client } from '$lib/utils/sanity/client'
import type { Book } from '$lib';


export const load = (async ({ params }) => {

  if (params.bookType == 'spellbook') {
    const data = await client.fetch<Book[]>(`*[_type == 'book' && slug.current == '${params.slug}']{
      ...,
      linkedSpell->{
        title,
        spellSchool,
        slug,
        dropOnly,
      }
    }`)
    return {book: data[0]};
  } else if (params.bookType == 'skillbook') {
    const data = await client.fetch<Book[]>(`*[_type == 'book' && slug.current == '${params.slug}']{
      ...,
    }`)
    return {book: data[0]};
  }
}) satisfies PageServerLoad;