import { StructureBuilder } from 'sanity/structure'

const newsCategories = [
  { title: 'Game Update', value: 'game update' },
  { title: 'Site Update', value: 'site update' },
  { title: 'Community', value: 'community' },
  { title: 'Announcement', value: 'announcement' },
]

export const newsList = (S: StructureBuilder) => {
  return S.list()
    .title('News by Category')
    .items([
      S.listItem()
        .title('All')
        .child(
          S.documentTypeList('news')
            .title('All News')
            .apiVersion('2024-10-15')
            .filter(`_type == 'news'`),
        ),
      S.divider(),
      ...newsCategories.map((category) =>
        S.listItem()
          .title(category.title)
          .child(
            S.documentTypeList('news')
              .title(`${category.title}`)
              .apiVersion('2024-10-15')
              .filter(
                `_type == 'news' && category == '${category.value}'`,
              ),
          ),
      ),
    ])
}
