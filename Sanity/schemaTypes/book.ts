import { defineField, defineType } from "sanity";

export const books = defineType({
  name: 'book',
  title: 'Book',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'Name of the item.',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .slice(0, 200)
      },
      validation: rule => rule
        .required()
        .error('Must generat a slug for navigation.')
    }),

    defineField({
      name: 'bookType',
      title: 'Book Type',
      type: 'string',
      description: 'Skill or spell book?',
      options: {
        list: [
          { title: 'Skillbook', value: 'skillbook' },
          { title: 'Spellbook', value: 'spellbook' },
        ]
      },
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'skill',
      title: 'Skill',
      type: 'string',
      description: 'The skill taught by this book. (Elementalism, Meditation, etc.)',
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
        ]
      }
    }),

    defineField({
      name: 'skillLevel',
      title: 'Skill Level',
      type: 'string',
      description: '',
      options: {
        list: [
          { title: 'Familiar', value: 'familiar' },
          { title: 'Proficient', value: 'proficient' },
          { title: 'Expert', value: 'expert' },
          { title: 'Master', value: 'master' },
          { title: 'Grandmaster', value: 'grandmaster' },
          { title: 'Supreme-Master', value: 'supreme-master' },
        ]
      },
    }),

    defineField({
      name: 'buildPoints',
      title: 'Build Points',
      type: 'number',
      description: 'Only for skill books. Familiar: 1, Proficient: 2, Expert: 4, Master: 7, Grandmaster: 10, Supreme-Master: 13',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Description of the book.',
    }),

    defineField({
      name: 'weight',
      title: 'Weight',
      type: 'number',
      description: 'Weight of the book.',
    }),

    defineField({
      name: 'condition',
      title: 'Condition',
      type: 'number',
      description: 'Max condition of the book.',
    }),

    defineField({
      name: 'buyPrice',
      title: 'Buy Price',
      type: 'number',
      description: 'The price to purchase this book at a shop.',
    }),

    defineField({
      name: 'sellPrice',
      title: 'Sell Price',
      type: 'number',
      description: 'The price to sell this book to a shop.',
    }),

    defineField({
      name: 'linkedSpell',
      title: 'Linked Spell',
      type: 'reference',
      to: [{ type: 'spell'}],
      description: 'If this is a spellbook, link the spell taught by this book.'
    })
  ]
})