import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function migrateWeaponTypeScaling() {
  console.log('Starting weaponType scaling migration...')

  // Fetch all weaponType documents that have attributeScaling defined
  const weaponTypes = await client.fetch(
    `*[_type == "weaponType" && defined(attributeScaling)] {
      _id,
      _rev,
      name,
      attributeScaling
    }`
  )

  console.log(`Found ${weaponTypes.length} weaponType document(s) to check`)

  let migratedCount = 0
  let errorCount = 0
  let skippedCount = 0

  for (const weaponType of weaponTypes) {
    try {
      let needsUpdate = false

      // Map through the attributeScaling array and update scalingType values
      const updatedScaling = weaponType.attributeScaling.map((scaling: any) => {
        if (scaling.scalingType === 'primary') {
          needsUpdate = true
          return { ...scaling, scalingType: 'major' }
        } else if (scaling.scalingType === 'splash') {
          needsUpdate = true
          return { ...scaling, scalingType: 'minor' }
        }
        return scaling
      })

      if (needsUpdate) {
        await client
          .patch(weaponType._id)
          .set({ attributeScaling: updatedScaling })
          .commit()

        migratedCount++
        console.log(`✓ Migrated weaponType: ${weaponType.name || weaponType._id}`)
      } else {
        skippedCount++
        console.log(`○ Skipped weaponType (already migrated): ${weaponType.name || weaponType._id}`)
      }
    } catch (error) {
      errorCount++
      console.error(`✗ Error migrating weaponType ${weaponType._id}:`, error)
    }
  }

  console.log('\nMigration complete!')
  console.log(`Successfully migrated: ${migratedCount} document(s)`)
  console.log(`Skipped (no changes needed): ${skippedCount} document(s)`)
  if (errorCount > 0) {
    console.log(`Errors: ${errorCount} document(s)`)
  }
}

// Execute the migration
migrateWeaponTypeScaling()
  .then(() => {
    console.log('Migration script finished')
    process.exit(0)
  })
  .catch((err) => {
    console.error('Migration script failed:', err)
    process.exit(1)
  })
