import type { PageServerLoad } from './$types';
import { client } from '$lib/utils/sanity/client';
import { galleryListItemSchema } from '$lib/schemas/gallery.server';
import { descriptionSchema } from '$lib/schemas/common.server';
import { resolveCategoryFilter } from '$lib/utils/galleryCategories';
import { portableTextProjection } from '$lib/utils/sanity/portableTextProjection';
import { z } from 'zod';

export const load = (async ({ url }) => {
  const categoryParam = url.searchParams.get('category') ?? 'all';
  const category = resolveCategoryFilter(categoryParam)

  const limit = 8; // Items per page
  const pageNum = Math.max(1, Number(url.searchParams.get('page')) || 1);
  const start = (pageNum - 1) * limit;
  const end = pageNum * limit;

  const sortOptions: Record<string, string> = {
    newest: 'order(_createdAt desc)',
    oldest: 'order(_createdAt asc)',
    title: 'order(title asc)',
    category: 'order(category asc, title asc)',
  };

  const sortParam = url.searchParams.get('sort') ?? 'newest';
  const orderClause = sortOptions[sortParam] ?? sortOptions.newest;


  const rawData = await client.fetch(
    `{
      'description': *[_type == 'description' && name match 'gallery'][0] {
        name,
        description${portableTextProjection},
        extras${portableTextProjection}
      },
      'gallery': *[_type == 'gallery' && category in $categories] | ${orderClause} [$start...$end] {
        title,
        slug,
        image,
        alt,
        category
      },
      'total': count(*[_type == 'gallery' && category in $categories])
    }`,
    {
      categories: category,
      start: start,
      end: end,
    }
  )

    const description = descriptionSchema.nullable().parse(rawData.description);
    const gallery = z.array(galleryListItemSchema).parse(rawData.gallery)
    const total = rawData.total;
    const totalPages = Math.ceil(rawData.total / limit);

    return {
      description,
      gallery,
      total,
      totalPages,
      pageNum,
      categoryParam,
      sortParam,
      limit,
    };
}) satisfies PageServerLoad;