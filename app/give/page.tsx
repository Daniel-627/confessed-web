// app/give/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/nextjs'

const API = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.confessed.faith'

const CURRENCIES = {
  KES: { symbol: 'KSh', presets: [500, 1000, 2500, 5000], min: 50 },
  USD: { symbol: '$',   presets: [5, 10, 25, 50],         min: 1 },
} as const
type Currency = keyof typeof CURRENCIES

export default function GivePage() {
  const { getToken } = useAuth()
  const { user, isLoaded } = useUser()

  const [currency, setCurrency] = useState<Currency>('KES')
  const [amount,   setAmount]   = useState<string>('1000')
  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [message,  setMessage]  = useState('')
  const [anon,     setAnon]     = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState<string | null>(null)

  // Prefill for signed-in donors.
  useEffect(() => {
    if (!isLoaded || !user) return
    setName(n => n || user.fullName || '')
    setEmail(e => e || user.primaryEmailAddress?.emailAddress || '')
  }, [isLoaded, user])

  const cfg = CURRENCIES[currency]

  function pickCurrency(c: Currency) {
    setCurrency(c)
    setAmount(String(CURRENCIES[c].presets[1]))
  }

  async function handleGive() {
    const value = Number(amount)
    if (!Number.isFinite(value) || value < cfg.min) {
      setError(`The minimum gift is ${cfg.symbol} ${cfg.min}.`)
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email so we can send your receipt.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const token = await getToken().catch(() => null)
      const res = await fetch(`${API}/donations/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          amount: value, currency,
          name: name.trim(), email: email.trim(),
          message: message.trim(), anonymous: anon,
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.link) throw new Error(data.error ?? 'Something went wrong')
      window.location.href = data.link // Paystack hosted checkout (M-Pesa, card)
    } catch (e: any) {
      setError(e.message ?? 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <>
      <style>{`
        .gv-wrap { min-height: 100vh; background: #080f1a; color: #f0ece0; font-family: var(--font-barlow), sans-serif; display: grid; grid-template-columns: 1fr 1fr; }
        .gv-left { padding: 96px 64px; border-right: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column; }
        .gv-right { padding: 96px 64px; }
        .gv-eyebrow { display: flex; align-items: center; gap: 10px; margin-bottom: 28px; }
        .gv-eyebrow-line { width: 28px; height: 1px; background: #C9A94A; }
        .gv-eyebrow-text { font-size: 10px; font-weight: 700; letter-spacing: .2em; color: #C9A94A; text-transform: uppercase; }
        .gv-title { font-family: var(--font-garamond), serif; font-size: clamp(32px, 4vw, 52px); font-weight: 400; line-height: 1.15; margin-bottom: 20px; }
        .gv-title em { font-style: italic; color: #C9A94A; }
        .gv-lead { font-family: var(--font-garamond), serif; font-size: 17px; line-height: 1.8; color: rgba(240,236,224,0.5); margin-bottom: 32px; }
        .gv-quote { border-left: 2px solid #C9A94A; padding-left: 18px; margin-top: auto; }
        .gv-quote p { font-family: var(--font-garamond), serif; font-style: italic; font-size: 17px; line-height: 1.7; color: rgba(240,236,224,0.7); margin: 0 0 8px; }
        .gv-quote span { font-size: 11px; font-weight: 700; letter-spacing: .14em; color: #C9A94A; text-transform: uppercase; }
        .gv-form { display: flex; flex-direction: column; gap: 20px; max-width: 480px; }
        .gv-label { font-size: 10px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: rgba(240,236,224,0.35); margin-bottom: 7px; display: block; }
        .gv-cur { display: inline-flex; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; overflow: hidden; }
        .gv-cur button { background: transparent; border: none; color: rgba(240,236,224,0.5); padding: 9px 18px; font-size: 12px; font-weight: 700; letter-spacing: .1em; cursor: pointer; font-family: inherit; }
        .gv-cur button.on { background: rgba(201,169,74,0.12); color: #C9A94A; }
        .gv-presets { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
        .gv-preset { background: #081422; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 13px 0; color: #f0ece0; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; transition: border-color .2s; }
        .gv-preset:hover { border-color: rgba(201,169,74,0.4); }
        .gv-preset.on { border-color: #C9A94A; background: rgba(201,169,74,0.08); color: #C9A94A; }
        .gv-amount { position: relative; }
        .gv-amount span { position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: rgba(240,236,224,0.35); font-size: 14px; }
        .gv-amount input { padding-left: 56px; }
        .gv-input, .gv-textarea { width: 100%; background: #081422; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 12px 16px; font-size: 14px; color: #f0ece0; font-family: inherit; outline: none; transition: border-color .2s; caret-color: #C9A94A; box-sizing: border-box; }
        .gv-input:focus, .gv-textarea:focus { border-color: rgba(201,169,74,0.4); }
        .gv-input::placeholder, .gv-textarea::placeholder { color: rgba(240,236,224,0.2); }
        .gv-textarea { resize: vertical; min-height: 90px; line-height: 1.6; }
        .gv-check { display: flex; align-items: center; gap: 10px; font-size: 13px; color: rgba(240,236,224,0.55); cursor: pointer; }
        .gv-check input { accent-color: #C9A94A; width: 16px; height: 16px; }
        .gv-error { font-size: 12px; color: #e57373; padding: 10px 14px; background: rgba(229,115,115,0.06); border: 1px solid rgba(229,115,115,0.2); border-radius: 6px; }
        .gv-submit { background: #C9A94A; border: none; color: #080f1a; padding: 15px 32px; border-radius: 8px; font-size: 13px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; cursor: pointer; font-family: inherit; transition: background .2s; }
        .gv-submit:hover { background: #b89840; }
        .gv-submit:disabled { opacity: .5; cursor: not-allowed; }
        .gv-note { font-size: 12px; line-height: 1.7; color: rgba(240,236,224,0.3); }
        @media (max-width: 900px) {
          .gv-wrap { grid-template-columns: 1fr; }
          .gv-left { padding: 64px 40px 40px; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.05); }
          .gv-right { padding: 40px 40px 72px; }
          .gv-quote { margin-top: 8px; }
        }
        @media (max-width: 560px) {
          .gv-left { padding: 48px 20px 32px; }
          .gv-right { padding: 32px 20px 64px; }
          .gv-submit { width: 100%; }
        }
      `}</style>

      <div className="gv-wrap">
        <div className="gv-left">
          <div className="gv-eyebrow"><div className="gv-eyebrow-line" /><span className="gv-eyebrow-text">Give</span></div>
          <h1 className="gv-title">Keep the <em>Word</em> free</h1>
          <p className="gv-lead">
            Confessed carries no ads and no paywalls. Every article, video and resource stays
            free to the church because people give. If this work has helped you, consider
            helping it reach someone else.
          </p>
          <div className="gv-quote">
            <p>&ldquo;Each one must give as he has decided in his heart, not reluctantly or under compulsion, for God loves a cheerful giver.&rdquo;</p>
            <span>2 Corinthians 9:7 · ESV</span>
          </div>
        </div>

        <div className="gv-right">
          <div className="gv-form">
            <div>
              <label className="gv-label">Currency</label>
              <div className="gv-cur">
                {(Object.keys(CURRENCIES) as Currency[]).map(c => (
                  <button key={c} type="button" className={c === currency ? 'on' : ''} onClick={() => pickCurrency(c)}>{c}</button>
                ))}
              </div>
            </div>

            <div>
              <label className="gv-label">Amount</label>
              <div className="gv-presets">
                {cfg.presets.map(p => (
                  <button key={p} type="button" className={`gv-preset${Number(amount) === p ? ' on' : ''}`} onClick={() => setAmount(String(p))}>
                    {p.toLocaleString()}
                  </button>
                ))}
              </div>
              <div className="gv-amount" style={{ marginTop: 10 }}>
                <span>{cfg.symbol}</span>
                <input className="gv-input" inputMode="decimal" value={amount} onChange={e => setAmount(e.target.value.replace(/[^0-9.]/g, ''))} placeholder="Other amount" />
              </div>
            </div>

            <div>
              <label className="gv-label">Name (optional)</label>
              <input className="gv-input" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
            </div>
            <div>
              <label className="gv-label">Email (for your receipt)</label>
              <input className="gv-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@email.com" />
            </div>
            <div>
              <label className="gv-label">Message (optional)</label>
              <textarea className="gv-textarea" value={message} onChange={e => setMessage(e.target.value)} placeholder="A note to the team" />
            </div>
            <label className="gv-check">
              <input type="checkbox" checked={anon} onChange={e => setAnon(e.target.checked)} />
              Give anonymously
            </label>

            {error && <div className="gv-error">{error}</div>}

            <button className="gv-submit" onClick={handleGive} disabled={loading}>
              {loading ? 'Opening secure checkout…' : 'Continue to payment'}
            </button>
            <p className="gv-note">
              You&rsquo;ll pay on Paystack&rsquo;s secure checkout with M-Pesa or card. We never see or store your card or M-Pesa details.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
