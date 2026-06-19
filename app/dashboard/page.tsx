'use client'
import { useUser, SignOutButton } from '@clerk/nextjs'
import { useApi } from '@/lib/api'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const { user, isLoaded } = useUser()
  const { request } = useApi()
  const router = useRouter()
  const [me, setMe] = useState<any>(null)

  useEffect(() => {
    if (isLoaded && !user) router.replace('/sign-in')
    if (isLoaded && user) {
      request('/me').then(setMe).catch(console.error)
    }
  }, [isLoaded, user])

  const role = me?.user?.role ?? 'regular'
  const name = me?.user?.displayName ?? user?.firstName ?? 'Friend'

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;1,400&family=Barlow:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .dash {
          min-height: 100vh;
          background: #080f1a;
          font-family: 'Barlow', sans-serif;
          color: #f0ece0;
          display: flex;
          flex-direction: column;
        }

        .dash::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
        }

        /* MAIN */
        .dash-main {
          position: relative;
          z-index: 2;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 80px 32px;
          text-align: center;
        }

        .dash-greeting {
          font-family: 'EB Garamond', serif;
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 400;
          color: #f0ece0;
          margin-bottom: 8px;
          opacity: 0;
          animation: fadeUp .6s ease forwards .1s;
        }

        .dash-greeting em {
          font-style: italic;
          color: #C9A94A;
        }

        .dash-sub {
          font-size: 15px;
          color: rgba(240,236,224,0.35);
          margin-bottom: 56px;
          opacity: 0;
          animation: fadeUp .6s ease forwards .2s;
        }

        /* CARDS */
        .dash-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          overflow: hidden;
          max-width: 800px;
          width: 100%;
          opacity: 0;
          animation: fadeUp .6s ease forwards .35s;
        }

        .dash-card {
          background: #0b1929;
          padding: 32px 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          transition: background .2s;
        }

        .dash-card:hover { background: #0f2035; }

        .card-icon {
          font-size: 22px;
          color: #C9A94A;
          margin-bottom: 4px;
        }

        .card-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .16em;
          color: rgba(240,236,224,0.4);
          text-transform: uppercase;
        }

        .card-value {
          font-family: 'EB Garamond', serif;
          font-size: 15px;
          color: rgba(240,236,224,0.6);
          font-style: italic;
        }

        .card-coming {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: .1em;
          color: rgba(201,169,74,0.4);
          text-transform: uppercase;
          border: 1px solid rgba(201,169,74,0.15);
          padding: 2px 8px;
          border-radius: 100px;
        }

        /* VERSE */
        .dash-verse {
          margin-top: 56px;
          max-width: 480px;
          opacity: 0;
          animation: fadeUp .6s ease forwards .5s;
        }

        .dash-verse p {
          font-family: 'EB Garamond', serif;
          font-size: 17px;
          line-height: 1.8;
          color: rgba(240,236,224,0.3);
          font-style: italic;
          margin-bottom: 8px;
        }

        .dash-verse cite {
          font-size: 10px;
          letter-spacing: .12em;
          color: rgba(201,169,74,0.5);
          font-style: normal;
          font-weight: 600;
          text-transform: uppercase;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 600px) {
          .dash-cards { grid-template-columns: 1fr; }
          .dash-main { padding: 60px 20px; }
        }
      `}</style>

      <div className="dash">
        <main className="dash-main">
          <h1 className="dash-greeting">
            Welcome, <em>{name}</em>
          </h1>
          <p className="dash-sub">Your Confessed dashboard is being prepared.</p>

          <div className="dash-cards">
            {[
              { icon: '✝', label: 'Daily Office', value: 'Morning Prayer', coming: true },
              { icon: '📖', label: 'Bible Reader', value: 'ESV · Romans 1', coming: true },
              { icon: '✍', label: 'Notes', value: 'Personal notes', coming: true },
            ].map((c) => (
              <div key={c.label} className="dash-card">
                <span className="card-icon">{c.icon}</span>
                <span className="card-label">{c.label}</span>
                <span className="card-value">{c.value}</span>
                {c.coming && <span className="card-coming">Coming soon</span>}
              </div>
            ))}
          </div>

          <div className="dash-verse">
            <p>"If you confess with your mouth that Jesus is Lord and believe in your heart that God raised him from the dead, you will be saved."</p>
            <cite>Romans 10:9 · ESV</cite>
          </div>
        </main>
      </div>
    </>
  )
}
