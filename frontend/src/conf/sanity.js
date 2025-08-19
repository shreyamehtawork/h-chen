import {createClient} from '@sanity/client'

export const client = createClient({
  projectId: 'm7haexyk',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2025-02-06',
})