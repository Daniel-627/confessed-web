// lib/api.ts
import { useAuth } from '@clerk/nextjs'

const API_URL = process.env.NEXT_PUBLIC_API_URL!

// For use in React components (client-side)
export function useApi() {
  const { getToken } = useAuth()

  async function request<T>(
    path: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = await getToken()

    const res = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    })

    if (!res.ok) {
      const error = await res.json().catch(() => ({}))
      throw new Error(error.error ?? `Request failed: ${res.status}`)
    }

    return res.json()
  }

  return { request }
}