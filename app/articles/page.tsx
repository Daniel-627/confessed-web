// app/articles/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

const API = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.confessed.faith'

interface Series {
  id: string
  name: string
  slug: string
}

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string | null
  tags: string[]
  readingTimeMinutes: number | null
  publishedAt: string | null
  authorId: string
  series: { id: string; name: string; slug: string } | null
}

function formatDate(iso: string | null) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

export default function ArticlesPage() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const activeSeries = searchParams.get('series') ?? 'all'

  const [seriesList, setSeriesList] = useState<Series[]>([])
  const [articles,   setArticles]   = useState<Article[]>([])
  const [loading,    setLoading]    = useState(true)

  // Load series once
  useEffect(() => {
    fetch(`${API}/series`)
      .then(r => r.json())
      .then(d => setSeriesList(d.series ?? []))
      .catch(() => {})
  }, [])

  // Load articles whenever series filter changes
  useEffect(() => {
    setLoading(true)
    const url = activeSeries === 'all'
      ? `${API}/articles`
      : `${API}/articles?series=${activeSeries}`

    fetch(url)
      .then(r => r.json())
      .then(d => setArticles(d.articles ?? []))
      .catch(() => setArticles([]))
      .finally(() => setLoading(false))
  }, [activeSeries])

  function setFilter(slug: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (slug === 'all') params.delete('series')
    else params.set('series', slug)
    router.replace(`/articles?${params.toString()}`, { scroll: false })
  }

  return (
    <>
      <style>{`
        .al-wrap {
          min-height: 100vh;
          background: #080f1a;
          font-family: var(--font-barlow), sans-serif;
          color: #f0ece0;
        }

        /* Page header */
        .al-header {
          padding: 64px 64px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .al-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .al-eyebrow-line { width: 28px; height: 1px; background: #C9A94A; }
        .al-eyebrow-text {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .2em;
          color: #C9A94A;
          text-transform: uppercase;
        }
        .al-title {
          font-family: var(--font-garamond), serif;
          font-size: clamp(36px, 6vw, 64px);
          font-weight: 400;
          color: #f0ece0;
          line-height: 1.1;
          margin-bottom: 8px;
        }
        .al-title em { font-style: italic; color: #C9A94A; }
        .al-subtitle {
          font-family: var(--font-garamond), serif;
          font-size: 17px;
          font-style: italic;
          color: rgba(240,236,224,0.35);
          margin-bottom: 40px;
        }

        /* Series filter tabs */
        .al-tabs {
          display: flex;
          gap: 0;
          overflow-x: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
          margin: 0 -64px;
          padding: 0 64px;
        }
        .al-tabs::-webkit-scrollbar { display: none; }

        .al-tab {
          flex-shrink: 0;
          padding: 12px 0;
          margin-right: 32px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: .06em;
          color: rgba(240,236,224,0.35);
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          font-family: var(--font-barlow), sans-serif;
          transition: color .15s, border-color .15s;
          white-space: nowrap;
        }
        .al-tab:hover { color: rgba(240,236,224,0.7); }
        .al-tab.active {
          color: #f0ece0;
          border-bottom-color: #C9A94A;
        }

        /* Article grid */
        .al-body { padding: 48px 64px 80px; }

        .al-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
        }

        .al-card {
          background: #080f1a;
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          text-decoration: none;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 8px;
          transition: background .2s, border-color .2s;
        }
        .al-card:hover { background: #0b1929; border-color: rgba(201,169,74,0.15); }

        .al-card-series {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: #C9A94A;
        }

        .al-card-title {
          font-family: var(--font-garamond), serif;
          font-size: 21px;
          line-height: 1.3;
          color: #f0ece0;
          font-weight: 400;
        }

        .al-card-excerpt {
          font-family: var(--font-garamond), serif;
          font-size: 15px;
          line-height: 1.65;
          color: rgba(240,236,224,0.45);
          font-style: italic;
          flex: 1;
          /* Clamp to 3 lines */
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .al-card-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          padding-top: 14px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .al-card-date {
          font-size: 11px;
          color: rgba(240,236,224,0.25);
        }
        .al-card-dot {
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background: rgba(240,236,224,0.15);
          flex-shrink: 0;
        }
        .al-card-rt {
          font-size: 11px;
          color: rgba(240,236,224,0.25);
        }

        /* Empty / loading states */
        .al-state {
          text-align: center;
          padding: 80px 0;
          font-family: var(--font-garamond), serif;
          font-size: 18px;
          font-style: italic;
          color: rgba(240,236,224,0.2);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .al-header { padding: 48px 40px 0; }
          .al-tabs { margin: 0 -40px; padding: 0 40px; }
          .al-body { padding: 40px 40px 64px; }
          .al-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 640px) {
          .al-header { padding: 40px 20px 0; }
          .al-tabs { margin: 0 -20px; padding: 0 20px; }
          .al-body { padding: 32px 20px 56px; }
          .al-grid { grid-template-columns: 1fr; }
          .al-title { font-size: 36px; }
        }
      `}</style>

      <div className="al-wrap">
        <div className="al-header">
          <div className="al-eyebrow">
            <span className="al-eyebrow-line" />
            <span className="al-eyebrow-text">Reformed · Confessional · Gospel-Centered</span>
            <span className="al-eyebrow-line" />
          </div>
          <h1 className="al-title">
            Confessional <em>theology,</em><br />written for the church
          </h1>
          <p className="al-subtitle">
            Articles across doctrine, apologetics, history, and the Christian life.
          </p>

          {/* Series filter tabs */}
          <div className="al-tabs" role="tablist">
            <button
              role="tab"
              className={`al-tab${activeSeries === 'all' ? ' active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All articles
            </button>
            {seriesList.map(s => (
              <button
                key={s.id}
                role="tab"
                className={`al-tab${activeSeries === s.slug ? ' active' : ''}`}
                onClick={() => setFilter(s.slug)}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        <div className="al-body">
          {loading ? (
            <p className="al-state">Loading…</p>
          ) : articles.length === 0 ? (
            <p className="al-state">No articles yet in this series.</p>
          ) : (
            <div className="al-grid">
              {articles.map(a => (
                <Link key={a.id} href={`/articles/${a.slug}`} className="al-card">
                  {a.series && (
                    <span className="al-card-series">{a.series.name}</span>
                  )}
                  <h2 className="al-card-title">{a.title}</h2>
                  {a.excerpt && (
                    <p className="al-card-excerpt">{a.excerpt}</p>
                  )}
                  <div className="al-card-meta">
                    <span className="al-card-date">{formatDate(a.publishedAt)}</span>
                    {a.readingTimeMinutes && (
                      <>
                        <span className="al-card-dot" />
                        <span className="al-card-rt">{a.readingTimeMinutes} min read</span>
                      </>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
