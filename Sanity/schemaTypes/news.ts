import { defineField, defineType } from 'sanity'
import { CharacterCountInput } from './GuideHelperComponent'
import {
  portableTextBlock,
  imageConfig,
  tableConfig,
} from './portableTextConfig'

export const news = defineType({
  name: 'news',
  title: 'News',
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
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'string',
      description: 'A short, one sentence summary of this news post',
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
          { title: 'Game Update', value: 'game update' },
          { title: 'Site Update', value: 'site update' },
          { title: 'Community', value: 'community' },
          { title: 'Announcement', value: 'announcement' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      description: 'Optional hero image displayed at the top of the post',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility.',
        },
      ],
    }),

    defineField({
      name: 'sections',
      title: 'Sections',
      description: 'Add sections to organize your news post content',
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
                'Used for anchor links and navigation within the post',
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
  ],
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Published Date, Old',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.displayName',
      authorName: 'author.name',
      publishedAt: 'publishedAt',
      media: 'featuredImage',
    },
    prepare({ title, author, authorName, publishedAt, media }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString()
        : 'No date'
      return {
        title: title || 'Untitled Post',
        subtitle: `${author || authorName || 'Unknown author'} — ${date}`,
        media,
      }
    },
  },
})
