import { defineType, defineField } from 'sanity'
import { galleryCategories } from '../Structures/structureHelpers'

const equipmentCategories = galleryCategories
  .filter((c) => c.group === 'equipment')
  .map((c) => c.value)

const accessoryCategories = galleryCategories
  .filter((c) => c.group === 'accessory')
  .map((c) => c.value)

export const gallery = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Display name for this gallery image.',
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
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'alt',
      title: 'Alt Text',
      description: 'Accessibility text describing the image.',
      type: 'string',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      description: 'Optional context about the image.',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'category',
      title: 'Category',
      description: 'Primary category for filtering.',
      type: 'string',
      options: {
        list: galleryCategories.map((c) => ({ title: c.title, value: c.value })),
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      description: 'Additional tags for filtering and search.',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      validation: (Rule) => Rule.unique(),
    }),

    defineField({
      name: 'relatedEquipment',
      title: 'Related Equipment',
      description: 'Link to the equipment shown in this image.',
      type: 'reference',
      to: [{ type: 'equipment' }],
      weak: true,
      hidden: ({ parent }) => !equipmentCategories.includes(parent?.category),
    }),

    defineField({
      name: 'relatedAccessory',
      title: 'Related Accessory',
      description: 'Link to the accessory shown in this image.',
      type: 'reference',
      to: [{ type: 'accessory' }],
      weak: true,
      hidden: ({ parent }) => !accessoryCategories.includes(parent?.category),
    }),

    defineField({
      name: 'relatedItem',
      title: 'Related Item',
      description: 'Link to the item (dye) shown in this image.',
      type: 'reference',
      to: [{ type: 'item' }],
      weak: true,
      options: {
        filter: `type == 'dye'`,
      },
      hidden: ({ parent }) => parent?.category !== 'dyes',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      media: 'image',
    },
    prepare({ title, category, media }) {
      const categoryLabel = galleryCategories.find(
        (c) => c.value === category
      )?.title
      return {
        title: title,
        subtitle: categoryLabel,
        media: media,
      }
    },
  },
  orderings: [
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
    {
      title: 'Category',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
    },
  ],
})
