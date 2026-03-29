import { z } from 'zod';
import { client } from '$lib/utils/sanity/client';
import { shopListItemSchema } from '$lib/schemas/shop.server';
import type { PageServerLoad } from './$types';
import { portableTextProjection } from '$lib/utils/sanity/portableTextProjection';
import { descriptionSchema } from '$lib/schemas/common.server';

export const load = (async () => {
  const rawData = await client.fetch(`
    {
    'description': *[_type == 'description' && name match 'shops'][0]{
      name,
      description${portableTextProjection},
      extras${portableTextProjection},
    },

    'shops': *[_type == 'shop'] | order(name asc) {
      name,
      slug,
      directions[]{
        town->{name, slug},
        directions,
      },
      inventoryType,
      locations[]->{name, slug, areaType},
      }
    }
  `)

  const shopPageDataSchema = z.object({
    description: descriptionSchema,
    shops: z.array(shopListItemSchema),
  });

  const data = shopPageDataSchema.parse(rawData);

  const seo = {
    title: 'Shops of The Realm Online',
    description: "Need help finding a specific shop? Browse the shops from across The Realm. Find for directions, locations, and inventory for every vendor."
  }

  return {
    description: data.description,
    shops: data.shops,
    seo: seo,
  };
}) satisfies PageServerLoad;