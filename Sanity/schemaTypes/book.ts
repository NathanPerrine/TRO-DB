import { defineField, defineType } from 'sanity'

export const books = defineType({
  name: 'book',
  title: 'Book',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: 'Name of the item.',
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
      name: 'bookType',
      title: 'Book Type',
      description: 'Skill or spell book?',
      type: 'string',
      options: {
        list: [
          { title: 'Skillbook', value: 'skillbook' },
          { title: 'Spellbook', value: 'spellbook' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'skill',
      title: 'Skill',
      description:
        'The skill taught by this book. (Elementalism, Meditation, etc.)',
      type: 'string',
      options: {
        list: [
          { title: 'Light Piercing', value: 'Light Piercing' },
          { title: 'Light One-Handed', value: 'Light One-Handed' },
          { title: 'Light Two-Handed', value: 'Light Two-Handed' },
          { title: 'Heavy Two-Handed', value: 'Heavy Two-Handed' },
          { title: 'Armorsmith', value: 'Armorsmith' },
          { title: 'Weaponsmith', value: 'Weaponsmith' },
          { title: 'Leatherworker', value: 'Leatherworker' },
          { title: 'Seamster', value: 'Seamster' },
          { title: 'Healing', value: 'Healing' },
          { title: 'Acrobatics', value: 'Acrobatics' },
          { title: 'Sorcery', value: 'Sorcery' },
          { title: 'Elementalism', value: 'Elementalism' },
          { title: 'Mysticism', value: 'Mysticism' },
          { title: 'Thaumaturgy', value: 'Thaumaturgy' },
          { title: 'Necromancy', value: 'Necromancy' },
          { title: 'Theurgism', value: 'Theurgism' },
          { title: 'Alchemy', value: 'Alchemy' },
          { title: 'Pickpocketing', value: 'Pickpocketing' },
          { title: 'Disarm Traps', value: 'Disarm Traps' },
          { title: 'Lockpicking', value: 'Lockpicking' },
          { title: 'Meditation', value: 'Meditation' },
          { title: 'Critical Strikes', value: 'Critical Strikes' },
          { title: 'Shield Usage', value: 'Shield Usage' },
        ],
      },
    }),

    defineField({
      name: 'skillLevel',
      title: 'Skill Level',
      description: 'Required skill level or skill level taught by this book.',
      type: 'string',
      options: {
        list: [
          { title: 'Familiar', value: 'familiar' },
          { title: 'Proficient', value: 'proficient' },
          { title: 'Expert', value: 'expert' },
          { title: 'Master', value: 'master' },
          { title: 'Grandmaster', value: 'grandmaster' },
          { title: 'Supreme-Master', value: 'supreme-master' },
        ],
      },
    }),

    defineField({
      name: 'buildPoints',
      title: 'Build Points',
      description:
        'Familiar: 1, Proficient: 2, Expert: 4, Master: 7, Grandmaster: 10, Supreme-Master: 13',
      type: 'number',
      hidden: ({ parent }) => parent?.bookType !== 'skillbook',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      description: 'Description of the book.',
      type: 'text',
    }),

    defineField({
      name: 'weight',
      title: 'Weight',
      description: 'Weight of the book.',
      type: 'number',
    }),

    defineField({
      name: 'condition',
      title: 'Condition',
      description: 'Max condition of the book.',
      type: 'number',
    }),

    defineField({
      name: 'buyPrice',
      title: 'Buy Price',
      description: 'The price to purchase this book at a shop.',
      type: 'number',
    }),

    defineField({
      name: 'sellPrice',
      title: 'Sell Price',
      description: 'The price to sell this book to a shop.',
      type: 'number',
    }),

    defineField({
      name: 'linkedSpell',
      title: 'Linked Spell',
      description: 'The spell taught by this book.',
      type: 'reference',
      to: [{ type: 'spell' }],
      hidden: ({ parent }) => parent?.bookType !== 'spellbook',
    }),
  ],
  preview: {
    select: {
      name: 'name',
      bookType: 'bookType',
      skill: 'skill',
      skillLevel: 'skillLevel',
    },
    prepare({ name, bookType, skill, skillLevel }) {
      return {
        title: name,
        subtitle: `${skill} | ${bookType} | ${skillLevel}`,
      }
    },
  },
  orderings: [
    {
      title: 'All Books',
      name: 'bookType',
      by: [
        { field: 'skill', direction: 'asc' },
        { field: 'bookType', direction: 'asc' },
        { field: 'skillLevel', direction: 'asc' },
        { field: 'name', direction: 'asc' },
      ],
    },
  ],
})
