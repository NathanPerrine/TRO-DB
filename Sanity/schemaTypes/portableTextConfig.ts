import { FiLink, FiExternalLink, FiCompass } from 'react-icons/fi'

// Standard external link annotation for portable text blocks
export const externalLinkAnnotation = {
  name: 'link',
  type: 'object',
  title: 'External Link',
  icon: FiExternalLink,
  fields: [
    {
      name: 'href',
      type: 'url',
      title: 'URL',
      validation: (Rule: any) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    },
    {
      name: 'blank',
      type: 'boolean',
      title: 'Open in new tab',
      initialValue: true,
    },
  ],
}

// Reusable internal link annotation for portable text blocks
export const internalLinkAnnotation = {
  name: 'internalLink',
  type: 'object',
  title: 'Internal Link',
  icon: FiLink,
  fields: [
    {
      name: 'reference',
      type: 'reference',
      title: 'Reference',
      description: 'Link to another document in the database',
      weak: true,
      to: [
        { type: 'guide', title: 'Guides' },
        { type: 'equipment', title: 'Equipment' },
        { type: 'accessory', title: 'Accessories' },
        { type: 'spell', title: 'Spells' },
        { type: 'item', title: 'Items' },
        { type: 'book', title: 'Books' },
        { type: 'area', title: 'Areas' },
        { type: 'mob', title: 'Mobs' },
      ],
    },
  ],
}

