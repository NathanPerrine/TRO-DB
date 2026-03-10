import type { StructureResolver } from 'sanity/structure'
import {
  FaBook,
  FaImages,
  FaNewspaper,
  FaStore,
  FaUser,
  FaUserTie,
} from 'react-icons/fa'
import {
  GiBookmarklet,
  GiLightningTrio,
  GiNinjaArmor,
  GiRing,
  GiScrollQuill,
  GiSwapBag,
} from 'react-icons/gi'
import { FaRegMap } from 'react-icons/fa'
import { bookList } from './bookList'
import { spellList } from './spellList'
import { itemList } from './itemList'
import { areaList } from './areaList'
import { accessoryList } from './accessoryList'
import { equipmentList } from './equipmentList'
import { galleryList } from './galleryList'
import { guideList } from './guideList'
import { newsList } from './newsList'

const excludeFromDefault = [
  'item',
  'book',
  'spell',
  'area',
  'accessory',
  'equipment',
  'weaponType',
  'gallery',
  'shop',
  'npc',
  'guide',
  'news',
  'quest',
  'author',
]

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId()
        return id && !excludeFromDefault.includes(id)
      }),
      S.divider(),
      S.documentTypeListItem('item')
        .title('Items')
        .icon(GiSwapBag)
        .child(itemList(S)),
      S.documentTypeListItem('book')
        .title('Books')
        .icon(FaBook)
        .child(bookList(S)),
      S.documentTypeListItem('accessory')
        .title('Accessories')
        .icon(GiRing)
        .child(accessoryList(S)),
      S.documentTypeListItem('equipment')
        .title('Equipment')
        .icon(GiNinjaArmor)
        .child(equipmentList(S)),
      S.divider(),
      S.documentTypeListItem('spell')
        .title('Spells')
        .icon(GiLightningTrio)
        .child(spellList(S)),
      S.divider(),
      S.documentTypeListItem('area')
        .title('Areas')
        .icon(FaRegMap)
        .child(areaList(S)),
      S.documentTypeListItem('npc')
        .title('NPCs')
        .icon(FaUserTie),
      S.documentTypeListItem('shop')
        .title('Shops')
        .icon(FaStore),
      S.divider(),
      S.documentTypeListItem('guide')
        .title('Guides')
        .icon(GiBookmarklet)
        .child(guideList(S)),
      S.documentTypeListItem('news')
        .title('News')
        .icon(FaNewspaper)
        .child(newsList(S)),
      S.documentTypeListItem('quest')
        .title('Quest Guides')
        .icon(GiScrollQuill),
      S.documentTypeListItem('author')
        .title('Authors')
        .icon(FaUser),
      S.divider(),
      S.documentTypeListItem('gallery')
        .title('Gallery')
        .icon(FaImages)
        .child(galleryList(S)),
    ])
