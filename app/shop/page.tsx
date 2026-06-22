// app/shop/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Reformed Baptist resources — books, print, and more. Coming soon to Confessed.',
}

export default function ShopPage() {
  return (
    <>
      <style>{`
        .shop-wrap {
          min-height: calc(100vh - 64px);
          background: #080f1a;
          font-family: var(--font-barlow), sans-serif;
          color: #f0ece0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 80px 32px; text-align: center;
          position: relative;
        }
        .shop-wrap::before {
          content: '';
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 60px 60px; pointer-events: none;
        }
        .shop-inner { position: relative; z-index: 2; max-width: 560px; }
        .shop-badge {
          display: inline-block; font-size: 9px; font-weight: 700;
          letter-spacing: .18em; text-transform: uppercase;
          color: rgba(201,169,74,0.6); border: 1px solid rgba(201,169,74,0.2);
          padding: 4px 14px; border-radius: 100px; margin-bottom: 28px;
        }
        .shop-title {
          font-family: var(--font-garamond), serif;
          font-size: clamp(36px, 6vw, 56px);
          font-weight: 400; color: #f0ece0;
          margin-bottom: 16px; line-height: 1.15;
        }
        .shop-title em { font-style: italic; color: #C9A94A; }
        .shop-body {
          font-family: var(--font-garamond), serif;
          font-size: 18px; font-style: italic;
          color: rgba(240,236,224,0.4);
          line-height: 1.75; margin-bottom: 40px;
        }

        /* Preview cards */
        .shop-preview {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 12px; overflow: hidden;
          margin-bottom: 40px;
        }
        .shop-card {
          background: #0b1929; padding: 24px 20px;
          display: flex; flex-direction: column; gap: 8px; align-items: center;
        }
        .shop-card-icon {
          width: 36px; height: 36px;
          border: 1px solid rgba(201,169,74,0.2);
          border-radius: 8px; display: flex;
          align-items: center; justify-content: center;
          color: rgba(201,169,74,0.5); margin-bottom: 4px;
        }
        .shop-card-label {
          font-size: 10px; font-weight: 700; letter-spacing: .14em;
          text-transform: uppercase; color: rgba(240,236,224,0.3);
        }
        .shop-card-sub {
          font-family: var(--font-garamond), serif;
          font-size: 12px; font-style: italic;
          color: rgba(240,236,224,0.2);
        }

        .shop-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
        .shop-btn-gold {
          background: #C9A94A; border: none; color: #080f1a;
          padding: 12px 26px; border-radius: 8px;
          font-size: 13px; font-weight: 700; letter-spacing: .06em;
          text-decoration: none; font-family: var(--font-barlow), sans-serif;
          transition: background .2s;
        }
        .shop-btn-gold:hover { background: #b89840; }
        .shop-btn-ghost {
          background: transparent; border: 1px solid rgba(255,255,255,0.12);
          color: rgba(240,236,224,0.6); padding: 11px 22px; border-radius: 8px;
          font-size: 13px; font-weight: 500;
          text-decoration: none; font-family: var(--font-barlow), sans-serif;
          transition: all .2s;
        }
        .shop-btn-ghost:hover { border-color: rgba(201,169,74,0.3); color: #f0ece0; }

        @media (max-width: 480px) {
          .shop-preview { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="shop-wrap">
        <div className="shop-inner">
          <span className="shop-badge">Coming Soon</span>
          <h1 className="shop-title">Resources for<br />the <em>confessing</em> church</h1>
          <p className="shop-body">
            Books, prints, and theological resources — curated for the
            Reformed Baptist believer. Launching soon.
          </p>

          <div className="shop-preview">
            {[
              { label: 'Books',  sub: 'Theology & apologetics' },
              { label: 'Prints', sub: 'Scripture & confession' },
              { label: 'More',   sub: 'Resources & curriculum' },
            ].map(c => (
              <div key={c.label} className="shop-card">
                <div className="shop-card-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
                  </svg>
                </div>
                <span className="shop-card-label">{c.label}</span>
                <span className="shop-card-sub">{c.sub}</span>
              </div>
            ))}
          </div>

          <div className="shop-actions">
            <Link href="/#newsletter" className="shop-btn-gold">Notify me when it launches</Link>
            <Link href="/articles" className="shop-btn-ghost">Read the articles</Link>
          </div>
        </div>
      </div>
    </>
  )
}
