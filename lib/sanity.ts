// confessed-web/src/lib/sanity.ts
// Read-only Sanity client for confessed-web

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'clfxgc6n'
const DATASET    = process.env.NEXT_PUBLIC_SANITY_DATASET    ?? 'production'
const API_VER    = 'v2021-10-21'

const QUERY_URL  = `https://${PROJECT_ID}.api.sanity.io/${API_VER}/data/query/${DATASET}`

export async function sanityFetch<T = unknown>(groq: string): Promise<T> {
  const url = `${QUERY_URL}?query=${encodeURIComponent(groq)}`
  const res = await fetch(url, { next: { revalidate: 60 } })
  if (!res.ok) throw new Error(`Sanity fetch failed: ${res.status}`)
  const data = await res.json()
  return data.result as T
}

export interface Resource {
  _id:         string
  _createdAt:  string
  title:       string
  description: string
  type:        string
  series:      string | null
  fileUrl:     string
}

export async function fetchPublishedResources(): Promise<Resource[]> {
  const groq = `*[_type == "resource" && published == true] | order(_createdAt desc) {
    _id, _createdAt, title, description, type, series,
    "fileUrl": file.asset->url
  }`
  return sanityFetch<Resource[]>(groq)
}
