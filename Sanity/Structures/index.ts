import type { StructureResolver } from 'sanity/structure'
import { FaBook } from 'react-icons/fa'
import {
  GiLightningTrio,
  GiNinjaArmor,
  GiRing,
  GiSwapBag,
} from 'react-icons/gi'
import { FaRegMap } from 'react-icons/fa'
import { bookList } from './bookList'
import { spellList } from './spellList'
import { itemList } from './itemList'
import { areaList } from './areaList'
import { accessoryList } from './accessoryList'
import { equipmentList } from './equipmentList'

const excludeFromDefault = [
  'item',
  'book',
  'spell',
  'area',
  'accessory',
  'equipment',
  'weaponType',
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
    ])
