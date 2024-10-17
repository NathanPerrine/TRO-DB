import { StructureBuilder } from 'sanity/structure'
import { itemTypes } from './structureHelpers'

export const itemList = (S: StructureBuilder) => {
  return S.list()
    .title('Items')
    .items([
      S.listItem()
        .title('All')
        .child(
          S.documentTypeList('item')
            .title('All Items')
            .apiVersion('2024-10-15')
            .filter(`_type == 'item'`),
        ),
      S.divider(),
      ...itemTypes.map((itemType) =>
        S.listItem()
          .title(`${itemType.title}`)
          .icon(itemType.icon)
          .child(
            S.documentTypeList('item')
              .title(`${itemType.title}`)
              .apiVersion('2024-10-15')
              .filter(`_type == 'item' && type match '${itemType.value}'`)
              .initialValueTemplates([
                S.initialValueTemplateItem('item-template', {
                  itemType: itemType.value,
                }),
              ]),
          ),
      ),
    ])
}
