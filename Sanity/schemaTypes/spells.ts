import { defineField, defineType } from "sanity";

export const spells = defineType({
  name: 'spell',
  title: 'Spell',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Name of the spell',
      validation: rule => rule
        .required()
        .error('Name of spell is required.')
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .slice(0, 200)
      },
      validation: rule => rule
        .required()
        .error('Must generate a slug for navigation.')
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      description: 'Tags useful for sorting. "Missing Info", "Healing", "Bugged", etc.',
      type:'array',
      of: [
        {
          name:'tag',
          title:'Tag',
          type:'string'
        }
      ],
      options: {
        layout: 'tags'
      },
      validation: rule => rule
        .unique()
    }),

    defineField({
        name: 'description',
        title: 'Description',
        type: 'text',
        rows: 4,
        description: 'A brief description of the spell'
      }),

    defineField({
      name: 'spellSchool',
      title: 'Spell School',
      type: 'string',
      options: {
        list: [
          { title: 'Thaumaturgy', value: 'thaumaturgy' },
          { title: 'Mysticism', value: 'mysticism' },
          { title: 'Elementalism', value: 'elementalism' },
          { title: 'Sorcery', value: 'sorcery' },
          { title: 'Necromancy', value: 'necromancy' },
        ],
        layout: 'dropdown'
      },
      description: 'The school of magic the spell belongs to'
    }),

    defineField({
      name: 'level',
      title: 'Level',
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
        layout: 'dropdown'
      },
      description: 'The proficiency level required to cast the spell'
    }),

    defineField({
      name: 'mpCost',
      title: 'MP Cost',
      type: 'number',
      description: 'The amount of magic points required to cast the spell'
    }),

    defineField({
      name: 'spellDelay',
      title: 'Spell Delay',
      type: 'string',
      options: {
        list: [
          { title: 'Can not be used in battle.', value: 'Can not be used in battle.' },
          { title: 'Very Short', value: 'Very Short' },
          { title: 'Short', value: 'Short' },
          { title: 'Medium', value: 'Medium' },
          { title: 'Long', value: 'Long' },
          { title: 'Very Long', value: 'Very Long' },
        ]
      },
      description: 'The time delay before the spell takes effect (in seconds)'
    }),

    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
      options: {
        list: [
          { title: 'Instant', value: 'Instant' },
          { title: 'SDM x Proficiency', value: 'SDM x Proficiency'}
        ]
      },
      description: 'The duration of the spell’s effect'
    }),

    defineField({
      name: 'spellEffect',
      title: 'Spell Effect',
      type: 'text',
      rows: 3,
      description: 'Description of the spell’s effect'
    }),

    defineField({
      name: 'chant',
      title: 'Chant',
      type: 'text',
      rows: 2,
      description: 'The incantation or chant used to cast the spell'
    }),

    defineField({
      name: 'extendable',
      title: 'Extendable',
      type: 'boolean',
      description: 'Whether the spell can be extended'
    }),

    defineField({
      name: 'enchantable',
      title: 'Enchantable',
      type: 'boolean',
      description: 'Whether the spell can be enchanted'
    }),

    defineField({
      name: 'dropOnly',
      title: 'Drop Only',
      type: 'boolean',
      description: 'Whether the spell can only be obtained as a drop'
    }),

    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'array',
      of: [{type: 'block'}]
    }),
  ]
});