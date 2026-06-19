// app/articles/[slug]/page.tsx
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

const API = process.env.NEXT_PUBLIC_API_URL ?? 'https://api.confessed.faith'

interface Article {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  tags: string[]
  readingTimeMinutes: number | null
  publishedAt: string | null
  authorId: string
  series: { id: string; name: string; slug: string } | null
}

async function getArticle(slug: string): Promise<Article | null> {
  try {
    const res = await fetch(`${API}/articles/${slug}`, { next: { revalidate: 60 } })
    if (!res.ok) return null
    const data = await res.json()
    return data.article ?? null
  } catch {
    return null
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return { title: 'Article not found' }
  return {
    title: article.title,
    description: article.excerpt ?? undefined,
  }
}

export default async function ArticleDetailPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) notFound()

  const publishedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'long', year: 'numeric',
      })
    : null

  return (
    <>
      <style>{`
        .ad-wrap {
          min-height: 100vh;
          background: #080f1a;
          font-family: var(--font-barlow), sans-serif;
          color: #f0ece0;
        }

        /* Article header */
        .ad-header {
          max-width: 760px;
          margin: 0 auto;
          padding: 64px 32px 48px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .ad-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: .06em;
          color: rgba(240,236,224,0.35);
          text-decoration: none;
          text-transform: uppercase;
          margin-bottom: 40px;
          transition: color .15s;
        }
        .ad-back:hover { color: rgba(240,236,224,0.7); }
        .ad-back-arrow { font-size: 14px; }

        .ad-series {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: #C9A94A;
          margin-bottom: 16px;
          display: block;
        }

        .ad-title {
          font-family: var(--font-garamond), serif;
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 400;
          line-height: 1.15;
          color: #f0ece0;
          margin-bottom: 20px;
        }

        .ad-excerpt {
          font-family: var(--font-garamond), serif;
          font-size: 20px;
          font-style: italic;
          color: rgba(240,236,224,0.45);
          line-height: 1.65;
          margin-bottom: 32px;
        }

        .ad-meta {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px 16px;
        }
        .ad-meta-item {
          font-size: 12px;
          color: rgba(240,236,224,0.3);
          letter-spacing: .04em;
        }
        .ad-meta-dot {
          width: 2px; height: 2px;
          border-radius: 50%;
          background: rgba(240,236,224,0.15);
        }

        /* Tags */
        .ad-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 24px;
        }
        .ad-tag {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: rgba(201,169,74,0.5);
          border: 1px solid rgba(201,169,74,0.15);
          padding: 3px 10px;
          border-radius: 100px;
        }

        /* Article body */
        .ad-body {
          max-width: 760px;
          margin: 0 auto;
          padding: 56px 32px 96px;
        }

        /* Markdown typography */
        .ad-content { font-family: var(--font-garamond), serif; }

        .ad-content p {
          font-size: 19px;
          line-height: 1.85;
          color: rgba(240,236,224,0.85);
          margin-bottom: 28px;
        }

        .ad-content h2 {
          font-family: var(--font-garamond), serif;
          font-size: 28px;
          font-weight: 500;
          color: #f0ece0;
          margin: 52px 0 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(201,169,74,0.12);
        }

        .ad-content h3 {
          font-family: var(--font-garamond), serif;
          font-size: 22px;
          font-weight: 500;
          color: #f0ece0;
          margin: 40px 0 16px;
        }

        .ad-content blockquote {
          border-left: 3px solid #C9A94A;
          margin: 36px 0;
          padding: 4px 0 4px 28px;
        }

        .ad-content blockquote p {
          font-size: 20px;
          font-style: italic;
          color: rgba(240,236,224,0.6);
          margin-bottom: 0;
        }

        .ad-content hr {
          border: none;
          border-top: 1px solid rgba(255,255,255,0.07);
          margin: 48px 0;
        }

        .ad-content strong {
          color: #f0ece0;
          font-weight: 600;
        }

        .ad-content em { font-style: italic; }

        .ad-content ul, .ad-content ol {
          padding-left: 24px;
          margin-bottom: 28px;
        }

        .ad-content li {
          font-size: 19px;
          line-height: 1.75;
          color: rgba(240,236,224,0.8);
          margin-bottom: 8px;
        }

        .ad-content a {
          color: #C9A94A;
          text-decoration: underline;
          text-decoration-color: rgba(201,169,74,0.3);
          transition: text-decoration-color .15s;
        }
        .ad-content a:hover { text-decoration-color: #C9A94A; }

        .ad-content code {
          font-size: 14px;
          background: rgba(201,169,74,0.08);
          color: #C9A94A;
          padding: 2px 6px;
          border-radius: 4px;
          font-family: monospace;
        }

        /* Footer rule */
        .ad-footer-rule {
          max-width: 760px;
          margin: 0 auto 64px;
          padding: 0 32px;
          display: flex;
          align-items: center;
          gap: 16px;
          color: rgba(240,236,224,0.1);
          font-size: 12px;
          letter-spacing: .1em;
        }
        .ad-footer-rule::before,
        .ad-footer-rule::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255,255,255,0.06);
        }

        /* Responsive */
        @media (max-width: 768px) {
          .ad-header { padding: 40px 20px 36px; }
          .ad-body   { padding: 40px 20px 72px; }
          .ad-footer-rule { padding: 0 20px; }
          .ad-content p  { font-size: 17px; }
          .ad-content h2 { font-size: 24px; }
          .ad-content h3 { font-size: 20px; }
          .ad-content blockquote p { font-size: 18px; }
          .ad-content li { font-size: 17px; }
          .ad-excerpt { font-size: 18px; }
        }
      `}</style>

      <div className="ad-wrap">
        <div className="ad-header">
          <Link href="/articles" className="ad-back">
            <span className="ad-back-arrow">&#8592;</span> Articles
          </Link>

          {article.series && (
            <Link href={`/articles?series=${article.series.slug}`} className="ad-series">
              {article.series.name}
            </Link>
          )}

          <h1 className="ad-title">{article.title}</h1>

          {article.excerpt && (
            <p className="ad-excerpt">{article.excerpt}</p>
          )}

          <div className="ad-meta">
            {publishedDate && (
              <span className="ad-meta-item">{publishedDate}</span>
            )}
            {article.readingTimeMinutes && publishedDate && (
              <span className="ad-meta-dot" />
            )}
            {article.readingTimeMinutes && (
              <span className="ad-meta-item">{article.readingTimeMinutes} min read</span>
            )}
          </div>

          {article.tags && article.tags.length > 0 && (
            <div className="ad-tags">
              {article.tags.map(t => (
                <span key={t} className="ad-tag">{t}</span>
              ))}
            </div>
          )}
        </div>

        <div className="ad-body">
          <div className="ad-content">
            <ReactMarkdown>{article.content}</ReactMarkdown>
          </div>
        </div>

        <div className="ad-footer-rule">
          ✝
        </div>
      </div>
    </>
  )
}
