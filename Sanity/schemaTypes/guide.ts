import { defineField, defineType } from 'sanity'
import { CharacterCountInput } from './GuideHelperComponent'

export const guides = defineType({
  name: 'guide',
  title: 'Guide',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      validation: (Rule) =>
        Rule.required().error('Must generate a slug for navigation.'),
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (Rule) => Rule.required().max(30),
    }),

    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'string',
      description: 'A short, one sentence summary of this guide',
      components: {
        input: CharacterCountInput,
      },
      validation: (Rule) =>
        Rule.required()
          .max(150)
          .error('Summary must be 150 characters or less.'),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Leveling', value: 'leveling' },
          { title: 'Money Making', value: 'money making' },
          { title: 'New Player', value: 'new player' },
          { title: 'Crafting', value: 'crafting' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative Text',
              description: 'Important for SEO and accessibilty.',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
})
