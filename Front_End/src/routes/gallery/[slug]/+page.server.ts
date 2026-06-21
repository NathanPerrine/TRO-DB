import type { PageServerLoad } from './$types';
import { client } from '$lib/utils/sanity/client';
import { error } from '@sveltejs/kit';
import { galleryDetailSchema } from '$lib/schemas/gallery.server';

export const load = (async ({ params }) => {
  const rawData = await client.fetch(
    `*[_type == 'gallery' && slug.current == $slug][0] {
      title,
      slug,
      image,
      alt,
      description,
      category,
      tags,
      relatedEquipment -> {identifiedName, slug, armorWeapon},
      relatedAccessory -> {identifiedName, slug},
      relatedItem -> {name, slug}
    }`,
    { slug: params.slug }
  );


  if (!rawData) {
    throw error(404, 'Image not found');
  }

  const item = galleryDetailSchema.parse(rawData);
  const seo = {
    title: item.title,
    description: item.description ? item.description :
      `${item.title} - ${item.category} image from The Realm Online gallery.`
  }

  return {...item, seo};
}) satisfies PageServerLoad;