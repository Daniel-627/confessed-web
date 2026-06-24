// app/resources/page.tsx
import type { Metadata } from 'next'
import { fetchPublishedResources, type Resource } from '@/lib/sanity'
import ResourcesClient from './ResourcesClient'

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Free Reformed Baptist study guides, confession texts, sermon outlines, and curriculum packs.',
}

export default async function ResourcesPage() {
  const resources = await fetchPublishedResources().catch(() => [] as Resource[])
  return <ResourcesClient resources={resources} />
}
