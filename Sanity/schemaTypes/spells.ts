import { defineField, defineType } from 'sanity'
import { portableTextBlock } from './portableTextConfig'

export const spells = defineType({
  name: 'spell',
  title: 'Spell',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Name of the spell',
      type: 'string',
      validation: (Rule) => Rule.required().error('Name of spell is required.'),
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
      name: 'tags',
      title: 'Tags',
      description:
        'Tags useful for sorting. "Missing Info", "Healing", "Bugged", etc.',
      type: 'array',
      of: [
        {
          name: 'tag',
          title: 'Tag',
          type: 'string',
        },
      ],
      options: {
        layout: 'tags',
      },
      validation: (Rule) => Rule.unique(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      description: 'A brief description of the spell',
      type: 'text',
      rows: 4,
    }),

    defineField({
      name: 'spellSchool',
      title: 'Spell School',
      description: 'The school of magic the spell belongs to',
      type: 'string',
      options: {
        list: [
          { title: 'Thaumaturgy', value: 'thaumaturgy' },
          { title: 'Mysticism', value: 'mysticism' },
          { title: 'Elementalism', value: 'elementalism' },
          { title: 'Sorcery', value: 'sorcery' },
          { title: 'Necromancy', value: 'necromancy' },
        ],
        layout: 'dropdown',
      },
    }),

    defineField({
      name: 'level',
      title: 'Level',
      description: 'The proficiency level required to cast the spell',
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
        layout: 'dropdown',
      },
    }),

    defineField({
      name: 'mpCost',
      title: 'MP Cost',
      description: 'The amount of magic points required to cast the spell',
      type: 'number',
    }),

    defineField({
      name: 'spellDelay',
      title: 'Spell Delay',
      description: 'The time delay before the spell takes effect (in seconds)',
      type: 'string',
      options: {
        list: [
          {
            title: 'Can not be used in battle.',
            value: 'Can not be used in battle.',
          },
          { title: 'Very Short', value: 'Very Short' },
          { title: 'Short', value: 'Short' },
          { title: 'Medium', value: 'Medium' },
          { title: 'Long', value: 'Long' },
          { title: 'Very Long', value: 'Very Long' },
        ],
      },
    }),

    defineField({
      name: 'duration',
      title: 'Duration',
      description: 'The duration of the spell’s effect',
      type: 'string',
      options: {
        list: [
          { title: 'Instant', value: 'Instant' },
          { title: 'SDM x Proficiency', value: 'SDM x Proficiency' },
        ],
      },
    }),

    defineField({
      name: 'spellEffect',
      title: 'Spell Effect',
      description: 'Description of the spell’s effect',
      type: 'text',
      rows: 3,
    }),

    defineField({
      name: 'chant',
      title: 'Chant',
      description: 'The incantation or chant used to cast the spell',
      type: 'text',
      rows: 2,
    }),

    defineField({
      name: 'extendable',
      title: 'Extendable',
      description: 'Whether the spell can be extended',
      type: 'boolean',
    }),

    defineField({
      name: 'enchantable',
      title: 'Enchantable',
      description: 'Whether the spell can be enchanted',
      type: 'boolean',
    }),

    defineField({
      name: 'dropOnly',
      title: 'Drop Only',
      description: 'Whether the spell can only be obtained as a drop',
      type: 'boolean',
    }),

    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'array',
      of: [portableTextBlock],
    }),
  ],
})
