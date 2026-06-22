// components/home/ContributeCTA.tsx

export default function ContributeCTA() {
  return (
    <>
      <style>{`
        .cc-section {
          background: #080f1a;
          padding: 96px 64px;
          border-top: 1px solid rgba(255,255,255,0.05);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }
        .cc-left {}
        .cc-eyebrow {
          font-size: 10px; font-weight: 700; letter-spacing: .2em;
          color: rgba(201,169,74,0.5); text-transform: uppercase; margin-bottom: 10px;
        }
        .cc-title {
          font-family: var(--font-garamond), serif;
          font-size: clamp(28px, 4vw, 48px); font-weight: 400;
          color: #f0ece0; line-height: 1.15; margin-bottom: 20px;
        }
        .cc-title em { font-style: italic; color: #C9A94A; }
        .cc-body {
          font-family: var(--font-garamond), serif;
          font-size: 17px; line-height: 1.8;
          color: rgba(240,236,224,0.5); margin-bottom: 32px;
        }
        .cc-actions { display: flex; gap: 12px; flex-wrap: wrap; }
        .cc-btn-gold {
          background: #C9A94A; border: none; color: #080f1a;
          padding: 13px 28px; border-radius: 8px;
          font-size: 13px; font-weight: 700; letter-spacing: .06em;
          text-decoration: none; font-family: var(--font-barlow), sans-serif;
          transition: background .2s;
        }
        .cc-btn-gold:hover { background: #b89840; }
        .cc-btn-ghost {
          background: transparent; border: 1px solid rgba(255,255,255,0.12);
          color: rgba(240,236,224,0.6); padding: 12px 24px; border-radius: 8px;
          font-size: 13px; font-weight: 500;
          text-decoration: none; font-family: var(--font-barlow), sans-serif;
          transition: all .2s;
        }
        .cc-btn-ghost:hover { border-color: rgba(201,169,74,0.35); color: #f0ece0; }

        /* Right — requirements */
        .cc-right {
          display: flex; flex-direction: column; gap: 0;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 12px; overflow: hidden;
        }
        .cc-req {
          padding: 20px 24px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          display: flex; gap: 16px; align-items: flex-start;
        }
        .cc-req:last-child { border-bottom: none; }
        .cc-req-num {
          font-family: var(--font-garamond), serif;
          font-size: 22px; color: rgba(201,169,74,0.25);
          flex-shrink: 0; line-height: 1; margin-top: 2px;
        }
        .cc-req-title {
          font-size: 13px; font-weight: 600; color: #f0ece0; margin-bottom: 4px;
        }
        .cc-req-desc {
          font-family: var(--font-garamond), serif;
          font-size: 14px; font-style: italic;
          color: rgba(240,236,224,0.35); line-height: 1.6;
        }

        .cc-quote {
          padding: 32px 0 0; border-top: none;
          margin-top: 24px;
        }
        .cc-quote-text {
          font-family: var(--font-garamond), serif;
          font-size: 16px; font-style: italic;
          color: rgba(240,236,224,0.25); line-height: 1.75;
          padding-left: 20px;
          border-left: 2px solid rgba(201,169,74,0.2);
        }

        @media (max-width: 900px) {
          .cc-section { grid-template-columns: 1fr; gap: 48px; padding: 72px 40px; }
        }
        @media (max-width: 560px) { .cc-section { padding: 56px 20px; } }
      `}</style>

      <section className="cc-section">
        <div className="cc-left">
          <p className="cc-eyebrow">Contribute</p>
          <h2 className="cc-title">Write for<br /><em>Confessed</em></h2>
          <p className="cc-body">
            Confessed is built by contributors who write from conviction.
            If you hold to the Reformed Baptist faith, write clearly,
            and have something worth saying — we want to hear from you.
          </p>
          <div className="cc-actions">
            <a href="https://contribute.confessed.faith/apply" className="cc-btn-gold">
              Apply to contribute
            </a>
            <a href="/about" className="cc-btn-ghost">Learn more</a>
          </div>
          <div className="cc-quote">
            <p className="cc-quote-text">
              "Hold fast the pattern of sound words which you have heard from me,
              in faith and love which are in Christ Jesus." — 2 Timothy 1:13
            </p>
          </div>
        </div>

        <div className="cc-right">
          {[
            { num: '01', title: 'Confessional',   desc: 'You hold to the 1689 Second London Baptist Confession as a faithful summary of Scripture.' },
            { num: '02', title: 'Theological',    desc: 'Your writing engages ideas with depth, precision, and clear grounding in the Word.' },
            { num: '03', title: 'Accessible',     desc: 'You write for the church, not the academy — without sacrificing seriousness.' },
            { num: '04', title: 'Gospel-centred', desc: 'Every piece points toward the good news of Jesus Christ crucified and risen.' },
          ].map(r => (
            <div key={r.num} className="cc-req">
              <span className="cc-req-num">{r.num}</span>
              <div>
                <p className="cc-req-title">{r.title}</p>
                <p className="cc-req-desc">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
