// app/articles/page.tsx
// Server component — fetches series + articles directly, no client JS needed.
// Series filter works via URL search params (?series=slug).

import Link from 'next/link'

const API = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.confessed.faith'

interface Series {
  id: string
  name: string
  slug: string
  description: string | null
  verseReference: string | null
}

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string | null
  readingTimeMinutes: number | null
  publishedAt: string | null
  authorId: string
  series: { id: string; name: string; slug: string } | null
}

async function getSeries(): Promise<Series[]> {
  try {
    const res = await fetch(`${API}/series`, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    const data = await res.json()
    return data.series ?? []
  } catch {
    return []
  }
}

async function getArticles(seriesSlug?: string): Promise<Article[]> {
  try {
    const url = seriesSlug
      ? `${API}/articles?series=${encodeURIComponent(seriesSlug)}`
      : `${API}/articles`
    const res = await fetch(url, { next: { revalidate: 60 } })
    if (!res.ok) return []
    const data = await res.json()
    return data.articles ?? []
  } catch {
    return []
  }
}

function formatDate(iso: string | null) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

type Props = {
  searchParams: Promise<{ series?: string }>
}

export default async function ArticlesPage({ searchParams }: Props) {
  const { series: seriesSlug } = await searchParams
  const [seriesList, articles] = await Promise.all([
    getSeries(),
    getArticles(seriesSlug),
  ])

  const activeSeries = seriesList.find(s => s.slug === seriesSlug) ?? null

  return (
    <>
      <style>{`
        .al-page {
          min-height: 100vh;
          background: #080f1a;
          color: #f0ece0;
          font-family: var(--font-barlow), sans-serif;
        }

        /* ── Hero ── */
        .al-hero {
          padding: 72px 64px 56px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          position: relative;
        }

        .al-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .al-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .al-eyebrow-line {
          width: 28px;
          height: 1px;
          background: #C9A94A;
        }

        .al-eyebrow-text {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .2em;
          color: #C9A94A;
          text-transform: uppercase;
        }

        .al-hero-title {
          font-family: var(--font-garamond), serif;
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 400;
          color: #f0ece0;
          line-height: 1.05;
          margin-bottom: 16px;
          position: relative;
        }

        .al-hero-title em {
          font-style: italic;
          color: #C9A94A;
        }

        .al-hero-desc {
          font-family: var(--font-garamond), serif;
          font-size: 18px;
          font-style: italic;
          color: rgba(240,236,224,0.4);
          max-width: 520px;
          line-height: 1.7;
          position: relative;
        }

        /* Active series banner */
        .al-series-banner {
          margin-top: 24px;
          padding: 16px 20px;
          background: rgba(201,169,74,0.06);
          border: 1px solid rgba(201,169,74,0.15);
          border-radius: 8px;
          max-width: 600px;
          position: relative;
        }

        .al-series-banner-name {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #C9A94A;
          margin-bottom: 4px;
        }

        .al-series-banner-desc {
          font-family: var(--font-garamond), serif;
          font-size: 15px;
          font-style: italic;
          color: rgba(240,236,224,0.45);
          line-height: 1.6;
        }

        .al-series-banner-verse {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: .1em;
          color: rgba(201,169,74,0.5);
          text-transform: uppercase;
          margin-top: 8px;
        }

        /* ── Series filter ── */
        .al-filter {
          padding: 0 64px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          gap: 4px;
          overflow-x: auto;
          scrollbar-width: none;
        }

        .al-filter::-webkit-scrollbar { display: none; }

        .al-filter-pill {
          flex-shrink: 0;
          padding: 14px 16px;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: .04em;
          color: rgba(240,236,224,0.4);
          text-decoration: none;
          border-bottom: 2px solid transparent;
          transition: color .15s, border-color .15s;
          white-space: nowrap;
        }

        .al-filter-pill:hover {
          color: rgba(240,236,224,0.75);
        }

        .al-filter-pill.active {
          color: #f0ece0;
          border-bottom-color: #C9A94A;
        }

        /* ── Article list ── */
        .al-body {
          padding: 48px 64px 80px;
          max-width: 1100px;
        }

        .al-count {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: rgba(240,236,224,0.25);
          margin-bottom: 32px;
        }

        .al-list {
          display: flex;
          flex-direction: column;
          gap: 1px;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 10px;
          overflow: hidden;
        }

        .al-card {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 24px;
          align-items: start;
          padding: 28px 32px;
          background: #0b1929;
          text-decoration: none;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: background .15s;
        }

        .al-card:last-child { border-bottom: none; }
        .al-card:hover { background: #0d1e34; }

        .al-card-series {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: #C9A94A;
          margin-bottom: 8px;
        }

        .al-card-title {
          font-family: var(--font-garamond), serif;
          font-size: clamp(18px, 2.5vw, 22px);
          font-weight: 400;
          color: #f0ece0;
          line-height: 1.35;
          margin-bottom: 10px;
        }

        .al-card-excerpt {
          font-family: var(--font-garamond), serif;
          font-size: 15px;
          font-style: italic;
          color: rgba(240,236,224,0.4);
          line-height: 1.65;
          margin-bottom: 16px;
          max-width: 580px;
        }

        .al-card-meta {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .al-card-meta-item {
          font-size: 11px;
          color: rgba(240,236,224,0.25);
          letter-spacing: .04em;
        }

        .al-card-meta-dot {
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background: rgba(240,236,224,0.2);
        }

        .al-card-arrow {
          font-size: 18px;
          color: rgba(201,169,74,0.3);
          align-self: center;
          flex-shrink: 0;
          transition: color .15s, transform .15s;
        }

        .al-card:hover .al-card-arrow {
          color: #C9A94A;
          transform: translateX(4px);
        }

        /* Empty state */
        .al-empty {
          padding: 64px 32px;
          text-align: center;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 10px;
          background: #0b1929;
        }

        .al-empty-title {
          font-family: var(--font-garamond), serif;
          font-size: 24px;
          font-style: italic;
          color: rgba(240,236,224,0.3);
          margin-bottom: 8px;
        }

        .al-empty-sub {
          font-size: 13px;
          color: rgba(240,236,224,0.2);
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .al-hero  { padding: 48px 32px 40px; }
          .al-filter { padding: 0 32px; }
          .al-body  { padding: 36px 32px 64px; }
        }

        @media (max-width: 600px) {
          .al-hero  { padding: 40px 20px 32px; }
          .al-filter { padding: 0 20px; }
          .al-body  { padding: 28px 20px 48px; }
          .al-card  { grid-template-columns: 1fr; padding: 24px 20px; gap: 0; }
          .al-card-arrow { display: none; }
        }
      `}</style>

      <div className="al-page">
        {/* Hero */}
        <div className="al-hero">
          <div className="al-eyebrow">
            <span className="al-eyebrow-line" />
            <span className="al-eyebrow-text">Confessed · Articles</span>
            <span className="al-eyebrow-line" />
          </div>

          <h1 className="al-hero-title">
            {activeSeries ? (
              <><em>{activeSeries.name}</em></>
            ) : (
              <>Written for the <em>truth</em></>
            )}
          </h1>

          {!activeSeries && (
            <p className="al-hero-desc">
              Theology, apologetics, and discipleship — written for the saint, the seeker, and the critic.
            </p>
          )}

          {activeSeries && (
            <div className="al-series-banner">
              <p className="al-series-banner-name">Series</p>
              <p className="al-series-banner-desc">{activeSeries.description}</p>
              {activeSeries.verseReference && (
                <p className="al-series-banner-verse">{activeSeries.verseReference}</p>
              )}
            </div>
          )}
        </div>

        {/* Series filter tabs */}
        <div className="al-filter">
          <Link
            href="/articles"
            className={`al-filter-pill${!seriesSlug ? ' active' : ''}`}
          >
            All
          </Link>
          {seriesList.map(s => (
            <Link
              key={s.id}
              href={`/articles?series=${s.slug}`}
              className={`al-filter-pill${seriesSlug === s.slug ? ' active' : ''}`}
            >
              {s.name}
            </Link>
          ))}
        </div>

        {/* Article list */}
        <div className="al-body">
          <p className="al-count">
            {articles.length} {articles.length === 1 ? 'article' : 'articles'}
            {activeSeries ? ` in ${activeSeries.name}` : ''}
          </p>

          {articles.length === 0 ? (
            <div className="al-empty">
              <p className="al-empty-title">No articles yet.</p>
              <p className="al-empty-sub">
                {activeSeries
                  ? `Nothing published in ${activeSeries.name} yet — check back soon.`
                  : 'No articles published yet — check back soon.'}
              </p>
            </div>
          ) : (
            <div className="al-list">
              {articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.slug}`}
                  className="al-card"
                >
                  <div>
                    {article.series && (
                      <p className="al-card-series">{article.series.name}</p>
                    )}
                    <h2 className="al-card-title">{article.title}</h2>
                    {article.excerpt && (
                      <p className="al-card-excerpt">{article.excerpt}</p>
                    )}
                    <div className="al-card-meta">
                      {article.readingTimeMinutes && (
                        <>
                          <span className="al-card-meta-item">
                            {article.readingTimeMinutes} min read
                          </span>
                          <span className="al-card-meta-dot" />
                        </>
                      )}
                      {article.publishedAt && (
                        <span className="al-card-meta-item">
                          {formatDate(article.publishedAt)}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="al-card-arrow">→</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
