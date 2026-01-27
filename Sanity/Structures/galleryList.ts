import { GiAncientSword, GiCapeArmor, GiNecklace } from 'react-icons/gi'
import { FaCamera, FaPaintBrush } from 'react-icons/fa'
import { StructureBuilder } from 'sanity/structure'
import { galleryCategories } from './structureHelpers'

const equipmentCategories = galleryCategories.filter(
  (c) => c.group === 'equipment'
)
const accessoryCategories = galleryCategories.filter(
  (c) => c.group === 'accessory'
)

export const galleryList = (S: StructureBuilder) => {
  return S.list()
    .title('Gallery')
    .items([
      S.listItem()
        .title('All')
        .child(
          S.documentTypeList('gallery')
            .title('All Gallery Images')
            .apiVersion('2024-10-15')
            .filter(`_type == 'gallery'`)
        ),
      S.divider(),
      // Dyes
      S.listItem()
        .title('Dyes')
        .icon(FaPaintBrush)
        .child(
          S.documentTypeList('gallery')
            .title('Dyes')
            .apiVersion('2024-10-15')
            .filter(`_type == 'gallery' && category == 'dyes'`)
            .initialValueTemplates([
              S.initialValueTemplateItem('gallery-template', {
                category: 'dyes',
              }),
            ])
        ),
      S.divider(),
      // Equipment (nested)
      S.listItem()
        .title('Equipment')
        .icon(GiAncientSword)
        .child(
          S.list()
            .title('Equipment Categories')
            .items([
              S.listItem()
                .title('All')
                .child(
                  S.documentTypeList('gallery')
                    .title('All Equipment Images')
                    .apiVersion('2024-10-15')
                    .filter(
                      `_type == 'gallery' && category in ${JSON.stringify(equipmentCategories.map((c) => c.value))}`
                    )
                ),
              S.divider(),
              ...equipmentCategories.map((cat) =>
                S.listItem()
                  .title(cat.title)
                  .child(
                    S.documentTypeList('gallery')
                      .title(cat.title)
                      .apiVersion('2024-10-15')
                      .filter(`_type == 'gallery' && category == '${cat.value}'`)
                      .initialValueTemplates([
                        S.initialValueTemplateItem('gallery-template', {
                          category: cat.value,
                        }),
                      ])
                  )
              ),
            ])
        ),
      // Accessories (nested)
      S.listItem()
        .title('Accessories')
        .icon(GiNecklace)
        .child(
          S.list()
            .title('Accessory Categories')
            .items([
              S.listItem()
                .title('All')
                .child(
                  S.documentTypeList('gallery')
                    .title('All Accessory Images')
                    .apiVersion('2024-10-15')
                    .filter(
                      `_type == 'gallery' && category in ${JSON.stringify(accessoryCategories.map((c) => c.value))}`
                    )
                ),
              S.divider(),
              ...accessoryCategories.map((cat) =>
                S.listItem()
                  .title(cat.title)
                  .child(
                    S.documentTypeList('gallery')
                      .title(cat.title)
                      .apiVersion('2024-10-15')
                      .filter(`_type == 'gallery' && category == '${cat.value}'`)
                      .initialValueTemplates([
                        S.initialValueTemplateItem('gallery-template', {
                          category: cat.value,
                        }),
                      ])
                  )
              ),
            ])
        ),
      S.divider(),
      // Screenshots
      S.listItem()
        .title('Screenshots')
        .icon(FaCamera)
        .child(
          S.documentTypeList('gallery')
            .title('Screenshots')
            .apiVersion('2024-10-15')
            .filter(`_type == 'gallery' && category == 'screenshots'`)
            .initialValueTemplates([
              S.initialValueTemplateItem('gallery-template', {
                category: 'screenshots',
              }),
            ])
        ),
      // Other
      S.listItem()
        .title('Other')
        .child(
          S.documentTypeList('gallery')
            .title('Other')
            .apiVersion('2024-10-15')
            .filter(`_type == 'gallery' && category == 'other'`)
            .initialValueTemplates([
              S.initialValueTemplateItem('gallery-template', {
                category: 'other',
              }),
            ])
        ),
    ])
}
