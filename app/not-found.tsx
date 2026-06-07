// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;1,400&family=Barlow:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .nf-root {
          min-height: 100vh;
          background: #080f1a;
          font-family: 'Barlow', sans-serif;
          color: #f0ece0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 32px;
          position: relative;
          overflow: hidden;
        }

        .nf-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .nf-root::after {
          content: '';
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #C9A94A, transparent);
        }

        .nf-number {
          font-family: 'EB Garamond', serif;
          font-size: clamp(100px, 20vw, 180px);
          font-weight: 400;
          color: rgba(201,169,74,0.08);
          line-height: 1;
          position: absolute;
          user-select: none;
          letter-spacing: -.02em;
        }

        .nf-cross {
          font-size: 32px;
          color: #C9A94A;
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
          opacity: 0;
          animation: fadeUp .6s ease forwards .1s;
        }

        .nf-title {
          font-family: 'EB Garamond', serif;
          font-size: clamp(28px, 5vw, 42px);
          font-weight: 400;
          color: #f0ece0;
          margin-bottom: 12px;
          position: relative;
          z-index: 1;
          opacity: 0;
          animation: fadeUp .6s ease forwards .2s;
        }

        .nf-title em {
          font-style: italic;
          color: #C9A94A;
        }

        .nf-desc {
          font-size: 15px;
          color: rgba(240,236,224,0.35);
          max-width: 400px;
          line-height: 1.7;
          margin-bottom: 40px;
          position: relative;
          z-index: 1;
          opacity: 0;
          animation: fadeUp .6s ease forwards .3s;
        }

        .nf-verse {
          font-family: 'EB Garamond', serif;
          font-size: 15px;
          font-style: italic;
          color: rgba(240,236,224,0.25);
          max-width: 380px;
          line-height: 1.75;
          margin-bottom: 8px;
          position: relative;
          z-index: 1;
          opacity: 0;
          animation: fadeUp .6s ease forwards .4s;
        }

        .nf-ref {
          font-size: 10px;
          letter-spacing: .12em;
          color: rgba(201,169,74,0.35);
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 40px;
          position: relative;
          z-index: 1;
          opacity: 0;
          animation: fadeUp .6s ease forwards .45s;
        }

        .nf-btn {
          background: #C9A94A;
          border: none;
          color: #080f1a;
          padding: 12px 28px;
          border-radius: 7px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: .08em;
          cursor: pointer;
          text-decoration: none;
          font-family: 'Barlow', sans-serif;
          position: relative;
          z-index: 1;
          transition: background .2s;
          opacity: 0;
          animation: fadeUp .6s ease forwards .55s;
          display: inline-block;
        }

        .nf-btn:hover { background: #b89840; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="nf-root">
        <span className="nf-number">404</span>
        <span className="nf-cross">✝</span>
        <h1 className="nf-title">Page <em>not found</em></h1>
        <p className="nf-desc">
          This page doesn't exist or has been moved. The word of God endures forever — this URL does not.
        </p>
        <p className="nf-verse">
          "Your word is a lamp to my feet and a light to my path."
        </p>
        <p className="nf-ref">Psalm 119:105 · ESV</p>
        <Link href="/" className="nf-btn">Return home</Link>
      </div>
    </>
  )
}
