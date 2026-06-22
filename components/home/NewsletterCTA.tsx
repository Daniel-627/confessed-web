// components/home/NewsletterCTA.tsx
'use client'
import { useState } from 'react'

const API = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.confessed.faith'

export default function NewsletterCTA() {
  const [email,   setEmail]   = useState('')
  const [sent,    setSent]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  async function handleSubmit() {
    if (!email.trim()) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API}/newsletter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      })
      if (!res.ok) throw new Error('Could not subscribe')
      setSent(true)
    } catch {
      setError('Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        .nl-section {
          background: #040d18;
          border-top: 1px solid rgba(201,169,74,0.1);
          border-bottom: 1px solid rgba(201,169,74,0.1);
          padding: 96px 64px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .nl-section::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse 60% 50% at 50% 100%, rgba(201,169,74,0.04), transparent);
          pointer-events: none;
        }
        .nl-inner { position: relative; z-index: 2; max-width: 560px; margin: 0 auto; }
        .nl-eyebrow {
          font-size: 10px; font-weight: 700; letter-spacing: .2em;
          color: rgba(201,169,74,0.5); text-transform: uppercase; margin-bottom: 16px;
        }
        .nl-title {
          font-family: var(--font-garamond), serif;
          font-size: clamp(28px, 4vw, 44px); font-weight: 400;
          color: #f0ece0; line-height: 1.2; margin-bottom: 14px;
        }
        .nl-title em { font-style: italic; color: #C9A94A; }
        .nl-sub {
          font-family: var(--font-garamond), serif;
          font-size: 17px; font-style: italic;
          color: rgba(240,236,224,0.4); line-height: 1.7; margin-bottom: 36px;
        }
        .nl-form { display: flex; gap: 10px; max-width: 420px; margin: 0 auto 12px; }
        .nl-input {
          flex: 1; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;
          padding: 12px 16px; font-size: 14px; color: #f0ece0;
          font-family: var(--font-barlow), sans-serif; outline: none;
          transition: border-color .2s; min-width: 0;
          caret-color: #C9A94A;
        }
        .nl-input::placeholder { color: rgba(240,236,224,0.2); }
        .nl-input:focus { border-color: rgba(201,169,74,0.4); }
        .nl-btn {
          background: #C9A94A; border: none; color: #080f1a;
          padding: 12px 24px; border-radius: 8px;
          font-size: 13px; font-weight: 700; letter-spacing: .06em;
          cursor: pointer; font-family: var(--font-barlow), sans-serif;
          transition: background .2s; white-space: nowrap; flex-shrink: 0;
        }
        .nl-btn:hover { background: #b89840; }
        .nl-btn:disabled { opacity: .5; cursor: not-allowed; }
        .nl-error { font-size: 12px; color: #e57373; margin-top: 8px; }
        .nl-privacy {
          font-size: 11px; color: rgba(240,236,224,0.2);
          font-family: var(--font-barlow), sans-serif;
        }
        .nl-success {
          font-family: var(--font-garamond), serif;
          font-size: 20px; font-style: italic;
          color: rgba(240,236,224,0.6); padding: 16px 0;
        }
        .nl-success strong { color: #C9A94A; font-style: normal; font-weight: 400; }

        @media (max-width: 640px) {
          .nl-section { padding: 72px 20px; }
          .nl-form { flex-direction: column; }
          .nl-btn { width: 100%; }
        }
      `}</style>

      <section className="nl-section" id="newsletter">
        <div className="nl-inner">
          <p className="nl-eyebrow">Newsletter</p>
          <h2 className="nl-title">Stay in the <em>Word</em></h2>
          <p className="nl-sub">
            Gospel-centred articles, new series, and theological resources —
            delivered to your inbox. No noise.
          </p>

          {sent ? (
            <p className="nl-success">
              <strong>You are subscribed.</strong> Grace and peace to you.
            </p>
          ) : (
            <>
              <div className="nl-form">
                <input
                  className="nl-input"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                />
                <button className="nl-btn" onClick={handleSubmit} disabled={loading}>
                  {loading ? 'Subscribing…' : 'Subscribe'}
                </button>
              </div>
              {error && <p className="nl-error">{error}</p>}
              <p className="nl-privacy">No spam. Unsubscribe at any time.</p>
            </>
          )}
        </div>
      </section>
    </>
  )
}
