import { defineType, defineField, defineArrayMember } from 'sanity'
import { portableTextBlock } from './portableTextConfig'
import { ShopItemReference } from '../components/ShopItemReference'

const shopCategories = [
  { title: 'Accessories',     value: 'accessories' },
  { title: 'Armor',           value: 'armor' },
  { title: 'Weapons',         value: 'weapons' },

  { title: 'Dyes',            value: 'dyes' },
  { title: 'Potions',         value: 'potions' },
  { title: 'Elixirs',         value: 'elixirs' },
  { title: 'Scrolls',         value: 'scrolls' },
  { title: 'Wands',           value: 'wands' },
  { title: 'Orbs',            value: 'orbs' },

  { title: 'Skills - Crafter',value: 'skillsCrafter'},
  { title: 'Skills - Thief',  value: 'skillsThief'},
  { title: 'Skills - Warrior',value: 'skillsWarrior'},
  { title: 'Skills - Wizard', value: 'skillsWizard'},

  { title: 'Spells - Sorc',   value: 'spellsSorc' },
  { title: 'Spells - Ele',    value: 'spellsEle' },
  { title: 'Spells - Myst',   value: 'spellsMyst' },
  { title: 'Spells - Thaum',  value: 'spellsThaum' },
  { title: 'Spells - Necro',  value: 'spellsNecro' },

  { title: 'Miscellaneous',   value: 'misc' },
]

const inventoryTypes = [
  { title: 'General',                   value: 'general' },
  { title: 'Clothing',                  value: 'clothing' },
  { title: 'Armor & Weapons',           value: 'armorWeapons' },
  { title: 'Magic (Potions & Scrolls)', value: 'magicItems' },
  { title: 'Magic (Spell Books)',       value: 'magicSpellBooks' },
  { title: 'Trainer - Crafting',        value: 'trainerCrafting' },
  { title: 'Trainer - Thief',           value: 'trainerThief' },
  { title: 'Trainer - Warrior',         value: 'trainerWarrior' },
  { title: 'Trainer - Wizard',          value: 'trainerWizard' },
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
      name: 'locations',
      title: 'Locations',
      description: 'Where is this shop located?',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'area' }],
        weak: true,
        options: {
          sort: [{ field: 'name', direction: 'asc' }],
        }
      }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      description: 'Optional notes about this shop.',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'inventoryType',
      title: 'Inventory Type',
      description: 'What type of items are sold here:',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: inventoryTypes
      }
    }),

    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'array',
      of: [portableTextBlock],
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
                    { type: 'book' },
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
      location: 'locations.0.name',
    },
    prepare({ name, location }) {
      return {
        title: name,
        subtitle: location ? `in ${location}` : 'No location set',
      }
    },
  },
  orderings: [
    {
      title: 'Name',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})
