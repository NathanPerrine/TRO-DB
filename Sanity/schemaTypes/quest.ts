import { defineField, defineType } from 'sanity'
import { CharacterCountInput } from './GuideHelperComponent'
import {
  portableTextBlock,
  imageConfig,
  tableConfig,
} from './portableTextConfig'

export const quest = defineType({
  name: 'quest',
  title: 'Quest Guide',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
          input
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-+|-+$/g, '')
            .slice(0, 200),
      },
      validation: (Rule) =>
        Rule.required().error('Must generate a slug for navigation.'),
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'string',
      description: 'A short, one sentence summary of this quest guide',
      components: {
        input: CharacterCountInput,
      },
      validation: (Rule) =>
        Rule.required()
          .max(150)
          .error('Summary must be 150 characters or less.'),
    }),

    defineField({
      name: 'questGiver',
      title: 'Quest Giver',
      description: 'The NPC that starts this quest',
      type: 'reference',
      to: [{ type: 'npc' }],
      weak: true,
    }),

    defineField({
      name: 'startingArea',
      title: 'Starting Area',
      description: 'The area where this quest begins',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'area'},
            {type: 'shop'},
          ],
          weak: true,
        }
      ]
    }),

    defineField({
      name: 'recommendedLevel',
      title: 'Recommended Level',
      description: 'Recommended level range for this quest',
      type: 'object',
      options: {
        columns: 2,
        collapsible: true,
      },
      fields: [
        defineField({
          name: 'min',
          title: 'Min',
          type: 'number',
        }),
        defineField({
          name: 'max',
          title: 'Max',
          type: 'number',
        }),
      ],
    }),

    defineField({
      name: 'requirements',
      title: 'Requirements',
      description: 'Prerequisites needed before starting this quest',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: 'requiredQuests',
          title: 'Required Quests',
          description: 'Quests that must be completed first',
          type: 'array',
          of: [
            {
              type: 'reference',
              to: [{ type: 'quest' }],
              weak: true,
            },
          ],
        }),
        defineField({
          name: 'requiredItems',
          title: 'Required Items',
          description: 'Items needed to start or complete this quest',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'other',
          title: 'Other Requirements',
          description:
            'Any other requirements (skills, level, etc.)',
          type: 'text',
          rows: 2,
        }),
      ],
    }),

    defineField({
      name: 'introduction',
      title: 'Introduction',
      description:
        'Quest background, lore, and overview of what this quest involves',
      type: 'array',
      of: [portableTextBlock, imageConfig],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'walkthrough',
      title: 'Walkthrough',
      description:
        'Step-by-step guide to completing the quest. Add steps as subsections for longer quests.',
      type: 'array',
      options: {
        modal: {
          type: 'dialog',
          width: 'auto',
        },
      },
      of: [
        portableTextBlock,
        imageConfig,
        tableConfig,
        {
          type: 'object',
          name: 'walkthroughStep',
          title: 'Step',
          fields: [
            {
              name: 'stepTitle',
              title: 'Step Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'stepSlug',
              title: 'Step Slug',
              type: 'slug',
              description: 'Used for anchor links within the walkthrough',
              options: {
                source: (doc, context) =>
                  (context.parent as any)?.stepTitle,
                slugify: (input) =>
                  input
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-')
                    .replace(/^-+|-+$/g, '')
                    .slice(0, 200),
                disableArrayWarning: true,
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'content',
              title: 'Content',
              type: 'array',
              of: [portableTextBlock, imageConfig, tableConfig],
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'stepTitle',
            },
            prepare({ title }) {
              return {
                title: title || 'Untitled Step',
                subtitle: 'Walkthrough Step',
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'rewards',
      title: 'Rewards',
      description:
        'XP, gold, items, and other rewards for completing this quest',
      type: 'array',
      of: [portableTextBlock, imageConfig, tableConfig],
    }),

    defineField({
      name: 'tipsAndNotes',
      title: 'Tips & Notes',
      description:
        'Helpful tips, warnings, alternative strategies, or other notes',
      type: 'array',
      of: [portableTextBlock, imageConfig],
    }),

    defineField({
      name: 'relatedAreas',
      title: 'Related Areas',
      description: 'Areas involved in this quest',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'area' }],
          weak: true,
        },
      ],
    }),

    defineField({
      name: 'relatedQuests',
      title: 'Related Quests',
      description: 'Prerequisites or follow-up quests',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'quest' }],
          weak: true,
          options: {
            filter: ({ document }) => {
              return {
                filter: '_id != $id',
                params: { id: document._id },
              }
            },
          },
        },
      ],
    }),
  ],

  orderings: [
    {
      title: 'Title',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.displayName',
      authorName: 'author.name',
    },
    prepare({ title, author, authorName }) {
      return {
        title: title || 'Untitled Quest',
        subtitle: author || authorName || 'Unknown author',
      }
    },
  },
})
