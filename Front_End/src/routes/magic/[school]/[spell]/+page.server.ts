import type { PageServerLoad } from './$types';
import { client } from '$lib/utils/sanity/client';
import { error } from '@sveltejs/kit';



export const load = (async ({ params }) => {
  console.log(params)
  console.log(params.spell)
  const data = await client.fetch(`*[_type == 'spell' && slug.current == '${params.spell}'] {
    title,
    }`)

    if (!data[0]){
      error(404, {
        message: "Sorry, that spell has not been found. Please try again later."
      })
    }

    console.log(data)
    return {data};
}) satisfies PageServerLoad;