import type { StructureResolver } from 'sanity/structure'
import { FaBook } from 'react-icons/fa'
import {
  GiAncientSword,
  GiAxolotl,
  GiLightningTrio,
  GiSwapBag,
} from 'react-icons/gi'
import { FaRegMap } from 'react-icons/fa'
import { bookList } from './bookList'
import { spellList } from './spellList'
import { itemList } from './itemList'
import { areaList } from './areaList'

const excludeFromDefault = ['item', 'book', 'spell', 'area']

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
