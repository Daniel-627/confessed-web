// components/nav.tsx
'use client'
import { useUser, SignOutButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function Nav() {
  const { user, isLoaded } = useUser()

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 64px',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
      fontFamily: 'var(--font-barlow), sans-serif',
      position: 'relative',
      zIndex: 5,
    }}>
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
        <span style={{ color: '#C9A94A', fontSize: 22 }}>✝</span>
        <span style={{ color: '#f0ece0', fontSize: 14, fontWeight: 700, letterSpacing: '.2em' }}>CONFESSED</span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {!isLoaded ? null : user ? (
          <>
            <Link href="/dashboard" style={{ color: 'rgba(240,236,224,0.6)', fontSize: 13, textDecoration: 'none' }}>
              Dashboard
            </Link>
            <SignOutButton redirectUrl="/">
              <button style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(240,236,224,0.5)',
                padding: '7px 16px',
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 500,
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}>Sign out</button>
            </SignOutButton>
          </>
        ) : (
          <>
            <Link href="/sign-in" style={{
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(240,236,224,0.7)',
              padding: '8px 20px',
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 500,
              textDecoration: 'none',
            }}>Sign in</Link>
            <Link href="/sign-up" style={{
              background: '#C9A94A',
              color: '#080f1a',
              padding: '9px 22px',
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 700,
              textDecoration: 'none',
              letterSpacing: '.04em',
            }}>Get started</Link>
          </>
        )}
      </div>
    </nav>
  )
}