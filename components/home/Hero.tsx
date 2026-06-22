// components/home/Hero.tsx
// Extracted from app/page.tsx — untouched

export default function Hero() {
  return (
    <>
      <style>{`
        .home-hero-wrap {
          min-height: 100vh;
          background: #080f1a;
          font-family: var(--font-barlow), sans-serif;
          color: #f0ece0;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }
        .home-hero-wrap::before {
          content: '';
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none; z-index: 0;
        }
        .hero {
          position: relative; z-index: 2; flex: 1;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          text-align: center; padding: 80px 32px 60px;
        }
        .hero-eyebrow {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 32px; opacity: 0;
          animation: fadeUp .6s ease forwards .1s;
        }
        .eyebrow-line { width: 32px; height: 1px; background: #C9A94A; }
        .eyebrow-text {
          font-size: 10px; font-weight: 600; letter-spacing: .2em;
          color: #C9A94A; text-transform: uppercase;
        }
        .hero-title {
          font-family: var(--font-garamond), serif;
          font-size: clamp(48px, 8vw, 96px);
          font-weight: 500; line-height: 1.05; color: #f0ece0;
          margin-bottom: 8px; opacity: 0;
          animation: fadeUp .7s ease forwards .2s;
        }
        .hero-title em { font-style: italic; color: #C9A94A; }
        .hero-subtitle {
          font-family: var(--font-garamond), serif;
          font-size: clamp(20px, 3vw, 28px); font-style: italic;
          color: rgba(240,236,224,0.45); margin-bottom: 40px;
          opacity: 0; animation: fadeUp .7s ease forwards .35s;
        }
        .hero-verse {
          max-width: 560px; margin: 0 auto 48px;
          opacity: 0; animation: fadeUp .7s ease forwards .45s;
        }
        .hero-verse p {
          font-family: var(--font-garamond), serif;
          font-size: 18px; line-height: 1.8;
          color: rgba(240,236,224,0.55); font-style: italic; margin-bottom: 10px;
        }
        .hero-verse cite {
          font-size: 11px; letter-spacing: .12em; color: #C9A94A;
          font-style: normal; font-weight: 600; text-transform: uppercase;
        }
        .hero-cta {
          display: flex; gap: 12px; align-items: center; justify-content: center;
          opacity: 0; animation: fadeUp .7s ease forwards .55s;
          flex-wrap: wrap;
        }
        .btn-primary-lg {
          background: #C9A94A; border: none; color: #080f1a;
          padding: 14px 32px; border-radius: 8px;
          font-size: 14px; font-weight: 700; letter-spacing: .08em;
          cursor: pointer; text-decoration: none;
          font-family: var(--font-barlow), sans-serif; transition: background .2s;
        }
        .btn-primary-lg:hover { background: #b89840; }
        .btn-outline-lg {
          background: transparent; border: 1px solid rgba(255,255,255,0.15);
          color: rgba(240,236,224,0.7); padding: 13px 28px; border-radius: 8px;
          font-size: 14px; font-weight: 500; letter-spacing: .04em;
          cursor: pointer; text-decoration: none;
          font-family: var(--font-barlow), sans-serif; transition: all .2s;
        }
        .btn-outline-lg:hover { border-color: rgba(201,169,74,0.4); color: #f0ece0; }
        .pillars {
          position: relative; z-index: 2;
          display: flex; justify-content: center; gap: 1px;
          border-top: 1px solid rgba(255,255,255,0.05);
          opacity: 0; animation: fadeUp .7s ease forwards .7s;
        }
        .pillar {
          flex: 1; max-width: 320px; padding: 40px 48px;
          border-right: 1px solid rgba(255,255,255,0.05); text-align: center;
        }
        .pillar:last-child { border-right: none; }
        .pillar-cross { font-size: 20px; color: #C9A94A; margin-bottom: 12px; display: block; }
        .pillar-title {
          font-size: 10px; font-weight: 700; letter-spacing: .18em;
          color: rgba(240,236,224,0.5); text-transform: uppercase; margin-bottom: 8px;
        }
        .pillar-desc {
          font-family: var(--font-garamond), serif;
          font-size: 15px; line-height: 1.65;
          color: rgba(240,236,224,0.35); font-style: italic;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .hero { padding: 60px 24px 40px; }
          .pillars { flex-direction: column; align-items: center; }
          .pillar { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.05); max-width: 100%; padding: 32px 24px; }
          .pillar:last-child { border-bottom: none; }
        }
      `}</style>

      <div className="home-hero-wrap">
        <section className="hero">
          <div className="hero-eyebrow">
            <span className="eyebrow-line" />
            <span className="eyebrow-text">Reformed · Confessional · Gospel-Centred</span>
            <span className="eyebrow-line" />
          </div>
          <h1 className="hero-title">
            Not Ashamed<br />of the <em>Gospel</em>
          </h1>
          <p className="hero-subtitle">Theology. Apologetics. Discipleship.</p>
          <div className="hero-verse">
            <p>"For I am not ashamed of the gospel, for it is the power of God for salvation to everyone who believes."</p>
            <cite>Romans 1:16 · ESV</cite>
          </div>
          <div className="hero-cta">
            <a href="/sign-up" className="btn-primary-lg">Join Confessed</a>
            <a href="/articles" className="btn-outline-lg">Read the articles</a>
          </div>
        </section>

        <div className="pillars">
          {[
            { title: 'Reformed',       desc: 'Grounded in the great confessions of the church — Westminster, Heidelberg, 1689.' },
            { title: 'Confessional',   desc: 'We confess with our mouths that Jesus is Lord and believe in our hearts.' },
            { title: 'Gospel-Centred', desc: 'Every article, sermon, and study anchored to the power of Christ crucified.' },
          ].map(p => (
            <div key={p.title} className="pillar">
              <span className="pillar-cross">✝</span>
              <p className="pillar-title">{p.title}</p>
              <p className="pillar-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
