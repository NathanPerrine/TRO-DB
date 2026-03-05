import { client } from '$lib/utils/sanity/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
  const searchTerm = url.searchParams.get('q');

  const query = await client.fetch(`
        *[
        (_type in ["mob", "equipment", "accessory", "area", "book", "item"] && name match $q) ||
        (_type in ["spell", "guide"] && title match $q)
        ] | order(_type asc) {
          _type,
          "name": coalesce(name, title),
          slug,
          // type-specific fields needed for URL building
          _type == "spell" => { spellSchool },
          _type == "equipment" => { armorWeapon },
          _type == "area" => { areaType },
          _type == "book" => { bookType },
          _type == "item" => { "itemType": type },
          _type == "guide" => { category },
    }`, { q: searchTerm}
  )

  console.log(query);
  return {
    searchTerm
  };
}) satisfies PageServerLoad;
