// app/give/thank-you/page.tsx
//
// Paystack redirects here with ?trxref=...&reference=...
// The query string is NOT trusted: we ask our API, which re-verifies with Paystack.
'use client'
import { Suspense, useEffect, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const API = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.confessed.faith'

type Result =
  | { state: 'checking' }
  | { state: 'successful'; amount: number; currency: string; name: string | null }
  | { state: 'pending' }
  | { state: 'failed' }
  | { state: 'missing' }

function ThankYou() {
  const params = useSearchParams()
  const txRef = params.get('reference') ?? params.get('trxref')
  const [result, setResult] = useState<Result>({ state: txRef ? 'checking' : 'missing' })

  useEffect(() => {
    if (!txRef) return
    let cancelled = false
    ;(async () => {
      // M-Pesa can confirm a few seconds after redirect, so retry briefly.
      for (let i = 0; i < 6 && !cancelled; i++) {
        try {
          const res = await fetch(`${API}/donations/verify/${encodeURIComponent(txRef)}`)
          if (res.status === 404) return !cancelled && setResult({ state: 'missing' })
          const data = await res.json()
          if (data.status === 'successful') {
            return !cancelled && setResult({ state: 'successful', amount: data.amount, currency: data.currency, name: data.name })
          }
          if (data.status === 'failed') return !cancelled && setResult({ state: 'failed' })
        } catch { /* retry */ }
        await new Promise(r => setTimeout(r, 2500))
      }
      if (!cancelled) setResult({ state: 'pending' })
    })()
    return () => { cancelled = true }
  }, [txRef])

  let title = 'Confirming your gift…'
  let body  = 'One moment while we confirm your payment.'

  if (result.state === 'successful') {
    const money = new Intl.NumberFormat('en-KE', { style: 'currency', currency: result.currency }).format(result.amount)
    title = result.name ? `Thank you, ${result.name}.` : 'Thank you.'
    body  = `Your gift of ${money} has been received. A receipt is on its way to your email. May the Lord bless you for your generosity.`
  } else if (result.state === 'pending') {
    title = 'Still waiting on your payment'
    body  = 'We have not received confirmation yet. If you completed the payment, you will get a receipt by email within a few minutes. If you cancelled, you can try again.'
  } else if (result.state === 'failed') {
    title = 'The payment did not go through'
    body  = 'You have not been charged. You are welcome to try again.'
  } else if (result.state === 'missing') {
    title = 'Nothing to confirm'
    body  = 'We could not find a donation for this link.'
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080f1a', color: '#f0ece0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '96px 24px' }}>
      <div style={{ maxWidth: 520 }}>
        <h1 style={{ fontFamily: 'var(--font-garamond), serif', fontWeight: 400, fontSize: 'clamp(32px, 5vw, 48px)', lineHeight: 1.15, marginBottom: 18 }}>{title}</h1>
        <p style={{ fontFamily: 'var(--font-garamond), serif', fontSize: 18, lineHeight: 1.8, color: 'rgba(240,236,224,0.55)', marginBottom: 32 }}>{body}</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/" style={{ background: '#C9A94A', color: '#080f1a', padding: '13px 28px', borderRadius: 8, fontSize: 13, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'var(--font-barlow), sans-serif' }}>Back home</Link>
          {(result.state === 'failed' || result.state === 'pending') && (
            <Link href="/give" style={{ border: '1px solid rgba(255,255,255,0.15)', color: '#f0ece0', padding: '13px 28px', borderRadius: 8, fontSize: 13, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', textDecoration: 'none', fontFamily: 'var(--font-barlow), sans-serif' }}>Try again</Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={null}>
      <ThankYou />
    </Suspense>
  )
}
