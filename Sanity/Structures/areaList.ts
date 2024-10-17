import { StructureBuilder } from 'sanity/structure'
import { areaTypes } from './structureHelpers'

export const areaList = (S: StructureBuilder) => {
  return S.list()
    .title('Areas')
    .items(
      areaTypes.map((area) =>
        S.listItem()
          .title(area.title)
          .icon(area.icon)
          .child(
            S.documentTypeList('area')
              .title(`${area.title}`)
              .apiVersion('2024-10-15')
              .filter(`_type == 'area' && areaType == '${area.value}'`)
              .initialValueTemplates([
                S.initialValueTemplateItem('area-template', {
                  areaType: area.value,
                }),
              ]),
          ),
      ),
    )
}