// Page navigation annotation for linking to category/listing pages
export const pageNavigationAnnotation = {
  name: 'pageLink',
  type: 'object',
  title: 'Page Link',
  icon: FiCompass,
  fields: [
    {
      name: 'page',
      type: 'string',
      title: 'Page',
      description: 'Link to a navigation or category page',
      options: {
        list: [
          { title: 'Home', value: '/' },
          { title: 'Items', value: '/items' },
          { title: 'Equipment', value: '/items/equipment' },
          { title: 'Weapons', value: '/items/equipment/weapons' },
          { title: 'Armor', value: '/items/equipment/armor' },
          { title: 'Accessories', value: '/items/accessories' },
          { title: 'Consumables', value: '/items/consumables' },
          { title: 'Baubles', value: '/items/consumables/baubles' },
          { title: 'Orbs', value: '/items/consumables/orbs' },
          { title: 'Potions', value: '/items/consumables/potions' },
          { title: 'Scrolls', value: '/items/consumables/scrolls' },
          { title: 'Wands', value: '/items/consumables/wands' },
          { title: 'Books', value: '/items/books' },
          { title: 'Magic', value: '/magic' },
          { title: 'Thaumaturgy', value: '/magic/thaumaturgy' },
          { title: 'Mysticism', value: '/magic/mysticism' },
          { title: 'Elementalism', value: '/magic/elementalism' },
          { title: 'Sorcery', value: '/magic/sorcery' },
          { title: 'Necromancy', value: '/magic/necromancy' },
          { title: 'Areas', value: '/areas' },
          { title: 'Dungeons', value: '/areas/dungeons' },
          { title: 'Towns', value: '/areas/towns' },
          { title: 'Zones', value: '/areas/zones' },
          { title: 'Mobs', value: '/mobs' },
          { title: 'Guides', value: '/guides' },
          { title: 'Character Builder', value: '/characterbuilder'}
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
  ],
}

// Reusable image configuration for portable text blocks
export const imageConfig = {
  type: 'image',
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: 'Alternative Text',
      description: 'Important for SEO and accessibilty.',
    },
    {
      name: 'alignment',
      type: 'string',
      title: 'Image Alignment',
      options: {
        list: [
          { title: 'Center', value: 'center' },
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
      },
      initialValue: 'center',
    },
    {
      name: 'width',
      type: 'number',
      title: 'Width (in pixels)',
      validation: (Rule: any) => Rule.min(100).max(800),
      initialValue: 400,
    },
  ],
}

// Complete portable text block with external, internal, and page links
export const portableTextBlock = {
  type: 'block',
  marks: {
    annotations: [
      externalLinkAnnotation,
      internalLinkAnnotation,
      pageNavigationAnnotation,
    ],
  },
}

// Custom table configuration with rich text cell support (including links)
export const tableConfig = {
  type: 'object',
  name: 'table',
  title: 'Table',
  fields: [
    {
      name: 'rows',
      type: 'array',
      title: 'Table Rows',
      of: [
        {
          type: 'object',
          name: 'tableRow',
          title: 'Row',
          fields: [
            {
              name: 'cells',
              type: 'array',
              title: 'Cells',
              of: [
                {
                  type: 'object',
                  name: 'tableCell',
                  title: 'Cell',
                  fields: [
                    {
                      name: 'content',
                      type: 'array',
                      title: 'Content',
                      of: [portableTextBlock],
                    },
                  ],
                  preview: {
                    select: {
                      content: 'content',
                    },
                    prepare({ content }: { content?: any[] }) {
                      // Extract text from portable text blocks
                      const textContent = content
                        ?.map((block) => {
                          if (block._type === 'block' && block.children) {
                            return block.children
                              .map((child: any) => child.text)
                              .join('')
                          }
                          return ''
                        })
                        .filter(Boolean)
                        .join(' ')

                      const truncated =
                        textContent && textContent.length > 100
                          ? textContent.substring(0, 100) + '...'
                          : textContent
                      return {
                        title: truncated || 'Empty cell',
                      }
                    },
                  },
                },
              ],
            },
          ],
          preview: {
            select: {
              cells: 'cells',
            },
            prepare({ cells }: { cells?: any[] }) {
              const cellCount = cells?.length || 0
              const cellContents = cells
                ?.map((cell) => {
                  // Extract text from portable text blocks in each cell
                  if (!cell?.content) return ''
                  return cell.content
                    .map((block: any) => {
                      if (block._type === 'block' && block.children) {
                        return block.children
                          .map((child: any) => child.text)
                          .join('')
                      }
                      return ''
                    })
                    .filter(Boolean)
                    .join(' ')
                })
                .filter(Boolean)
                .join(' | ')
              const truncated =
                cellContents && cellContents.length > 80
                  ? cellContents.substring(0, 80) + '...'
                  : cellContents
              return {
                title: truncated || `Row with ${cellCount} empty cell${cellCount !== 1 ? 's' : ''}`,
                subtitle: `${cellCount} cell${cellCount !== 1 ? 's' : ''}`,
              }
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      rows: 'rows',
    },
    prepare({ rows }: { rows?: any[] }) {
      const rowCount = rows?.length || 0
      const cellCount = rows?.[0]?.cells?.length || 0
      const firstRowContents = rows?.[0]?.cells
        ?.map((cell: any) => {
          // Extract text from portable text blocks in first row
          if (!cell?.content) return ''
          return cell.content
            .map((block: any) => {
              if (block._type === 'block' && block.children) {
                return block.children.map((child: any) => child.text).join('')
              }
              return ''
            })
            .filter(Boolean)
            .join(' ')
        })
        .filter(Boolean)
        .join(' | ')
      const truncated =
        firstRowContents && firstRowContents.length > 80
          ? firstRowContents.substring(0, 80) + '...'
          : firstRowContents
      return {
        title: truncated || 'Table',
        subtitle: `${rowCount} row${rowCount !== 1 ? 's' : ''} × ${cellCount} column${cellCount !== 1 ? 's' : ''}`,
      }
    },
  },
}

// Helper function to create portable text array configuration
export const createPortableTextArray = (options?: {
  includeImages?: boolean
  required?: boolean
}) => {
  const { includeImages = true, required = false } = options || {}

  const of = [portableTextBlock]
  if (includeImages) {
    of.push(imageConfig as any)
  }

  return {
    type: 'array',
    of,
    validation: required ? ((Rule: any) => Rule.required()) : undefined,
  }
}
