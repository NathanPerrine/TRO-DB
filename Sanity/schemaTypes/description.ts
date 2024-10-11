import { defineField, defineType } from "sanity";

export const descriptions = defineType({
  name: 'description',
  title: 'Description',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: 'Name of the thing being described.',
      type: 'string',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      description: 'Short, 1 paragraph description.',
      type: 'array',
      of: [{ type: 'block' }],
    }),

    defineField({
      name: 'extras',
      title: 'Extras',
      description: 'Any additional information required.',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ]
})