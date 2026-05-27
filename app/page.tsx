// app/page.tsx
'use client'
import { useUser, SignInButton, SignOutButton } from '@clerk/nextjs'
import { useApi } from '@/lib/api'
import { useEffect, useState } from 'react'

export default function Home() {
  const { user, isLoaded } = useUser()
  const { request } = useApi()
  const [me, setMe] = useState<any>(null)

  useEffect(() => {
    if (user) request('/me').then(setMe).catch(console.error)
  }, [user])

  if (!isLoaded) return <p>Loading...</p>

  return (
    <main className="p-8 space-y-4">
      {!user ? (
        <SignInButton mode="modal"><button>Sign in</button></SignInButton>
      ) : (
        <>
          <p>Signed in as {user.primaryEmailAddress?.emailAddress}</p>
          <pre className="text-xs bg-gray-100 p-4 rounded">
            {JSON.stringify(me, null, 2)}
          </pre>
          <SignOutButton><button>Sign out</button></SignOutButton>
        </>
      )}
    </main>
  )
}