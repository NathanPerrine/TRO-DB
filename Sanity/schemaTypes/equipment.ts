import { defineType, defineField } from 'sanity'

export const equipment = defineType({
  name: 'equipment',
  title: 'Equipment',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: 'The name of the equipment piece before identification.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'identifiedName',
      title: 'Identified Name',
      description: 'The name displayed when the equipment is identified.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'identifiedName',
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      validation: (Rule) =>
        Rule.required().error('Must generate a slug for navigation.'),
    }),

    defineField({
      name: 'armorWeapon',
      title: 'Armor or Weapon',
      description: 'Is this equipment a piece of armor or a weapon?',
      type: 'string',
      options: {
        list: [
          { title: 'Armor', value: 'armor' },
          { title: 'Weapon', value: 'weapon' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'rarity',
      title: 'Rarity',
      type: 'string',
      options: {
        list: [
          { title: 'White', value: 'white' },
          { title: 'Green', value: 'green' },
          { title: 'Blue', value: 'blue' },
          { title: 'Purple', value: 'purple' },
          { title: 'Orange', value: 'orange' },
          { title: 'Red', value: 'red' },
        ],
      },
    }),

    defineField({
      name: 'description',
      title: 'Description',
      description:
        'A brief description of the equipment before identification.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'identifiedDescription',
      title: 'Identified Description',
      description: 'Description displayed when the equipment is identified.',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'attributes',
      title: 'Attributes',
      description:
        'Special attributes or bonuses provided by the equipment. Damage bonuses, spell resistances, etc.',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'weaponAttributes',
      title: 'Weapon Attributes',
      description: 'Weapon specific attributes',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: false,
        columns: 2,
      },
      fields: [
        defineField({
          name: 'damage',
          title: 'Damage',
          description: 'Damage range of the weapon.',
          type: 'object',
          options: {
            columns: 2,
          },
          fields: [
            defineField({
              name: 'min',
              title: 'Min',
              type: 'number',
            }),
            defineField({
              name: 'max',
              title: 'Max',
              type: 'number',
            }),
          ],
        }),
        defineField({
          name: 'weaponType',
          title: 'Weapon Type',
          description: 'Type of weapon',
          type: 'reference',
          to: [{ type: 'weaponType' }],
        }),
      ],
      hidden: ({ parent }) => parent?.armorWeapon !== 'weapon',
    }),

    defineField({
      name: 'armorAttributes',
      title: 'Armor Attributes',
      description: 'Armor specific attributes',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: false,
        columns: 3,
      },
      fields: [
        defineField({
          name: 'armorType',
          title: 'Armor Type',
          description: 'Which slot this equipment takes.',
          type: 'string',
          options: {
            list: [
              { title: 'Helm', value: 'helm' },
              { title: 'Cowl', value: 'cowl' },
              { title: 'Chest', value: 'chest' },
              { title: 'Robe', value: 'robe' },
              { title: 'Wrists', value: 'wrists' },
              { title: 'Skirt', value: 'skirt' },
              { title: 'Legs', value: 'legs' },
              { title: 'Feet', value: 'feet' },
              { title: 'Shield', value: 'shield' },
            ],
          },
        }),
        defineField({
          name: 'material',
          title: 'Material',
          description: 'The material of the armor.',
          type: 'string',
          options: {
            list: [
              { title: 'Cloth', value: 'cloth' },
              { title: 'Leather', value: 'leather' },
              { title: 'Chain Mail', value: 'chain mail' },
              { title: 'Plate Mail', value: 'plate mail' },
            ],
          },
        }),
        defineField({
          name: 'armorRating',
          title: 'Armor Rating',
          description: 'The defensive value of the armor.',
          type: 'number',
        }),
      ],
      hidden: ({ parent }) => parent?.armorWeapon !== 'armor',
    }),

    defineField({
      name: 'weight',
      title: 'Weight',
      description: 'The weight of the equipment.',
      type: 'number',
    }),

    defineField({
      name: 'condition',
      title: 'Condition',
      description: 'The max condition of the equipment.',
      type: 'number',
    }),

    defineField({
      name: 'sellPrice',
      title: 'Sell Price',
      description: 'The price at which the equipment can be sold.',
      type: 'number',
    }),

    defineField({
      name: 'levelRequirement',
      title: 'Level Requirement',
      description:
        'The minimum level required to equip this piece of equipment.',
      type: 'number',
    }),

    defineField({
      name: 'excludes',
      title: 'Excludes',
      description: 'Any restrictions on who can equip the armor.',
      type: 'string',
      options: {
        list: ['Males', 'Females'],
      },
      hidden: ({ parent }) => ['weapon'].includes(parent?.armorWeapon),
    }),

    defineField({
      name: 'dropArea',
      title: 'Drop Area',
      description: 'The area where this equipment can be found or obtained.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'area' }],
          options: {
            filter: `areaType == 'dungeon' || areaType == 'zone'`,
            sort: [{ field: 'name', direction: 'asc' }],
          },
        },
      ],
    }),

    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
  preview: {
    select: {
      name: 'identifiedName',
    },
    prepare({ name }) {
      return {
        title: name,
      }
    },
  },
})
