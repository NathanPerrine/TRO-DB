import type { SanityDocument } from '@sanity/client';
import type { Slug } from './slug';

export type Guide = SanityDocument & {
  title: string;
  slug: Slug;
  summary: string;
  category: 'leveling' | 'money making' | 'new player' | 'crafting';
  content: [];
};
