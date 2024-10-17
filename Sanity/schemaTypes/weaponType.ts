import { defineType, defineField } from 'sanity'

export const weaponType = defineType({
  name: 'weaponType',
  title: 'Weapon Types',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: 'Type of weapon',
      type: 'string',
      options: {
        list: [
          { title: 'Axe', value: 'axe' },
          { title: 'Club', value: 'club' },
          { title: 'Mace', value: 'mace' },
          { title: 'Maul', value: 'maul' },
          { title: 'Two Handed Swords', value: 'two handed sword' },
          { title: 'Dagger', value: 'dagger' },
          { title: 'Throwing Dagger', value: 'throwing dagger' },
          { title: 'Fist', value: 'fist' },
          { title: 'Long Sword', value: 'long sword' },
          { title: 'Short Sword', value: 'short sword' },
        ],
      },
    }),

    defineField({
      name: 'range',
      title: 'Range',
      description: 'Range of this weapon type.',
      type: 'number',
    }),

    defineField({
      name: 'attributeScaling',
      title: 'Attribute Scaling',
      description: 'Primary and secondary attribute scaling',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Attribute Scaling',
          fields: [
            defineField({
              name: 'attribute',
              title: 'Attribute',
              type: 'string',
              options: {
                list: [
                  { title: 'Strength', value: 'strength' },
                  { title: 'Dexterity', value: 'dexterity' },
                  { title: 'Intelligence', value: 'intelligence' },
                  { title: 'Endurance', value: 'endurance' },
                ],
              },
            }),
            defineField({
              name: 'scalingType',
              title: 'Scaling Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Primary', value: 'primary' },
                  { title: 'Splash', value: 'splash' },
                ],
              },
            }),
          ],
          preview: {
            select: {
              attribute: 'attribute',
              scalingType: 'scalingType',
            },
            prepare({ attribute, scalingType }) {
              return {
                title: `${attribute} | ${scalingType}`,
              }
            },
          },
        },
      ],
    }),

    defineField({
      name: 'skill',
      title: 'Skill',
      type: 'string',
      options: {
        list: [
          { title: 'Light Piercing', value: 'light piercing' },
          { title: 'Light One Handed', value: 'light one-handed' },
          { title: 'Light Two Handed', value: 'light two-handed' },
          { title: 'Heavy Two Handed', value: 'heavy two-handed' },
        ],
      },
    }),
  ],
})
