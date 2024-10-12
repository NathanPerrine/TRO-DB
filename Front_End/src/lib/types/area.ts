import type { Book } from './book'
import type { Item } from './item'
import type { Mob } from './mob'
import type { Slug } from './slug'


export type Area = {
  name: string,
  slug: Slug,
  areaType: 'dungeon' | 'town' | 'zone',
  description?: string,
  map?: string,
  directions?: string[],
  walkthrough?: [],
  notes?: [],
  // Need to reconfigure notableDrops. Likely will be an object of notableDrops: {items, books, equipment}
  // notableDrops?: Pick<Item, 'name' | 'slug'> | Pick<Book, 'name' | 'slug'>,
  mobs?: Pick<Mob, 'name' | 'slug' | 'levelRange' | 'hpRange' | 'boss'>[],
  connectedAreas?: Area[],
}