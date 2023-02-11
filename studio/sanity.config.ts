import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {codeInput} from '@sanity/code-input'

export default defineConfig({
  name: 'default',
  title: 'cityinspain.dev',

  projectId: process.env.SANITY_STUDIO_API_PROJECT_ID || '',
  dataset: process.env.SANITY_STUDIO_API_DATASET || '',
  basePath: '/studio',

  plugins: [deskTool(), visionTool(), codeInput()],

  schema: {
    types: schemaTypes,
  },
})
