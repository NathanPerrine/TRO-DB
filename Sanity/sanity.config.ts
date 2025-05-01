import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { structure } from './Structures'
import { templates } from './Templates'

export default defineConfig({
  name: 'default',
  title: 'TRO-DB',

  projectId: 'tg3ixu9i',
  dataset: 'production',

  plugins: [
    structureTool({ structure: structure }),
    visionTool(),
  ],

  schema: { types: schemaTypes, templates: templates },
})
