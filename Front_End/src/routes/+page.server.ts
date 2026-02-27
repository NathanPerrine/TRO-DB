import { client } from '$lib/utils/sanity/client';
import { homePageDataSchema } from '$lib/schemas/home.server';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  const rawData = await client.fetch(`{
    'recentItems': *[_type in ["mob", "spell", "equipment", "accessory", "area", "book", "item", "guide"]]
      | order(_updatedAt desc) [0..4] {
        _type,
        _updatedAt,
        slug,
        "displayName": coalesce(identifiedName, name, title),
        spellSchool,
        armorWeapon,
        areaType,
        bookType,
        type
      }
  }`);

  const data = homePageDataSchema.parse(rawData);
  return {
    recentItems: data.recentItems,
    seo: {
      title: 'TRO-DB',
      description:
        'Your guide to The Realm Online - an epic MMO where magic, monsters, and adventure await. Browse items, spells, mobs, areas, and build your character.'
    }
  };
}) satisfies PageServerLoad;
