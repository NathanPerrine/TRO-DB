import { defineField, defineType } from 'sanity'
import { portableTextBlock } from './portableTextConfig'

export const areas = defineType({
  name: 'area',
  title: 'Area',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: 'Name of the area',
      type: 'string',
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
      name: 'areaType',
      title: 'Area Type',
      description: 'Type of area (e.g., Dungeon, Town, Zone).',
      type: 'string',
      options: {
        list: [
          { title: 'Dungeon', value: 'dungeon' },
          { title: 'Town', value: 'town' },
          { title: 'Zone', value: 'zone' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      description: 'Brief description of the area.',
      type: 'text',
    }),

    defineField({
      name: 'map',
      title: 'Map',
      description: 'Map of the area',
      type: 'text',
      initialValue:
        'Coming soon? Maybe. In the meantime check out the wiki for a rather detailed world map.',
    }),

    defineField({
      name: 'directions',
      title: 'Directions',
      description:
        "Directions to the area, typically from the nearest town's teleporter.",
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'directionEntry',
          title: 'Direction Entry',
          fields: [
            {
              name: 'town',
              title: 'Nearest Town Teleporter',
              type: 'reference',
              to: [{ type: 'area' }],
              weak: true,
              options: {
                filter: `areaType == 'town'`,
                sort: [{ field: 'name', direction: 'asc' }],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'directions',
              title: 'Direction (String)',
              type: 'string',
              description: 'E.g., "1R 8D"',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'town.name',
              subtitle: 'directions',
            },
            prepare(selection) {
              const { title, subtitle } = selection
              return {
                title: title || 'No area selected',
                subtitle: subtitle
                  ? `Directions: ${subtitle}`
                  : 'No directions provided',
              }
            },
          },
        },
      ],
      hidden: ({ parent }) => !['dungeon', 'zone'].includes(parent?.areaType),
    }),

    defineField({
      name: 'walkthrough',
      title: 'Walkthrough',
      description: 'Walkthrough of the dungeon.',
      type: 'array',
      of: [portableTextBlock],
      hidden: ({ parent }) => parent?.areaType !== 'dungeon',
    }),

    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'array',
      of: [portableTextBlock],
    }),

    defineField({
      name: 'mobs',
      title: 'Mobs in this area',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'mob' }] }],
    }),

    defineField({
      name: 'connectedAreas',
      title: 'Connected Areas',
      description: 'All areas that are directly connected to this one.',
      type: 'array',
      of: [{ type: 'reference', weak: true, to: [{ type: 'area' }] }],
    }),
  ],
})
