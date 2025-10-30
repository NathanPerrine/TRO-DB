import { defineField, defineType } from 'sanity'
import { CharacterCountInput } from './GuideHelperComponent'
import { portableTextBlock, imageConfig, tableConfig } from './portableTextConfig'

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
          input
            .toLowerCase()
            .replace(/[^\w\s-]/g, '') // Remove all non-word chars except spaces and hyphens
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Collapse multiple hyphens to single hyphen
            .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
            .slice(0, 200),
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
      name: 'sections',
      title: 'Sections',
      description: 'Add chapters/sections to organize your guide content',
      type: 'array',
      options: {
        modal: {
          type: 'dialog',
          width: 'auto',
        },
      },
      of: [
        {
          type: 'object',
          name: 'section',
          title: 'Section',
          fields: [
            {
              name: 'sectionTitle',
              title: 'Section Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'sectionSlug',
              title: 'Section Slug',
              type: 'slug',
              description:
                'Used for anchor links and navigation within the guide',
              options: {
                source: (doc, context) => (context.parent as any)?.sectionTitle,
                slugify: (input) =>
                  input
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-')
                    .replace(/^-+|-+$/g, '')
                    .slice(0, 200),
                disableArrayWarning: true,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'content',
              title: 'Content',
              description:
                'Main content for this section. Add subsections below for deeper organization.',
              type: 'array',
              of: [portableTextBlock, imageConfig, tableConfig],
            },
            {
              name: 'subsections',
              title: 'Subsections',
              description:
                'Optional subsections for deeper content organization',
              type: 'array',
              options: {
                modal: { type: 'dialog', width: 'auto' },
              },
              of: [
                {
                  type: 'object',
                  name: 'subsection',
                  title: 'Subsection',
                  fields: [
                    {
                      name: 'subsectionTitle',
                      title: 'Subsection Title',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'subsectionSlug',
                      title: 'Subsection Slug',
                      type: 'slug',
                      description:
                        'Used for anchor links within this subsection',
                      options: {
                        source: (doc, context) =>
                          (context.parent as any)?.subsectionTitle,
                        slugify: (input) =>
                          input
                            .toLowerCase()
                            .replace(/[^\w\s-]/g, '')
                            .replace(/\s+/g, '-')
                            .replace(/-+/g, '-')
                            .replace(/^-+|-+$/g, '')
                            .slice(0, 200),
                        disableArrayWarning: true,
                      },
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'content',
                      title: 'Content',
                      type: 'array',
                      of: [portableTextBlock, imageConfig, tableConfig],
                      validation: (Rule) => Rule.required(),
                    },
                  ],
                  preview: {
                    select: {
                      title: 'subsectionTitle',
                    },
                    prepare({ title }) {
                      return {
                        title: title || 'Untitled Subsection',
                        subtitle: 'Subsection',
                      }
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'sectionTitle',
              subsectionCount: 'subsections',
            },
            prepare({ title, subsectionCount }) {
              const count = subsectionCount?.length || 0
              return {
                title: title || 'Untitled Section',
                subtitle:
                  count > 0
                    ? `${count} subsection${count !== 1 ? 's' : ''}`
                    : '',
              }
            },
          },
        },
      ],
      validation: (Rule) =>
        Rule.required().min(1).error('At least one section is required.'),
    }),

    defineField({
      name: 'relatedGuides',
      title: 'Related Guides',
      description: 'Related guides that might be helpful to the reader.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'guide' }],
          weak: true,
          options: {
            filter: ({ document }) => {
              return {
                filter: '_id != $id',
                params: { id: document._id },
              }
            },
          },
        },
      ],
    }),
  ],
})
