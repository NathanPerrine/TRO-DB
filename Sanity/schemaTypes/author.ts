import { defineField, defineType } from 'sanity'

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'displayName',
      title: 'Display Name',
      description: 'Public-facing name shown on content',
      type: 'string',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) =>
          (doc as { displayName?: string; name?: string }).displayName ||
          (doc as { name?: string }).name ||
          '',
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
        Rule.required().error('Must generate a slug.'),
    }),

    defineField({
      name: 'image',
      title: 'Image',
      description: 'Author avatar or photo',
      type: 'image',
    }),
  ],

  orderings: [
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      name: 'name',
      displayName: 'displayName',
      media: 'image',
    },
    prepare({ name, displayName, media }) {
      return {
        title: displayName || name || 'Unnamed Author',
        subtitle: displayName ? name : undefined,
        media,
      }
    },
  },
})
