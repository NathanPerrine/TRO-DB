import { defineField, defineType } from 'sanity'
import {
  ConditionHelper,
  DescriptionHelper,
  WeightHelper,
} from './AccessoryHelperComponent'

export const accessories = defineType({
  name: 'accessory',
  title: 'Accessory',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: 'The name of the accessory.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'identifiedName',
      title: 'Name (Identified)',
      description: 'The name of the accessory once identified.',
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
      validation: (rule) =>
        rule.required().error('Must generate a slug for navigation.'),
    }),

    defineField({
      name: 'slot',
      title: 'Slot',
      description: 'Where the accessory is equipped.',
      type: 'string',
      options: {
        list: [
          { title: 'Amulet', value: 'amulet' },
          { title: 'Backpack', value: 'backpack' },
          { title: 'Baldric', value: 'baldric' },
          { title: 'Belt', value: 'belt' },
          { title: 'Ring', value: 'ring' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'rarity',
      title: 'Rarity',
      description: 'Rarity level of the accessory.',
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
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      description:
        'Unidentified description of the accessory. Note: This field will automatically update if you change the accessory slot.',
      type: 'text',
      rows: 4,
      components: {
        input: DescriptionHelper,
      },
    }),
    defineField({
      name: 'identifiedDescription',
      title: 'Description (Identified)',
      description: 'Description of the accessory once identified.',
      type: 'text',
      rows: 4,
    }),

    defineField({
      name: 'attributes',
      title: 'Attributes',
      description: 'List of bonuses provided by the accessory',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'armor',
      title: 'Armor',
      description: 'Armor provided by the belt.',
      type: 'number',
      hidden: ({ parent }) => parent?.slot !== 'belt',
      initialValue: 10,
    }),

    defineField({
      name: 'weight',
      title: 'Weight',
      description: 'Weight of the accessory.',
      type: 'number',
      components: {
        input: WeightHelper,
      },
    }),
    defineField({
      name: 'condition',
      title: 'Condition',
      description: 'Current condition of the accessory.',
      type: 'number',
      components: {
        input: ConditionHelper,
      },
    }),

    defineField({
      name: 'sellPrice',
      title: 'Sell Price',
      description: 'Sell price of the accessory.',
      type: 'number',
    }),

    defineField({
      name: 'levelRequirement',
      title: 'Level Requirement',
      description: 'Required level to equip the accessory.',
      type: 'number',
      initialValue: 0,
    }),

    defineField({
      name: 'dropArea',
      title: 'Drop Area',
      description: 'Where this accessory can be found.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'area' }],
          options: {
            filter: 'areaType == $type1 || areaType == $type2',
            filterParams: {
              type1: 'dungeon',
              type2: 'zone',
            },
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
      title: 'identifiedName',
      slot: 'slot',
      rarity: 'rarity',
    },
    prepare({ title, slot, rarity }) {
      return {
        title: title,
        subtitle: `${slot} | ${rarity}`,
      }
    },
  },
  orderings: [
    {
      title: 'Slot',
      name: 'slot',
      by: [
        { field: 'slot', direction: 'asc' },
        { field: 'identifiedName', direction: 'asc' },
      ],
    },
  ],
})
