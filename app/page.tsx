// app/page.tsx
'use client'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Hero from '@/components/home/Hero'
import LatestArticles from '@/components/home/LatestArticles'
import SeriesShowcase from '@/components/home/SeriesShowcase'
import ContributeCTA from '@/components/home/ContributeCTA'
import NewsletterCTA from '@/components/home/NewsletterCTA'

export default function HomePage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && user) router.replace('/dashboard')
  }, [isLoaded, user])

  return (
    <>
      <Hero />
      <LatestArticles />
      <SeriesShowcase />
      <ContributeCTA />
      <NewsletterCTA />
    </>
  )
}
