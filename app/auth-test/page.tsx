// app/auth-test/page.tsx
'use client'
import { useUser, useAuth, SignOutButton } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

export default function AuthTestPage() {
  const { user, isLoaded } = useUser()
  const { getToken } = useAuth()
  const [apiResult, setApiResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoaded || !user) return
    testApi()
  }, [isLoaded, user])

  async function testApi() {
    try {
      const t = await getToken()
      setToken(t)

      const res = await fetch('http://localhost:3001/me', {
        headers: { Authorization: `Bearer ${t}` },
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setApiResult(data)
    } catch (e: any) {
      setError(e.message)
    }
  }

  if (!isLoaded) return <p>Loading...</p>

  if (!user) {
    return (
      <div className="p-8">
        <p>Not signed in.</p>
        <a href="/sign-in" className="underline">Sign in</a>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-6 font-mono text-sm">
      <h1 className="text-xl font-bold">Auth Test</h1>

      <section>
        <h2 className="font-bold mb-1">Clerk user</h2>
        <pre className="bg-gray-100 p-3 rounded">
          {JSON.stringify({ id: user.id, email: user.primaryEmailAddress?.emailAddress }, null, 2)}
        </pre>
      </section>

      <section>
        <h2 className="font-bold mb-1">Bearer token (first 60 chars)</h2>
        <pre className="bg-gray-100 p-3 rounded break-all">
          {token ? token.slice(0, 60) + '...' : 'none'}
        </pre>
      </section>

      <section>
        <h2 className="font-bold mb-1">GET /me response</h2>
        {error ? (
          <pre className="bg-red-100 text-red-700 p-3 rounded">{error}</pre>
        ) : (
          <pre className="bg-green-100 p-3 rounded">
            {apiResult ? JSON.stringify(apiResult, null, 2) : 'Loading...'}
          </pre>
        )}
      </section>

      <SignOutButton>
        <button className="underline">Sign out</button>
      </SignOutButton>
    </div>
  )
}