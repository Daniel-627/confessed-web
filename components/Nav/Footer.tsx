// components/Nav/Footer.tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { ShoppingBag } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL!

const footerLinks = {
  Explore: [
    { label: 'Articles',     href: '/articles' },
    { label: 'Videos',       href: '/videos' },
    { label: 'Podcasts',     href: '/podcasts' },
    { label: 'Daily Office', href: '/daily-office' },
  ],
  Community: [
    { label: 'About',      href: '/about' },
    { label: 'Contact',    href: '/contact' },
    { label: 'Contribute', href: 'https://contribute.confessed.faith' },
    { label: 'Resources',  href: '/resources' },
  ],
  Legal: [
    { label: 'Privacy Policy',     href: '/privacy' },
    { label: 'Terms of Service',   href: '/terms' },
    { label: 'Statement of Faith', href: '/statement-of-faith' },
  ],
}

const socials = [
  {
    href:  'https://www.youtube.com/@ConfessedFaith',
    label: 'YouTube',
    icon:  <FaYoutube size={18} />,
  },
  {
    href:  'https://x.com/ConfessedFaith',
    label: 'X / Twitter',
    icon:  <FaXTwitter size={17} />,
  },
  {
    href:  '/shop',
    label: 'Shop',
    icon:  <ShoppingBag size={17} strokeWidth={2} />,
  },
]

type NewsletterState = 'idle' | 'loading' | 'success' | 'error'

