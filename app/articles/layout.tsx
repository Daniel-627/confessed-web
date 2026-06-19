import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Reformed Baptist theology, apologetics, and discipleship — written by confessional contributors.',
}

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
