import { defineField, defineType } from "sanity";

export const items = defineType({
  name: 'item',
  title: 'Item',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Name of the item.',
      validation: Rule => Rule.required(),
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
        .error('Must generat a slug for navigation.')
    }),

    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      description: 'Please add the type of item this is.',
      options: {
        list: [
          { title: 'Junk', value: 'junk' },
          { title: 'Potion', value: 'potion' },
          { title: 'Elixir', value: 'elixir' },
          { title: 'Bauble', value: 'bauble' },
          { title: 'Scroll', value: 'scroll' },
          { title: 'Wand', value: 'wand' },
          { title: 'Orb', value: 'orb' },
          { title: 'Dungeon', value: 'dungeon' },
        ],
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'A brief description of the item.',
    }),

    defineField({
      name: 'descriptionIdentified',
      title: 'Description (Identified)',
      type: 'text',
      rows: 3,
      description: 'Description of the item once identified (e.g. You see a scroll => You see a scroll of Resist Fire.)'
    }),

    defineField({
      name: 'weight',
      title: 'Weight',
      type: 'number',
      description: 'Weight of the item.',
    }),

    defineField({
      name: 'condition',
      title: 'Condition',
      type: 'number',
      description: 'Max condition of the item.',
    }),

    defineField({
      name: 'buyPrice',
      title: 'Buy Price',
      type: 'number',
      description: 'Only if this item is for sale in a shop.',
    }),

    defineField({
      name: 'sellPrice',
      title: 'Sell Price',
      type: 'number',
      description: 'Price if sold to a shop.',
    }),

    defineField({
      name: 'charges',
      title: 'Charges',
      type: 'number',
      description: 'Max charges the item can hold. (Only for items with charges, Orbs, Wands, etc.)',
    }),

    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'array',
      of: [{type: 'block'}]
    })
  ]
})