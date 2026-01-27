import { defineType, defineField } from 'sanity'
import { portableTextBlock } from './portableTextConfig'

const npcTypes = [
  { title: 'Shopkeeper', value: 'shopkeeper' },
  { title: 'Gatekeeper', value: 'gatekeeper' },
]

export const npc = defineType({
  name: 'npc',
  title: 'NPC',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: 'Name of the NPC.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      validation: (Rule) =>
        Rule.required().error('Must generate a slug for navigation.'),
    }),

    defineField({
      name: 'npcType',
      title: 'NPC Type',
      description: 'The role of this NPC.',
      type: 'string',
      options: {
        list: npcTypes,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      description: 'A description of the NPC.',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'location',
      title: 'Location',
      description: 'The town where this NPC is found.',
      type: 'reference',
      to: [{ type: 'area' }],
      weak: true,
      options: {
        filter: `areaType == 'town'`,
        sort: [{ field: 'name', direction: 'asc' }],
      },
    }),

    defineField({
      name: 'shop',
      title: 'Shop',
      description: 'The shop this NPC runs.',
      type: 'reference',
      to: [{ type: 'shop' }],
      weak: true,
      hidden: ({ parent }) => parent?.npcType !== 'shopkeeper',
    }),

    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'object',
      options: { collapsible: true, collapsed: false, columns: 3 },
      fields: [
        defineField({
          name: 'level',
          title: 'Level',
          type: 'number',
        }),
        defineField({
          name: 'hp',
          title: 'HP',
          type: 'number',
        }),
        defineField({
          name: 'alignment',
          title: 'Alignment',
          type: 'string',
          options: { list: ['Good', 'Evil', 'Neutral'] },
        }),
      ],
    }),

    defineField({
      name: 'emotes',
      title: 'Emotes',
      description: 'The emotes this NPC can perform.',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'array',
      of: [portableTextBlock],
    }),
  ],
  preview: {
    select: {
      name: 'name',
      npcType: 'npcType',
      location: 'location.name',
    },
    prepare({ name, npcType, location }) {
      const typeLabel = npcTypes.find((t) => t.value === npcType)?.title
      return {
        title: name,
        subtitle: [typeLabel, location].filter(Boolean).join(' — '),
      }
    },
  },
  orderings: [
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Type',
      name: 'typeAsc',
      by: [{ field: 'npcType', direction: 'asc' }],
    },
  ],
})
