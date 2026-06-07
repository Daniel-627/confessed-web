'use client'
import { useUser, SignOutButton } from '@clerk/nextjs'
import { useApi } from '@/lib/api'
import { useEffect, useState } from 'react'

export default function Home() {
  const { user, isLoaded } = useUser()
  const { request } = useApi()
  const [me, setMe] = useState<any>(null)

  useEffect(() => {
    if (user) request('/me').then(setMe).catch(console.error)
  }, [user])

  if (!isLoaded) return <p style={{color:'white', padding:'2rem'}}>Loading...</p>

  return (
    <main style={{padding:'2rem'}}>
      {!user ? (
        <a href="/sign-in" style={{color:'#C9A94A'}}>Sign in</a>
      ) : (
        <>
          <p style={{color:'white'}}>Signed in as {user.primaryEmailAddress?.emailAddress}</p>
          <pre style={{color:'white', fontSize:'12px', marginTop:'1rem'}}>
            {JSON.stringify(me, null, 2)}
          </pre>
          <SignOutButton><button style={{color:'#C9A94A', marginTop:'1rem'}}>Sign out</button></SignOutButton>
        </>
      )}
    </main>
  )
}