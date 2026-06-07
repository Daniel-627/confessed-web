// app/layout.tsx
import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { EB_Garamond, Barlow } from 'next/font/google'
import Navbar from '@/components/Nav/Navbar'
import Footer from '@/components/Nav/Footer'
import './globals.css'

const garamond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-garamond',
  weight: ['400', '500'],
})

const barlow = Barlow({
  subsets: ['latin'],
  variable: '--font-barlow',
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'Confessed',
    template: 'Confessed | %s',
  },
  description: 'Reformed · Confessional · Gospel-Centred',
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${garamond.variable} ${barlow.variable}`}>
        <body style={{ margin: 0, background: '#080f1a', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}
