import { GiAncientSword, GiCapeArmor } from 'react-icons/gi'
import { StructureBuilder } from 'sanity/structure'
import { weaponTypes, armorTypes } from './structureHelpers'

export const equipmentList = (S: StructureBuilder) => {
  return S.list()
    .title('Equipment')
    .items([
      S.listItem()
        .title('All')
        .child(
          S.documentTypeList('equipment')
            .title('All Equipment')
            .apiVersion('2024-10-15')
            .filter(`_type == 'equipment'`),
        ),
      S.divider(),
      S.listItem()
        .title('Weapon Types')
        .child(
          S.documentTypeList('weaponType')
            .title('Weapon Types')
            .apiVersion('2024-10-15')
            .filter(`_type == 'weaponType'`),
        ),
      S.divider(),
      S.listItem()
        .title('Weapons')
        .icon(GiAncientSword)
        .child(
          S.list()
            .title('Weapon Types')
            .items([
              S.listItem()
                .title('All')
                .child(
                  S.documentTypeList('equipment')
                    .apiVersion('2024-10-15')
                    .filter(`_type == 'equipment' && armorWeapon == 'weapon'`),
                ),
              S.divider(),
              ...weaponTypes.map((weaponType) =>
                S.listItem()
                  .title(weaponType.title)
                  .child(
                    S.documentTypeList('equipment')
                      .title(weaponType.title)
                      .apiVersion('2024-10-15')
                      .filter(
                        `_type == 'equipment' && armorWeapon == 'weapon' && weaponAttributes.weaponType._ref == '${weaponType.refId}'`,
                      )
                      .initialValueTemplates([
                        S.initialValueTemplateItem('equipment-template', {
                          isWeapon: true,
                          type: weaponType.value,
                        }),
                      ]),
                  ),
              ),
            ]),
        ),
      S.listItem()
        .title('Armors')
        .icon(GiCapeArmor)
        .child(
          S.list()
            .title('Armor Types')
            .items([
              S.listItem()
                .title('All')
                .child(
                  S.documentTypeList('equipment')
                    .apiVersion('2024-10-15')
                    .filter(`_type == 'equipment' && armorWeapon == 'armor'`),
                ),
              S.divider(),
              ...armorTypes.map((armorType) =>
                S.listItem()
                  .title(armorType.title)
                  .child(
                    S.documentTypeList('equipment')
                      .title(armorType.title)
                      .apiVersion('2024-10-15')
                      .filter(
                        `_type == 'equipment' && armorWeapon == 'armor' && armorAttributes.armorType == '${armorType.value}'`,
                      )
                      .initialValueTemplates([
                        S.initialValueTemplateItem('equipment-template', {
                          isWeapon: false,
                          type: armorType.value,
                        }),
                      ]),
                  ),
              ),
            ]),
        ),
    ])
}
