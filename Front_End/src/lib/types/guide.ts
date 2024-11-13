import type { SanityDocumentProps } from './sanityDocumentProps';
import type { Slug } from './slug';

export type Guide = SanityDocumentProps & {
  title: string;
  slug: Slug;
  author: string;
  summary: string;
  category: 'leveling' | 'money making' | 'new player' | 'crafting';
  content: [];
};
