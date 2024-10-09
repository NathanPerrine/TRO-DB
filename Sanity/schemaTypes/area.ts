import { defineField, defineType } from "sanity";

export const areas = defineType({
  name: 'area',
  title: 'Area',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Name of the area',
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
      type: 'string',
      description: 'Type of area (e.g., Dungeon, Town, Overworld).',
      options: {
        list: [
          { title: 'Dungeon', value: 'dungeon' },
          { title: 'Town', value: 'town' },
          { title: 'Overworld', value: 'overworld' },
        ],
        layout: 'dropdown',
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description of the area.',
    }),

    defineField({
      name: 'directions',
      title: 'Directions',
      type: 'string',
      description: 'Directions to the area, typically from the nearest towns teleporter.',
    }),

    defineField({
      name: 'walkthrough',
      title: 'Walkthrough',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Walkthrough of the dungeon.',
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
      type: 'array',
      description: 'Notable or Unique drops to this area.',
      of: [{ type: 'reference', to: [{ type: 'item' }, { type: 'book' }]}],
      hidden: ({ parent }) => !['dungeon', 'overworld'].includes(parent?.areaType),
    }),

    defineField({
      name: 'monsters',
      title: 'Monsters in this area',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'mob' }] }]
    }),

    defineField({
      name: 'connectedAreas',
      title: 'Connected Areas',
      type: 'array',
      description: 'Areas that are directly connected to this one.',
      of: [{ type: 'reference', to: [{ type: 'area' }]}]
    })
  ]
})