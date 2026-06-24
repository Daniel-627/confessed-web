// app/resources/ResourcesClient.tsx
'use client'
import { useState } from 'react'
import type { Resource } from '@/lib/sanity'

const TYPES = [
  { value: '',                  label: 'All types' },
  { value: 'study-guide',      label: 'Study Guides' },
  { value: 'confession-text',  label: 'Confession Texts' },
  { value: 'sermon-outline',   label: 'Sermon Outlines' },
  { value: 'curriculum-pack',  label: 'Curriculum Packs' },
]

const SERIES = [
  { value: '',                    label: 'All series' },
  { value: 'articles-of-faith',   label: 'Articles of Faith' },
  { value: 'the-1689-project',    label: 'The 1689 Project' },
  { value: 'iron-and-ink',        label: 'Iron & Ink' },
  { value: 'other-paths',         label: 'Other Paths' },
  { value: 'reasoned-grace',      label: 'Reasoned Grace' },
  { value: 'the-particular-path', label: 'The Particular Path' },
  { value: 'daily-office',        label: 'Daily Office' },
  { value: 'consistent-truth',    label: 'Consistent Truth' },
]

const TYPE_LABELS: Record<string, string> = {
  'study-guide':     'Study Guide',
  'confession-text': 'Confession Text',
  'sermon-outline':  'Sermon Outline',
  'curriculum-pack': 'Curriculum Pack',
}