export default function Footer() {
  const [email,  setEmail]  = useState('')
  const [state,  setState]  = useState<NewsletterState>('idle')
  const [errMsg, setErrMsg] = useState('')

  async function handleSubscribe() {
    const trimmed = email.trim().toLowerCase()
    if (!trimmed) return
    setState('loading')
    setErrMsg('')
    try {
      const res = await fetch(`${API_URL}/newsletter`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email: trimmed, source: 'footer' }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error ?? 'Something went wrong')
      }
      setState('success')
      setEmail('')
    } catch (e: any) {
      setErrMsg(e.message ?? 'Something went wrong')
      setState('error')
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleSubscribe()
  }

  return (
    <>
      <style>{`
        .footer {
          background: #040d18;
          border-top: 1px solid rgba(201,169,74,0.12);
          font-family: var(--font-barlow), sans-serif;
          color: #f0ece0;
        }
        .footer-accent {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,169,74,0.4), transparent);
        }
        .footer-main {
          display: grid;
          grid-template-columns: 1.8fr repeat(3, 1fr);
          gap: 48px; padding: 64px 64px 48px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .footer-brand {}
        .footer-logo {
          display: flex; align-items: center; gap: 10px;
          text-decoration: none; margin-bottom: 16px;
        }
        .footer-cross { color: #C9A94A; font-size: 20px; }
        .footer-wordmark {
          font-size: 13px; font-weight: 700;
          letter-spacing: .22em; color: #f0ece0;
        }
        .footer-tagline {
          font-family: var(--font-garamond), serif;
          font-size: 15px; font-style: italic;
          color: rgba(240,236,224,0.4); line-height: 1.7;
          margin-bottom: 20px; max-width: 260px;
        }
        .footer-tags {
          display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 28px;
        }
        .footer-tag {
          font-size: 9px; font-weight: 600; letter-spacing: .12em;
          color: rgba(201,169,74,0.5); border: 1px solid rgba(201,169,74,0.15);
          padding: 4px 10px; border-radius: 100px; text-transform: uppercase;
        }
        .footer-newsletter {}
        .newsletter-label {
          font-size: 10px; font-weight: 700; letter-spacing: .14em;
          color: rgba(240,236,224,0.4); text-transform: uppercase; margin-bottom: 8px;
        }
        .newsletter-desc {
          font-size: 12px; color: rgba(240,236,224,0.3);
          margin-bottom: 12px; line-height: 1.6;
        }
        .newsletter-form { display: flex; gap: 8px; }
        .newsletter-input {
          flex: 1; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1); border-radius: 6px;
          padding: 9px 14px; font-size: 13px; color: #f0ece0;
          font-family: var(--font-barlow), sans-serif; outline: none;
          transition: border-color .2s; min-width: 0;
        }
        .newsletter-input::placeholder { color: rgba(240,236,224,0.2); }
        .newsletter-input:focus { border-color: rgba(201,169,74,0.4); }
        .newsletter-input:disabled { opacity: .5; cursor: not-allowed; }
        .newsletter-btn {
          background: #C9A94A; border: none; color: #080f1a;
          padding: 9px 18px; border-radius: 6px; font-size: 12px;
          font-weight: 700; letter-spacing: .06em; cursor: pointer;
          font-family: var(--font-barlow), sans-serif; white-space: nowrap;
          transition: background .2s; flex-shrink: 0;
        }
        .newsletter-btn:hover:not(:disabled) { background: #b89840; }
        .newsletter-btn:disabled { opacity: .5; cursor: not-allowed; }
        .newsletter-feedback {
          margin-top: 8px; font-size: 12px; line-height: 1.5;
        }
        .newsletter-feedback.success { color: #81c784; }
        .newsletter-feedback.error   { color: #e57373; }
        .footer-col {}
        .footer-col-title {
          font-size: 10px; font-weight: 700; letter-spacing: .16em;
          color: rgba(240,236,224,0.35); text-transform: uppercase; margin-bottom: 20px;
        }
        .footer-col-links {
          display: flex; flex-direction: column; gap: 12px;
          list-style: none; padding: 0; margin: 0;
        }
        .footer-col-links a {
          font-size: 13px; color: rgba(240,236,224,0.45);
          text-decoration: none; transition: color .2s;
        }
        .footer-col-links a:hover { color: #f0ece0; }
        .footer-bottom {
          display: flex; align-items: center; justify-content: space-between;
          padding: 24px 64px; flex-wrap: wrap; gap: 12px;
        }
        .footer-copy { font-size: 11px; color: rgba(240,236,224,0.2); }
        .footer-copy a { color: rgba(201,169,74,0.4); text-decoration: none; }
        .footer-copy a:hover { color: #C9A94A; }
        .footer-socials { display: flex; align-items: center; gap: 6px; }
        .footer-social-icon {
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(240,236,224,0.3);
          text-decoration: none;
          transition: border-color .2s, color .2s, background .2s;
        }
        .footer-social-icon:hover {
          border-color: rgba(201,169,74,0.35);
          color: #C9A94A;
          background: rgba(201,169,74,0.06);
        }
        .footer-verse {
          width: 100%; text-align: center; padding: 0 64px 24px;
        }
        .footer-verse p {
          font-family: var(--font-garamond), serif;
          font-size: 13px; font-style: italic; color: rgba(240,236,224,0.15);
        }
        @media (max-width: 900px) {
          .footer-main { grid-template-columns: 1fr 1fr; padding: 48px 32px 40px; gap: 40px; }
          .footer-brand { grid-column: 1 / -1; }
          .footer-bottom { padding: 20px 32px; }
          .footer-verse { padding: 0 32px 20px; }
        }
        @media (max-width: 560px) {
          .footer-main { grid-template-columns: 1fr; padding: 40px 20px 32px; }
          .footer-bottom { padding: 16px 20px; flex-direction: column; align-items: flex-start; }
          .footer-verse { padding: 0 20px 16px; }
          .newsletter-form { flex-direction: column; }
        }
      `}</style>

      <footer className="footer">
        <div className="footer-accent" />
        <div className="footer-main">
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              <span className="footer-cross">✝</span>
              <span className="footer-wordmark">CONFESSED</span>
            </Link>
            <p className="footer-tagline">
              "For I am not ashamed of the gospel, for it is the power of God for salvation."
            </p>
            <div className="footer-tags">
              {['Reformed', 'Confessional', 'Gospel-Centred'].map(t => (
                <span key={t} className="footer-tag">{t}</span>
              ))}
            </div>

            <div className="footer-newsletter" id="newsletter">
              <p className="newsletter-label">Newsletter</p>
              <p className="newsletter-desc">Gospel-centred articles and resources, straight to your inbox.</p>

              {state === 'success' ? (
                <p className="newsletter-feedback success">
                  You're subscribed. Check your inbox for a welcome email.
                </p>
              ) : (
                <>
                  <div className="newsletter-form">
                    <input
                      type="email"
                      className="newsletter-input"
                      placeholder="your@email.com"
                      value={email}
                      onChange={e => { setEmail(e.target.value); if (state === 'error') setState('idle') }}
                      onKeyDown={handleKey}
                      disabled={state === 'loading'}
                    />
                    <button
                      className="newsletter-btn"
                      onClick={handleSubscribe}
                      disabled={state === 'loading' || !email.trim()}
                    >
                      {state === 'loading' ? 'Subscribing…' : 'Subscribe'}
                    </button>
                  </div>
                  {state === 'error' && (
                    <p className="newsletter-feedback error">{errMsg}</p>
                  )}
                </>
              )}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="footer-col">
              <p className="footer-col-title">{title}</p>
              <ul className="footer-col-links">
                {links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-verse">
          <p>"If you confess with your mouth that Jesus is Lord and believe in your heart that God raised him from the dead, you will be saved." — Romans 10:9</p>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} <a href="https://confessed.faith">Confessed</a>. All rights reserved.
          </p>
          <div className="footer-socials">
            {socials.map(s => (
              <Link
                key={s.label}
                href={s.href}
                className="footer-social-icon"
                aria-label={s.label}
                {...(s.href.startsWith('http') ? { target: '_blank', rel: 'noopener' } : {})}
              >
                {s.icon}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}
