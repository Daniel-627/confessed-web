// components/home/LatestArticles.tsx
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const API = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.confessed.faith'

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string | null
  readingTimeMinutes: number | null
  publishedAt: string | null
  series: { name: string; slug: string } | null
}

function formatDate(iso: string | null) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function LatestArticles() {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    fetch(`${API}/articles?limit=3`)
      .then(r => r.json())
      .then(d => setArticles(d.articles ?? []))
      .catch(() => {})
  }, [])

  if (!articles.length) return null

  return (
    <>
      <style>{`
        .la-section {
          background: #080f1a;
          padding: 96px 64px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .la-header {
          display: flex; align-items: baseline; justify-content: space-between;
          margin-bottom: 48px; flex-wrap: wrap; gap: 12px;
        }
        .la-eyebrow {
          font-size: 10px; font-weight: 700; letter-spacing: .2em;
          color: rgba(201,169,74,0.5); text-transform: uppercase;
          margin-bottom: 10px;
        }
        .la-title {
          font-family: var(--font-garamond), serif;
          font-size: clamp(28px, 4vw, 40px); font-weight: 400;
          color: #f0ece0; line-height: 1.15;
        }
        .la-title em { font-style: italic; color: #C9A94A; }
        .la-see-all {
          font-size: 12px; font-weight: 600; letter-spacing: .08em;
          color: rgba(240,236,224,0.35); text-decoration: none;
          text-transform: uppercase; transition: color .15s; white-space: nowrap;
        }
        .la-see-all:hover { color: #C9A94A; }

        .la-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px;
        }
        .la-card {
          background: #080f1a; padding: 36px 32px;
          border: 1px solid rgba(255,255,255,0.05); border-radius: 8px;
          text-decoration: none; display: flex; flex-direction: column; gap: 14px;
          transition: background .2s, border-color .2s;
        }
        .la-card:hover { background: #0b1929; border-color: rgba(201,169,74,0.15); }

        .la-card-series {
          font-size: 9px; font-weight: 700; letter-spacing: .16em;
          text-transform: uppercase; color: #C9A94A;
        }
        .la-card-title {
          font-family: var(--font-garamond), serif;
          font-size: 22px; font-weight: 400; color: #f0ece0; line-height: 1.3;
        }
        .la-card-excerpt {
          font-family: var(--font-garamond), serif;
          font-size: 15px; font-style: italic; line-height: 1.7;
          color: rgba(240,236,224,0.4); flex: 1;
          display: -webkit-box; -webkit-line-clamp: 3;
          -webkit-box-orient: vertical; overflow: hidden;
        }
        .la-card-meta {
          display: flex; align-items: center; gap: 8px;
          padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.05);
          font-size: 11px; color: rgba(240,236,224,0.25);
        }
        .la-card-dot { width: 2px; height: 2px; border-radius: 50%; background: rgba(240,236,224,0.15); }

        @media (max-width: 1024px) { .la-section { padding: 72px 40px; } .la-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 640px)  { .la-section { padding: 56px 20px; } .la-grid { grid-template-columns: 1fr; } }
      `}</style>

      <section className="la-section">
        <div className="la-header">
          <div>
            <p className="la-eyebrow">Latest</p>
            <h2 className="la-title">From the <em>articles</em></h2>
          </div>
          <Link href="/articles" className="la-see-all">All articles →</Link>
        </div>

        <div className="la-grid">
          {articles.map(a => (
            <Link key={a.id} href={`/articles/${a.slug}`} className="la-card">
              {a.series && <span className="la-card-series">{a.series.name}</span>}
              <h3 className="la-card-title">{a.title}</h3>
              {a.excerpt && <p className="la-card-excerpt">{a.excerpt}</p>}
              <div className="la-card-meta">
                {formatDate(a.publishedAt)}
                {a.readingTimeMinutes && (
                  <><span className="la-card-dot" />{a.readingTimeMinutes} min read</>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
