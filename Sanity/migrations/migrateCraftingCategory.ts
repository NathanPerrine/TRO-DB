import { getCliClient } from 'sanity/cli';

const client = getCliClient();

async function migrateCraftingCategory() {
  // Fetch guides with category 'crafting'
  const guides = await client.fetch(
    `*[_type == "guide" && category == "crafting"]{
      _id,
      _rev,
      title,
      category
    }`
  )

  for (const guide of guides) {
    await client
      .patch(guide._id)
      .set({ category: 'enchanting and crafting' })
      .commit()
  }
}

migrateCraftingCategory()
  .then(() => {
    console.log('Migration script finished')
    process.exit(0)
  })
  .catch((err) => {
    console.error('Migration script failed:', err)
    process.exit(1)
  })