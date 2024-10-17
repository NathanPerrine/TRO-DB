import { StructureBuilder } from 'sanity/structure'
import { accessoryTypes } from './structureHelpers'

export const accessoryList = (S: StructureBuilder) => {
  return S.list()
    .title('Accessories')
    .items([
      S.listItem()
        .title('All')
        .child(
          S.documentTypeList('accessory')
            .title('All Accessories')
            .apiVersion('2024-10-15')
            .filter(`_type == 'accessory'`),
        ),
      S.divider(),
      ...accessoryTypes.map((accessoryType) =>
        S.listItem()
          .title(`${accessoryType.title}`)
          .icon(accessoryType.icon)
          .child(
            S.documentTypeList('accessory')
              .title(`${accessoryType.title}`)
              .apiVersion('2024-10-15')
              .filter(
                `_type == 'accessory' && slot match '${accessoryType.value}'`,
              )
              .initialValueTemplates([
                S.initialValueTemplateItem('accessory-template', {
                  slot: accessoryType.value,
                }),
              ]),
          ),
      ),
    ])
}