export default function ResourcesClient({ resources }: { resources: Resource[] }) {
  const [typeFilter,   setTypeFilter]   = useState('')
  const [seriesFilter, setSeriesFilter] = useState('')

  const filtered = resources.filter(r =>
    (!typeFilter   || r.type   === typeFilter) &&
    (!seriesFilter || r.series === seriesFilter)
  )

  return (
    <>
      <style>{`
        .rs-wrap {
          min-height: 100vh; background: #080f1a;
          font-family: var(--font-barlow), sans-serif; color: #f0ece0;
        }

        /* Header */
        .rs-header {
          padding: 72px 64px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .rs-eyebrow {
          display: flex; align-items: center; gap: 10px; margin-bottom: 20px;
        }
        .rs-eyebrow-line { width: 28px; height: 1px; background: #C9A94A; }
        .rs-eyebrow-text {
          font-size: 10px; font-weight: 700; letter-spacing: .2em;
          color: #C9A94A; text-transform: uppercase;
        }
        .rs-title {
          font-family: var(--font-garamond), serif;
          font-size: clamp(32px, 5vw, 56px); font-weight: 400;
          color: #f0ece0; line-height: 1.1; margin-bottom: 10px;
        }
        .rs-title em { font-style: italic; color: #C9A94A; }
        .rs-sub {
          font-family: var(--font-garamond), serif;
          font-size: 17px; font-style: italic;
          color: rgba(240,236,224,0.35); margin-bottom: 36px;
        }

        /* Filters */
        .rs-filters {
          display: flex; gap: 12px; flex-wrap: wrap;
          padding-bottom: 0;
        }
        .rs-filter-select {
          background: #081422; border: 1px solid rgba(255,255,255,0.08);
          border-radius: 6px; padding: 8px 14px;
          font-size: 12px; font-weight: 600; color: rgba(240,236,224,0.6);
          font-family: var(--font-barlow), sans-serif; outline: none;
          cursor: pointer; transition: border-color .2s;
          letter-spacing: .04em;
        }
        .rs-filter-select:focus { border-color: rgba(201,169,74,0.4); }
        .rs-filter-select option { background: #0b1929; }

        /* Tabs row */
        .rs-type-tabs {
          display: flex; gap: 0; overflow-x: auto; scrollbar-width: none;
          margin: 0 -64px; padding: 0 64px;
        }
        .rs-type-tabs::-webkit-scrollbar { display: none; }
        .rs-type-tab {
          flex-shrink: 0; padding: 12px 0; margin-right: 28px;
          font-size: 12px; font-weight: 600; letter-spacing: .06em;
          color: rgba(240,236,224,0.35); background: none; border: none;
          border-bottom: 2px solid transparent; cursor: pointer;
          font-family: var(--font-barlow), sans-serif; transition: all .15s;
          white-space: nowrap;
        }
        .rs-type-tab:hover { color: rgba(240,236,224,0.7); }
        .rs-type-tab.active { color: #f0ece0; border-bottom-color: #C9A94A; }

        /* Body */
        .rs-body { padding: 48px 64px 80px; }
        .rs-count {
          font-size: 11px; color: rgba(240,236,224,0.2);
          margin-bottom: 28px; letter-spacing: .06em; text-transform: uppercase;
        }

        /* Grid */
        .rs-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px;
        }
        .rs-card {
          background: #080f1a; padding: 28px 24px;
          border: 1px solid rgba(255,255,255,0.05); border-radius: 8px;
          display: flex; flex-direction: column; gap: 12px;
          transition: background .2s, border-color .2s;
        }
        .rs-card:hover { background: #0b1929; border-color: rgba(201,169,74,0.12); }

        .rs-card-type {
          font-size: 9px; font-weight: 700; letter-spacing: .16em;
          text-transform: uppercase; color: #C9A94A;
        }
        .rs-card-title {
          font-family: var(--font-garamond), serif;
          font-size: 18px; color: #f0ece0; line-height: 1.3; font-weight: 400;
        }
        .rs-card-desc {
          font-family: var(--font-garamond), serif;
          font-size: 14px; font-style: italic; line-height: 1.65;
          color: rgba(240,236,224,0.4); flex: 1;
        }
        .rs-card-series {
          font-size: 10px; color: rgba(240,236,224,0.2);
          letter-spacing: .06em;
        }
        .rs-card-footer {
          display: flex; align-items: center; justify-content: space-between;
          padding-top: 14px; border-top: 1px solid rgba(255,255,255,0.05);
        }
        .rs-download {
          display: inline-flex; align-items: center; gap: 6px;
          background: transparent; border: 1px solid rgba(201,169,74,0.25);
          color: #C9A94A; padding: 7px 16px; border-radius: 6px;
          font-size: 11px; font-weight: 700; letter-spacing: .08em;
          text-decoration: none; font-family: var(--font-barlow), sans-serif;
          text-transform: uppercase; transition: all .2s;
        }
        .rs-download:hover { background: rgba(201,169,74,0.08); border-color: rgba(201,169,74,0.5); }

        /* Free badge */
        .rs-free {
          font-size: 9px; font-weight: 700; letter-spacing: .12em;
          text-transform: uppercase; color: rgba(129,199,132,0.6);
          border: 1px solid rgba(129,199,132,0.2); padding: 2px 8px; border-radius: 100px;
        }

        /* Empty */
        .rs-empty {
          text-align: center; padding: 80px 0;
          font-family: var(--font-garamond), serif; font-size: 18px;
          font-style: italic; color: rgba(240,236,224,0.2);
        }

        @media (max-width: 1024px) {
          .rs-header { padding: 56px 40px 0; }
          .rs-type-tabs { margin: 0 -40px; padding: 0 40px; }
          .rs-body { padding: 40px 40px 64px; }
          .rs-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .rs-header { padding: 40px 20px 0; }
          .rs-type-tabs { margin: 0 -20px; padding: 0 20px; }
          .rs-body { padding: 32px 20px 56px; }
          .rs-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="rs-wrap">
        <div className="rs-header">
          <div className="rs-eyebrow">
            <span className="rs-eyebrow-line" />
            <span className="rs-eyebrow-text">Free resources</span>
            <span className="rs-eyebrow-line" />
          </div>
          <h1 className="rs-title">Reformed <em>resources</em><br />for the church</h1>
          <p className="rs-sub">
            Study guides, confession texts, sermon outlines, and curriculum packs —
            free for the body of Christ.
          </p>

          {/* Series filter */}
          <div className="rs-filters">
            <select
              title="Filter by series"
              className="rs-filter-select"
              value={seriesFilter}
              onChange={e => setSeriesFilter(e.target.value)}
            >
              {SERIES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>

          {/* Type tabs */}
          <div className="rs-type-tabs" role="tablist">
            {TYPES.map(t => (
              <button
                key={t.value}
                role="tab"
                className={`rs-type-tab${typeFilter === t.value ? ' active' : ''}`}
                onClick={() => setTypeFilter(t.value)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="rs-body">
          <p className="rs-count">{filtered.length} resource{filtered.length !== 1 ? 's' : ''}</p>

          {filtered.length === 0 ? (
            <p className="rs-empty">No resources found for this filter.</p>
          ) : (
            <div className="rs-grid">
              {filtered.map(r => (
                <div key={r._id} className="rs-card">
                  <span className="rs-card-type">{TYPE_LABELS[r.type] ?? r.type}</span>
                  <h2 className="rs-card-title">{r.title}</h2>
                  {r.description && <p className="rs-card-desc">{r.description}</p>}
                  {r.series && (
                    <span className="rs-card-series">
                      {SERIES.find(s => s.value === r.series)?.label}
                    </span>
                  )}
                  <div className="rs-card-footer">
                    <a
                      href={r.fileUrl}
                      target="_blank"
                      rel="noopener"
                      download
                      className="rs-download"
                    >
                      Download PDF
                    </a>
                    <span className="rs-free">Free</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
