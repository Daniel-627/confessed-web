// app/apply/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Apply to Contribute',
}

export default function ApplyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
