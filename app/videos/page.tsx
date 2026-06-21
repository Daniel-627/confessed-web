// app/videos/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Videos',
  description: 'Reformed Baptist video content — coming soon to Confessed.',
}

export default function VideosPage() {
  return (
    <>
      <style>{`
        .cs-wrap {
          min-height: calc(100vh - 64px);
          background: #080f1a;
          font-family: var(--font-barlow), sans-serif;
          color: #f0ece0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 32px;
          text-align: center;
          position: relative;
        }
        .cs-wrap::before {
          content: '';
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .cs-inner { position: relative; z-index: 2; max-width: 560px; }
        .cs-cross { color: #C9A94A; font-size: 28px; margin-bottom: 28px; display: block; }
        .cs-badge {
          display: inline-block;
          font-size: 9px; font-weight: 700; letter-spacing: .18em;
          text-transform: uppercase; color: rgba(201,169,74,0.6);
          border: 1px solid rgba(201,169,74,0.2);
          padding: 4px 14px; border-radius: 100px;
          margin-bottom: 24px;
        }
        .cs-title {
          font-family: var(--font-garamond), serif;
          font-size: clamp(36px, 6vw, 56px);
          font-weight: 400; color: #f0ece0;
          margin-bottom: 16px; line-height: 1.15;
        }
        .cs-title em { font-style: italic; color: #C9A94A; }
        .cs-body {
          font-family: var(--font-garamond), serif;
          font-size: 18px; font-style: italic;
          color: rgba(240,236,224,0.4);
          line-height: 1.75; margin-bottom: 40px;
        }
        .cs-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .cs-btn-gold {
          background: #C9A94A; border: none; color: #080f1a;
          padding: 12px 26px; border-radius: 8px;
          font-size: 13px; font-weight: 700; letter-spacing: .06em;
          text-decoration: none; font-family: var(--font-barlow), sans-serif;
          transition: background .2s;
        }
        .cs-btn-gold:hover { background: #b89840; }
        .cs-btn-ghost {
          background: transparent; border: 1px solid rgba(255,255,255,0.12);
          color: rgba(240,236,224,0.6);
          padding: 11px 22px; border-radius: 8px;
          font-size: 13px; font-weight: 500;
          text-decoration: none; font-family: var(--font-barlow), sans-serif;
          transition: all .2s;
        }
        .cs-btn-ghost:hover { border-color: rgba(201,169,74,0.3); color: #f0ece0; }
      `}</style>
      <div className="cs-wrap">
        <div className="cs-inner">
          <span className="cs-cross">✝</span>
          <span className="cs-badge">Coming Soon</span>
          <h1 className="cs-title">Video is<br /><em>on the way</em></h1>
          <p className="cs-body">
            Long-form theology, apologetics, and discipleship — produced and hosted
            independently. No platform dependencies. No algorithmic interference.
            Just the Word, taught faithfully.
          </p>
          <div className="cs-actions">
            <a
              href="https://www.youtube.com/@ConfessedFaith"
              target="_blank"
              rel="noopener"
              className="cs-btn-gold"
            >
              Watch on YouTube for now
            </a>
            <Link href="/articles" className="cs-btn-ghost">Read the articles</Link>
          </div>
        </div>
      </div>
    </>
  )
}
