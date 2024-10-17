import { StructureBuilder } from 'sanity/structure'
import { skillLevels, skills } from './structureHelpers'

export const bookList = (S: StructureBuilder) => {
  return S.list()
    .title('Books by Skill')
    .items(
      skills.map((skill) =>
        S.listItem()
          .title(skill.title)
          .child(
            S.list()
              .title(`${skill.title} Books`)
              .items([
                S.listItem()
                  .title(`All`)
                  .child(
                    S.documentTypeList('book')
                      .title(`All ${skill.title} Books`)
                      .apiVersion('2024-10-15')
                      .filter(
                        `_type == 'book' && skill match '${skill.value}'`,
                      ),
                  ),
                S.divider(),
                ...skillLevels.map((skillLevel) =>
                  S.listItem()
                    .title(skillLevel.title)
                    .child(
                      S.documentTypeList('book')
                        .title(`${skill.title} - ${skillLevel.title}`)
                        .apiVersion('2024-10-15')
                        .filter(
                          `_type == 'book' && skill match '${skill.value}' && skillLevel == '${skillLevel.value}'`,
                        )
                        .initialValueTemplates([
                          S.initialValueTemplateItem('book-template', {
                            skill: skill.value,
                            skillLevel: skillLevel.value,
                          }),
                        ]),
                    ),
                ),
              ]),
          ),
      ),
    )
}
