import { defineField, defineType } from 'sanity';

export const mobs = defineType({
  name: 'mob',
  title: 'Mob',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Name of the mob.',
      validation: Rule => Rule.required(),
    }),
  ]
})