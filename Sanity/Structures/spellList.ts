import { StructureBuilder } from 'sanity/structure'
import { magicSkills, skillLevels } from './structureHelpers'

export const spellList = (S: StructureBuilder) => {
  return S.list()
    .title('Spells by School')
    .items(
      magicSkills.map((skill) =>
        S.listItem()
          .title(skill.title)
          .child(
            S.list()
              .title('Skill Level')
              .items([
                S.listItem()
                  .title('All')
                  .child(
                    S.documentTypeList('spell')
                      .title(`All ${skill.title} spells`)
                      .apiVersion('2024-10-15')
                      .filter(
                        `_type == 'spell' && spellSchool match '${skill.value}'`,
                      ),
                  ),
                S.divider(),
                ...skillLevels.map((skillLevel) =>
                  S.listItem()
                    .title(skillLevel.title)
                    .child(
                      S.documentTypeList('spell')
                        .title(`${skillLevel.title}`)
                        .apiVersion('2024-10-15')
                        .filter(
                          `_type == 'spell' && spellSchool match '${skill.value}' && level == '${skillLevel.value}'`,
                        )
                        .initialValueTemplates([
                          S.initialValueTemplateItem('spell-template', {
                            spellSchool: skill.value,
                            level: skillLevel.value,
                          }),
                        ]),
                    ),
                ),
              ]),
          ),
      ),
    )
}
