import type { FullSpell, Slug } from "$lib/index"

export type Book = {
  name: string,
  slug: Slug,
  bookType: 'skillbook' | 'spellbook',
  skill: string,
  skillLevel: 'familiar' | 'proficient' | 'expert' | 'master' | 'grandmaster' | 'supreme-master',
  description: string,
  weight?: number,
  condition?: number,
  buyPrice?: number,
  sellPrice?: number,
  linkedSpell?: FullSpell,
  buildPoints?: number,
}