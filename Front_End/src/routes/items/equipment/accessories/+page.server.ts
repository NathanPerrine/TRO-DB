import type { Accessory, Description } from '$lib';
import { client } from '$lib/utils/sanity/client';
import type { PageServerLoad } from './$types';

export const load = (async () => {
  type data = {
    description: Description;
    accessories: Accessory[];
  };

  interface AccessoriesBySlot {
    [key: string]: Accessory[];
  }

  const data = await client.fetch(`{
    'description': *[_type == 'description' && name match 'accessories'][0]{
      name,
      description,
      extras
    },

    'accessories': *[_type == 'accessory'] {
      name,
      identifiedName,
      slug,
      slot,
      rarity,
      levelRequirement,
      attributes,
      dropArea[]->{name, slug, areaType}
    }
  }`);

  const accessoriesBySlot = data.accessories.reduce(
    (acc: AccessoriesBySlot, accessory: Accessory) => {
      const slot = accessory.slot;
      if (!acc[slot]) {
        acc[slot] = [];
      }
      acc[slot].push(accessory);
      return acc;
    },
    {}
  );

  return {
    description: data.description,
    accessories: accessoriesBySlot
  };
}) satisfies PageServerLoad;
