import { StructureBuilder } from 'sanity/structure'

const guideCategories = [
  { title: 'Leveling', value: 'leveling' },
  { title: 'Money Making', value: 'money making' },
  { title: 'New Player', value: 'new player' },
  { title: 'Enchanting and Crafting', value: 'enchanting and crafting' },
  { title: 'Other', value: 'other' },
]

export const guideList = (S: StructureBuilder) => {
  return S.list()
    .title('Guides by Category')
    .items([
      S.listItem()
        .title('All')
        .child(
          S.documentTypeList('guide')
            .title('All Guides')
            .apiVersion('2024-10-15')
            .filter(`_type == 'guide'`),
        ),
      S.divider(),
      ...guideCategories.map((category) =>
        S.listItem()
          .title(category.title)
          .child(
            S.documentTypeList('guide')
              .title(`${category.title} Guides`)
              .apiVersion('2024-10-15')
              .filter(
                `_type == 'guide' && category == '${category.value}'`,
              ),
          ),
      ),
    ])
}
