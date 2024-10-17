import { Template } from 'sanity'

interface EquipmentProps {
  isWeapon: boolean
  type: string
}

const weaponIds: Record<string, string> = {
  club: '172576e9-f5c9-4c63-80cb-53133999a884',
  'long sword': '20ec3f4a-7941-49e2-8812-d6fce43e703b',
  'two handed sword': '2262dac8-0a83-47f4-93cd-dd1cee8214a4',
  mace: '58b13bb9-4155-4a96-9445-3f8c99a640a5',
  axe: '69ddf126-720f-49e7-adb8-208de7173f83',
  dagger: '86cbef31-6ed8-49c5-b323-b9f7b56fd279',
  'throwing dagger': '9457eefc-553e-421a-af1b-5ec8153d1af3',
  maul: 'a7604c90-59c9-4273-ba5e-9925ccff86ea',
  fist: 'a84d3ca0-9ae3-4aae-b581-8cfda359414e',
  'short sword': 'dc158b3c-d9fc-4471-8aef-1c21064dfc74',
}

export const equipmentTemplate: Template = {
  id: 'equipment-template',
  title: 'Equipment Template',
  schemaType: 'equipment',
  value: (props: EquipmentProps) => ({
    ...(props?.isWeapon
      ? {
          armorWeapon: 'weapon',
          weaponAttributes: {
            weaponType: {
              _type: 'reference',
              _ref: weaponIds[props?.type] || '',
            },
          },
        }
      : {
          armorWeapon: 'armor',
          armorAttributes: {
            armorType: props?.type || '',
          },
        }),
  }),
}
