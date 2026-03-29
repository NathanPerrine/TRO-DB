import { client } from '$lib/utils/sanity/client';
import { shopDetailSchema } from '$lib/schemas/shop.server';
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
  const rawData = await client.fetch(`
    *[_type == 'shop' && slug.current == $slug][0]{
      name,
      slug,
      directions[]{town->{name, slug}, directions},
      description,
      locations[]->{name, slug, areaType},
      inventoryType,
      inventory[]{
        category,
        items[]->{
          _type,
          name,
          slug,
          buyPrice,
          sellPrice,
          // books
          bookType,
          skill,
          skillLevel,
          buildPoints,
          linkedSpell->{title, slug, spellSchool},
          // items
          type,
          description,
          descriptionIdentified,
          weight,
          condition,
          charges,
          // equipment-specific
          identifiedName,
          identifiedDescription,
          rarity,
          armorWeapon,
          attributes,
          levelRequirement,
          excludes,
          armorAttributes,
          weaponAttributes{
            damage,
            weaponType->{name, range, skill, attributeScaling}
          },
          dropArea[]->{name, slug, areaType},
          // accessory-specific
          slot
        }
      },

      "npc": *[_type == "npc" && shop._ref == ^._id][0]{ name, slug, location->{
        name, slug } }
    }`,
    { slug: params.slug }
  );

  if (!rawData) {
    throw error(404, 'Shop not found');
  }

  const shop = shopDetailSchema.parse(rawData);
  const seo = {
    title: shop.name,
    description: shop.description ? shop.description : 'Detailed information about ' + shop.name,
  }

    return { ...shop, seo };
}) satisfies PageServerLoad;