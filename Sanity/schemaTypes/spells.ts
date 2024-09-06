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
          { title: 'Thaumaturgy', value: 'Thaumaturgy' },
          { title: 'Mysticism', value: 'Mysticism' },
          { title: 'Elementalism', value: 'Elementalism' },
          { title: 'Sorcery', value: 'Sorcery' },
          { title: 'Necromancy', value: 'Necromancy' },
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
          { title: 'Familiar', value: 'Familiar' },
          { title: 'Proficient', value: 'Proficient' },
          { title: 'Expert', value: 'Expert' },
          { title: 'Master', value: 'Master' },
          { title: 'Grandmaster', value: 'Grandmaster' },
          { title: 'Supreme-Master', value: 'Supreme-Master' },
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

    // {
    //   name: 'learnedFrom',
    //   title: 'Learned From',
    //   type: 'reference',
    //   to: [{ type: 'spellbook' }],
    //   description: 'The spellbook from which this spell was learned'
    // },
    // Can easily make a link <a href="spellbook of {title}">

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