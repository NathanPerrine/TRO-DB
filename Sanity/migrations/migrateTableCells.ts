import { getCliClient } from 'sanity/cli'

// Migration script to convert table cells from string to portable text array
// Run this with: npx sanity exec migrations/migrateTableCells.ts --with-user-token

const client = getCliClient()

// Convert a string value to a portable text block
function stringToPortableText(text: string) {
  return [
    {
      _type: 'block',
      _key: `block-${Math.random().toString(36).substr(2, 9)}`,
      style: 'normal',
      markDefs: [],
      children: [
        {
          _type: 'span',
          _key: `span-${Math.random().toString(36).substr(2, 9)}`,
          text: text || '',
          marks: [],
        },
      ],
    },
  ]
}

// Recursively process table cells in a content array
function processContentArray(content: any[]): any[] {
  return content.map((item) => {
    if (item._type === 'table' && item.rows) {
      return {
        ...item,
        rows: item.rows.map((row: any) => {
          if (row.cells) {
            return {
              ...row,
              cells: row.cells.map((cell: any) => {
                // If content is a string, convert it to portable text
                if (typeof cell.content === 'string') {
                  return {
                    ...cell,
                    content: stringToPortableText(cell.content),
                  }
                }
                return cell
              }),
            }
          }
          return row
        }),
      }
    }
    return item
  })
}

async function migrateTableCells() {
  console.log('Starting table cell migration...')

  // Fetch all guide documents
  const guides = await client.fetch(
    `*[_type == "guide" && defined(sections)] {
      _id,
      _rev,
      sections
    }`
  )

  console.log(`Found ${guides.length} guide documents to check`)

  let migratedCount = 0
  let errorCount = 0

  for (const guide of guides) {
    try {
      let needsUpdate = false
      const updatedSections = guide.sections.map((section: any) => {
        let sectionUpdated = false

        // Process section content
        if (section.content && Array.isArray(section.content)) {
          const processedContent = processContentArray(section.content)
          if (JSON.stringify(processedContent) !== JSON.stringify(section.content)) {
            section.content = processedContent
            sectionUpdated = true
          }
        }

        // Process subsections
        if (section.subsections && Array.isArray(section.subsections)) {
          section.subsections = section.subsections.map((subsection: any) => {
            if (subsection.content && Array.isArray(subsection.content)) {
              const processedContent = processContentArray(subsection.content)
              if (JSON.stringify(processedContent) !== JSON.stringify(subsection.content)) {
                subsection.content = processedContent
                sectionUpdated = true
              }
            }
            return subsection
          })
        }

        if (sectionUpdated) {
          needsUpdate = true
        }
        return section
      })

      if (needsUpdate) {
        await client
          .patch(guide._id)
          .set({ sections: updatedSections })
          .commit()

        migratedCount++
        console.log(`✓ Migrated guide: ${guide._id}`)
      }
    } catch (error) {
      errorCount++
      console.error(`✗ Error migrating guide ${guide._id}:`, error)
    }
  }

  console.log('\nMigration complete!')
  console.log(`Successfully migrated: ${migratedCount} documents`)
  if (errorCount > 0) {
    console.log(`Errors: ${errorCount} documents`)
  }
}

migrateTableCells()
  .then(() => {
    console.log('Migration script finished')
    process.exit(0)
  })
  .catch((err) => {
    console.error('Migration script failed:', err)
    process.exit(1)
  })
