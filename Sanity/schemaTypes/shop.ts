import { defineType, defineField, defineArrayMember } from 'sanity'
import { ShopItemReference } from '../components/ShopItemReference'

const shopCategories = [
  { title: 'Accessories', value: 'accessories' },
  { title: 'Armor', value: 'armor' },
  { title: 'Dyes', value: 'dyes' },
  { title: 'Potions', value: 'potions' },
  { title: 'Elixirs', value: 'elixirs' },
  { title: 'Scrolls', value: 'scrolls' },
  { title: 'Wands', value: 'wands' },
  { title: 'Orbs', value: 'orbs' },
  { title: 'Weapons', value: 'weapons' },
  { title: 'Miscellaneous', value: 'misc' },
]

export const shop = defineType({
  name: 'shop',
  title: 'Shop',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: 'Name of the shop or shopkeeper.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      validation: (Rule) =>
        Rule.required().error('Must generate a slug for navigation.'),
    }),

    defineField({
      name: 'directions',
      title: 'Directions',
      description:
        "Directions to the shop from the nearest town's teleporter.",
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'directionEntry',
          title: 'Direction Entry',
          fields: [
            {
              name: 'town',
              title: 'Nearest Town Teleporter',
              type: 'reference',
              to: [{ type: 'area' }],
              weak: true,
              options: {
                filter: `areaType == 'town'`,
                sort: [{ field: 'name', direction: 'asc' }],
              },
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'directions',
              title: 'Direction (String)',
              type: 'string',
              description: 'E.g., "1R 8D"',
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'town.name',
              subtitle: 'directions',
            },
            prepare(selection: { title?: string; subtitle?: string }) {
              const { title, subtitle } = selection
              return {
                title: title || 'No town selected',
                subtitle: subtitle
                  ? `Directions: ${subtitle}`
                  : 'No directions provided',
              }
            },
          },
        },
      ],
    }),

    defineField({
      name: 'description',
      title: 'Description',
      description: 'Optional notes about this shop.',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'inventory',
      title: 'Inventory',
      description: 'Categories of merchandise sold at this shop.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'merchandiseCategory',
          title: 'Merchandise Category',
          fields: [
            defineField({
              name: 'category',
              title: 'Category',
              type: 'string',
              options: {
                list: shopCategories,
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'items',
              title: 'Items',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'reference',
                  to: [
                    { type: 'item' },
                    { type: 'equipment' },
                    { type: 'accessory' },
                  ],
                  components: {
                    input: ShopItemReference,
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: {
              category: 'category',
              items: 'items',
            },
            prepare({ category, items }) {
              const categoryLabel =
                shopCategories.find((c) => c.value === category)?.title ||
                category
              const itemCount = items?.length || 0
              return {
                title: categoryLabel,
                subtitle: `${itemCount} item${itemCount !== 1 ? 's' : ''}`,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      name: 'name',
      town: 'directions.0.town.name',
    },
    prepare({ name, town }) {
      return {
        title: name,
        subtitle: town ? `in ${town}` : 'No location set',
      }
    },
  },
  orderings: [
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Town',
      name: 'townAsc',
      by: [{ field: 'town.name', direction: 'asc' }],
    },
  ],
})
