import type { PageServerLoad } from './$types';
import type { Accessory } from '$lib';
import { client } from '$lib/utils/sanity/client';

export const load = (async ({ params }) => {
  return {};
}) satisfies PageServerLoad;
