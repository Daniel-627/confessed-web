// components/home/SeriesShowcase.tsx

const SERIES = [
  { name: 'Articles of Faith',   slug: 'articles-of-faith',   ref: 'Ephesians 4:13',       desc: 'The flagship systematic theology series — every major doctrine from a confessional standpoint.' },
  { name: 'The 1689 Project',    slug: 'the-1689-project',    ref: '2 Timothy 1:13',       desc: 'Article by article through the Second London Baptist Confession of Faith.' },
  { name: 'Iron & Ink',          slug: 'iron-and-ink',        ref: '1 Peter 3:15',         desc: 'Presuppositional apologetics — equipping believers to defend the faith against every challenge.' },
  { name: 'Other Paths',         slug: 'other-paths',         ref: 'Jude 1:3',             desc: 'Careful, irenic engagement with other Christian traditions — always steel-manning before responding.' },
  { name: 'Reasoned Grace',      slug: 'reasoned-grace',      ref: 'Isaiah 1:18',          desc: 'The front door of Confessed — for the honest non-believer with serious questions.' },
  { name: 'The Particular Path', slug: 'the-particular-path', ref: 'Jeremiah 6:16',        desc: 'The story of Reformed Baptist Christianity from the Particular Baptists to today.' },
  { name: 'Daily Office',        slug: 'daily-office',        ref: 'Psalm 119:105',        desc: 'Short daily devotionals tied to a structured Bible reading plan.' },
  { name: 'Consistent Truth',    slug: 'consistent-truth',    ref: '2 Corinthians 10:5',   desc: 'Cultural commentary — current events, ethics, and the arts examined through Scripture.' },
]

export default function SeriesShowcase() {
  return (
    <>
      <style>{`
        .ss-section {
          background: #040d18;
          padding: 96px 64px;
          border-top: 1px solid rgba(201,169,74,0.1);
        }
        .ss-header { margin-bottom: 56px; }
        .ss-eyebrow {
          font-size: 10px; font-weight: 700; letter-spacing: .2em;
          color: rgba(201,169,74,0.5); text-transform: uppercase; margin-bottom: 10px;
        }
        .ss-title {
          font-family: var(--font-garamond), serif;
          font-size: clamp(28px, 4vw, 44px); font-weight: 400;
          color: #f0ece0; line-height: 1.15;
        }
        .ss-title em { font-style: italic; color: #C9A94A; }
        .ss-sub {
          font-family: var(--font-garamond), serif;
          font-size: 17px; font-style: italic;
          color: rgba(240,236,224,0.35); margin-top: 12px;
          max-width: 560px;
        }

        .ss-grid {
          display: grid; grid-template-columns: repeat(4, 1fr);
          gap: 1px; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 12px; overflow: hidden;
        }
        .ss-card {
          background: #040d18; padding: 28px 24px;
          text-decoration: none; display: flex; flex-direction: column; gap: 10px;
          transition: background .2s;
        }
        .ss-card:hover { background: #080f1a; }
        .ss-card-ref {
          font-size: 9px; font-weight: 700; letter-spacing: .14em;
          text-transform: uppercase; color: rgba(201,169,74,0.4);
        }
        .ss-card-name {
          font-family: var(--font-garamond), serif;
          font-size: 18px; color: #f0ece0; line-height: 1.3;
        }
        .ss-card-desc {
          font-family: var(--font-garamond), serif;
          font-size: 13px; font-style: italic; line-height: 1.65;
          color: rgba(240,236,224,0.3);
        }

        .ss-footer {
          margin-top: 40px; text-align: center;
        }
        .ss-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent; border: 1px solid rgba(255,255,255,0.12);
          color: rgba(240,236,224,0.6); padding: 12px 28px; border-radius: 8px;
          font-size: 13px; font-weight: 500; letter-spacing: .04em;
          text-decoration: none; font-family: var(--font-barlow), sans-serif;
          transition: all .2s;
        }
        .ss-btn:hover { border-color: rgba(201,169,74,0.35); color: #f0ece0; }

        @media (max-width: 1100px) { .ss-section { padding: 72px 40px; } .ss-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 640px)  { .ss-section { padding: 56px 20px; } .ss-grid { grid-template-columns: 1fr; } }
      `}</style>

      <section className="ss-section">
        <div className="ss-header">
          <p className="ss-eyebrow">Content</p>
          <h2 className="ss-title">Eight series.<br /><em>One confession.</em></h2>
          <p className="ss-sub">
            From systematic theology to cultural commentary — every series has a distinct job,
            audience, and purpose.
          </p>
        </div>

        <div className="ss-grid">
          {SERIES.map(s => (
            <a key={s.slug} href={`/articles?series=${s.slug}`} className="ss-card">
              <span className="ss-card-ref">{s.ref}</span>
              <span className="ss-card-name">{s.name}</span>
              <span className="ss-card-desc">{s.desc}</span>
            </a>
          ))}
        </div>

        <div className="ss-footer">
          <a href="/articles" className="ss-btn">Browse all articles →</a>
        </div>
      </section>
    </>
  )
}
