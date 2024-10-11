import {defineField, defineType} from 'sanity'

export const mobs = defineType({
  name: 'mob',
  title: 'Mob',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: 'Name of the mob.',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        slugify: (input) => input.toLowerCase().replace(/\s+/g, '-').slice(0, 200),
      },
      validation: (rule) => rule.required().error('Must generat a slug for navigation.'),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      description: 'A description of the mob.',
      type: 'text',
    }),

    defineField({
      name: 'levelRange',
      title: 'Level Range',
      description: 'The level range of this mob',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: false,
        columns: 2,
      },
      fields: [
        defineField({
          name: 'min',
          title: 'Level Minimum',
          type: 'number',
        }),
        defineField({
          name: 'max',
          title: 'Level Maximum',
          type: 'number',
        }),
      ]
    }),
// 69, 82. 1775, 2100
    defineField({
      name: 'hpRange',
      title: 'HP Range',
      description: 'The HP range of this mob',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: false,
        columns: 2,
      },
      fields: [
        defineField({
          name: 'min',
          title: 'HP Minimum',
          type: 'number',
        }),
        defineField({
          name: 'max',
          title: 'HP Maximum',
          type: 'number',
        }),
      ]
    }),

    defineField({
      name: 'alignment',
      title: 'Alignment',
      description: 'Mob\'s alignment (e.g., good, evil, neutral)',
      type: 'string',
      options: {
        list: ['Good', 'Evil', 'Neutral'],
      },
    }),

    defineField({
      name: 'meleeDefense',
      title: 'Melee Defenses',
      description: 'Min and max melee defense of this mob.',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: false,
        columns: 2,
      },
      fields: [
        defineField({
          name: 'min',
          title: 'Melee Defense Rating Minimum',
          type: 'number',
        }),
        defineField({
          name: 'max',
          title: 'Melee Defense Rating Maximum',
          type: 'number',
        }),
      ]
    }),

    defineField({
      name: 'meleeAttributes',
      title: 'Melee Attributes',
      description: 'Melee attributes of this mob.',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: false,
        columns: 4,
      },
      fields: [
        defineField({
          name: 'mdm',
          title: 'Melee Damage Modifier',
          type: 'number',
          initialValue: 0,
        }),
        defineField({
          name: 'evilMDM',
          title: 'Evil MDM',
          type: 'number',
          initialValue: 0,
        }),
        defineField({
          name: 'goodMDM',
          title: 'Good MDM',
          type: 'number',
          initialValue: 0,
        }),
        defineField({
          name: 'meleePhase',
          title: 'Melee Phase',
          type: 'number',
          initialValue: 0,
        }),
      ],
    }),

    defineField({
      name: 'spellResistances',
      title: 'Spell Resistances',
      description: 'Spell Resistance Modifiers of this mob.',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: false,
        columns: 5,
      },
      fields: [
        defineField({
            name: 'sorcery',
            title: 'Sorcery',
            type: 'number',
            initialValue: 0,
        }),
        defineField({
            name: 'elementalism',
            title: 'Elementalism',
            type: 'number',
            initialValue: 0,
        }),
        defineField({
            name: 'mysticism',
            title: 'Mysticism',
            type: 'number',
            initialValue: 0,
        }),
        defineField({
            name: 'thaumaturgy',
            title: 'Thaumaturgy',
            type: 'number',
            initialValue: 0,
        }),
        defineField({
            name: 'necromancy',
            title: 'Necromancy',
            type: 'number',
            initialValue: 0,
        }),
      ],
    }),

    defineField({
      name: 'spellDamageModifiers',
      title: 'Spell Damage Modifiers',
      description: 'Spell Damage Modifiers of this mob.',
      type: 'object',
      options: {
        collapsible: true,
        collapsed: false,
        columns: 5,
      },
      fields: [
        defineField({
            name: 'sorcery',
            title: 'Sorcery',
            type: 'number',
            initialValue: 0,
        }),
        defineField({
            name: 'elementalism',
            title: 'Elementalism',
            type: 'number',
            initialValue: 0,
        }),
        defineField({
            name: 'mysticism',
            title: 'Mysticism',
            type: 'number',
            initialValue: 0,
        }),
        defineField({
            name: 'thaumaturgy',
            title: 'Thaumaturgy',
            type: 'number',
            initialValue: 0,
        }),
        defineField({
            name: 'necromancy',
            title: 'Necromancy',
            type: 'number',
            initialValue: 0,
        }),
      ],
    }),

    defineField({
      name: 'knownSpells',
      title: 'Known Spells',
      description: 'spells that this mob can cast.',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'spell' }] }]
    }),

    defineField({
      name: 'emotes',
      title: 'Emotes',
      description: 'The emotes this mob can perform.',
      type: 'array',
      of: [{ type: 'string' }]
    }),

    defineField({
      name: 'notes',
      title: 'Notes',
      description: 'Any additional information required.',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
})
