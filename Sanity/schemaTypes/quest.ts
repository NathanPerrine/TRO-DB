import { defineField, defineType } from 'sanity'
import { CharacterCountInput } from './GuideHelperComponent'
import {
  portableTextBlock,
  imageConfig,
  tableConfig,
} from './portableTextConfig'

export const quest = defineType({
  name: 'quest',
  title: 'Quest Guide',
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
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '')
            .slice(0, 200),
      },
      validation: (Rule) =>
        Rule.required().error('Must generate a slug for navigation.'),
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'string',
      description: 'A short, one sentence summary of this quest guide',
      components: {
        input: CharacterCountInput,
      },
      validation: (Rule) =>
        Rule.required()
          .max(150)
          .error('Summary must be 150 characters or less.'),
    }),

    defineField({
      name: 'questGiver',
      title: 'Quest Giver',
      description: 'The NPC that starts this quest',
      type: 'reference',
      to: [{ type: 'npc' }],
      weak: true,
    }),

    defineField({
      name: 'startingArea',
      title: 'Starting Area',
      description: 'The area where this quest begins',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'area'},
            {type: 'shop'},
          ],
          weak: true,
        }
      ]
    }),

    defineField({
      name: 'recommendedLevel',
      title: 'Recommended Level',
      description: 'Recommended level range for this quest',
      type: 'object',
      options: {
        columns: 2,
        collapsible: true,
      },
      fields: [
        defineField({
          name: 'min',
          title: 'Min',
          type: 'number',
        }),
        defineField({
          name: 'max',
          title: 'Max',
          type: 'number',
        }),
      ],
    }),

    defineField({
      name: 'sections',
      title: 'Sections',
      description:
        'Add chapters/sections to organize your quest guide content',
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
                source: (doc, context) =>
                  (context.parent as any)?.sectionTitle,
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
      name: 'rewards',
      title: 'Rewards',
      description: 'Describe the rewards for completing this quest',
      type: 'array',
      of: [portableTextBlock, imageConfig],
    }),

    defineField({
      name: 'relatedAreas',
      title: 'Related Areas',
      description: 'Areas involved in this quest',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'area' }],
          weak: true,
        },
      ],
    }),

    defineField({
      name: 'relatedQuests',
      title: 'Related Quests',
      description: 'Prerequisites or follow-up quests',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'quest' }],
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

  orderings: [
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.displayName',
      authorName: 'author.name',
    },
    prepare({ title, author, authorName }) {
      return {
        title: title || 'Untitled Quest',
        subtitle: author || authorName || 'Unknown author',
      }
    },
  },
})
