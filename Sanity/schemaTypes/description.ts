import { defineField, defineType } from "sanity";

export const descriptions = defineType({
  name: 'description',
  title: 'Description',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Name of the thing being described.',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Short, 1 paragraph description.',
    })
  ]
})