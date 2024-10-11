import { defineField, defineType } from "sanity";

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
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .slice(0, 200)
      },
      validation: rule => rule
        .required()
        .error('Must generate a slug for navigation.')
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
      validation: Rule => Rule.required(),
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
      initialValue: 'Coming soon...'
    }),

    defineField({
      name: 'directions',
      title: 'Directions',
      description: 'Directions to the area, typically from the nearest towns teleporter.',
      type: 'array',
      of: [{ type: 'string' }],
      hidden: ({ parent }) => !['dungeon', 'overworld'].includes(parent?.areaType),
    }),

    defineField({
      name: 'walkthrough',
      title: 'Walkthrough',
      description: 'Walkthrough of the dungeon.',
      type: 'array',
      of: [{type: 'block'}],
      hidden: ({ parent }) => parent?.areaType !== 'dungeon'
    }),

    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'array',
      of: [{type: 'block'}]
    }),

    defineField({
      name: 'notableDrops',
      title: 'Notable Drops',
      description: 'Notable or Unique drops to this area.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'item' }, { type: 'book' }]}],
      hidden: ({ parent }) => !['dungeon', 'overworld'].includes(parent?.areaType),
    }),

    defineField({
      name: 'mobs',
      title: 'Mobs in this area',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'mob' }] }]
    }),

    defineField({
      name: 'connectedAreas',
      title: 'Connected Areas',
      description: 'All areas that are directly connected to this one.',
      type: 'array',
      of: [{ type: 'reference', weak: true, to: [{ type: 'area' }]}]
    })
  ]
})