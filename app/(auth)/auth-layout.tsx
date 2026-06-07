// app/(auth)/auth-layout.tsx
import type { ReactNode } from 'react'
import Link from 'next/link'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;1,400&family=Barlow:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body { background: #0b1929; }

        .auth-root {
          display: flex;
          min-height: 100vh;
          min-height: 100dvh;
          font-family: 'Barlow', sans-serif;
          background: #0b1929;
        }

        /* LEFT PANEL */
        .auth-left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
          padding: 64px 72px;
          background: #081422;
          border-right: 1px solid rgba(201,169,74,0.15);
          position: relative;
          overflow: hidden;
        }

        .auth-left::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        .auth-left::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #C9A94A, transparent);
        }

        .auth-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
          z-index: 1;
        }

        .auth-cross {
          font-size: 28px;
          color: #C9A94A;
          line-height: 1;
          font-weight: 300;
        }

        .auth-wordmark {
          font-size: 16px;
          font-weight: 700;
          letter-spacing: .22em;
          color: #f0ece0;
        }

        .auth-quote-block {
          position: relative;
          z-index: 1;
        }

        .auth-verse {
          font-family: 'EB Garamond', serif;
          font-size: 20px;
          line-height: 1.75;
          color: rgba(240,236,224,0.6);
          font-style: italic;
          margin-bottom: 16px;
        }

        .auth-ref {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: .14em;
          color: #C9A94A;
          text-transform: uppercase;
        }

        .auth-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          position: relative;
          z-index: 1;
        }

        .auth-tag {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: .14em;
          color: rgba(201,169,74,0.6);
          border: 1px solid rgba(201,169,74,0.2);
          padding: 5px 12px;
          border-radius: 100px;
        }

        /* RIGHT PANEL */
        .auth-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 64px 72px;
          background: #0b1929;
        }

        .auth-form-wrap {
          width: 100%;
          max-width: 440px;
        }

        .auth-heading {
          margin-bottom: 28px;
        }

        .auth-heading h1 {
          font-size: 26px;
          font-weight: 600;
          color: #f0ece0;
          letter-spacing: .01em;
          margin-bottom: 5px;
        }

        .auth-heading p {
          font-size: 14px;
          color: rgba(240,236,224,0.38);
        }

        /* CLERK OVERRIDES */
        .cl-rootBox,
        .cl-signIn-root,
        .cl-signUp-root { width: 100% !important; }

        .cl-card,
        .cl-card:hover,
        .cl-card:focus-within {
          background: transparent !important;
          box-shadow: none !important;
          border: none !important;
          outline: none !important;
          padding: 0 !important;
          margin: 0 !important;
          width: 100% !important;
        }

        /* Remove any inner card sections with borders */
        .cl-cardBox,
        .cl-card__body,
        .cl-card__main {
          background: transparent !important;
          box-shadow: none !important;
          border: none !important;
          padding: 0 !important;
        }

        .cl-headerTitle,
        .cl-headerSubtitle { display: none !important; }

        /* Dark inputs — including autofill override */
        .cl-formFieldInput {
          background: #081422 !important;
          background-color: #081422 !important;
          border: 1px solid rgba(255,255,255,0.12) !important;
          border-radius: 8px !important;
          color: #f0ece0 !important;
          font-size: 14px !important;
          font-family: 'Barlow', sans-serif !important;
          padding: 10px 14px !important;
          transition: border-color .15s !important;
        }

        .cl-formFieldInput:focus {
          border-color: rgba(201,169,74,0.55) !important;
          outline: none !important;
          box-shadow: 0 0 0 3px rgba(201,169,74,0.08) !important;
        }

        /* Fix browser autofill white flash */
        .cl-formFieldInput:-webkit-autofill,
        .cl-formFieldInput:-webkit-autofill:hover,
        .cl-formFieldInput:-webkit-autofill:focus,
        .cl-formFieldInput:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0px 1000px #081422 inset !important;
          -webkit-text-fill-color: #f0ece0 !important;
          caret-color: #f0ece0 !important;
          border: 1px solid rgba(255,255,255,0.12) !important;
        }

        .cl-formFieldLabel {
          color: rgba(240,236,224,0.45) !important;
          font-size: 11px !important;
          font-weight: 600 !important;
          letter-spacing: .1em !important;
          text-transform: uppercase !important;
          font-family: 'Barlow', sans-serif !important;
        }

        .cl-formButtonPrimary {
          background: #C9A94A !important;
          color: #081422 !important;
          font-weight: 700 !important;
          font-size: 13px !important;
          letter-spacing: .08em !important;
          border-radius: 8px !important;
          border: none !important;
          font-family: 'Barlow', sans-serif !important;
        }

        .cl-formButtonPrimary:hover {
          background: #b89840 !important;
        }

        .cl-socialButtonsBlockButton {
          background: rgba(255,255,255,0.04) !important;
          border: 1px solid rgba(255,255,255,0.1) !important;
          border-radius: 8px !important;
          color: rgba(240,236,224,0.75) !important;
        }

        .cl-socialButtonsBlockButton:hover {
          background: rgba(255,255,255,0.08) !important;
        }

        .cl-socialButtonsBlockButtonText {
          color: rgba(240,236,224,0.75) !important;
        }

        .cl-dividerLine { background: rgba(255,255,255,0.08) !important; }

        .cl-dividerText {
          color: rgba(240,236,224,0.28) !important;
          font-size: 11px !important;
        }

        /* Footer — hide Clerk branding, keep sign up/in link */
        .cl-footer {
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
        }

        /* Hide "Secured by Clerk" and "Development mode" */
        .cl-footerPages,
        .cl-footerPagesLink,
        .cl-internal-b3fm6y,
        .cl-badge,
        [data-localization-key="developmentMode"],
        .cl-footer__bottom { display: none !important; }

        .cl-footerAction {
          background: transparent !important;
          border-top: 1px solid rgba(255,255,255,0.06) !important;
          padding-top: 16px !important;
          margin-top: 8px !important;
          justify-content: center !important;
        }

        .cl-footerActionText {
          color: rgba(240,236,224,0.35) !important;
          font-family: 'Barlow', sans-serif !important;
        }

        .cl-footerActionLink {
          color: #C9A94A !important;
          font-weight: 600 !important;
          font-family: 'Barlow', sans-serif !important;
        }

        .cl-footerActionLink:hover { color: #e0bf6a !important; }

        .cl-identityPreviewText { color: rgba(240,236,224,0.8) !important; }
        .cl-identityPreviewEditButton { color: #C9A94A !important; }

        .cl-formFieldInputShowPasswordButton svg {
          color: rgba(240,236,224,0.35) !important;
        }

        /* OTP code inputs */
        .cl-otpCodeFieldInput {
          background: #081422 !important;
          background-color: #081422 !important;
          border: 1px solid rgba(255,255,255,0.12) !important;
          color: #f0ece0 !important;
          border-radius: 8px !important;
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .auth-left { padding: 48px 40px; }
          .auth-right { padding: 48px 40px; }
          .auth-verse { font-size: 18px; }
        }

        @media (max-width: 700px) {
          .auth-root { flex-direction: column; }
          .auth-left {
            width: 100%;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 20px 24px;
            border-right: none;
            border-bottom: 1px solid rgba(201,169,74,0.15);
          }
          .auth-left::before { display: none; }
          .auth-quote-block { display: none; }
          .auth-tags { display: none; }
          .auth-right { padding: 32px 24px; justify-content: flex-start; }
        }

        @media (max-width: 420px) {
          .auth-right { padding: 24px 16px; }
          .auth-heading h1 { font-size: 22px; }
        }
      `}</style>

      <div className="auth-root">
        <div className="auth-left">
          <Link href="/" className="auth-logo" style={{ textDecoration: 'none' }}>
  <span className="auth-cross">✝</span>
  <span className="auth-wordmark">CONFESSED</span>
</Link>
          <div className="auth-quote-block">
            <p className="auth-verse">
              "For I am not ashamed of the gospel, for it is the power of God
              for salvation to everyone who believes."
            </p>
            <p className="auth-ref">Romans 1:16 · ESV</p>
          </div>
          <div className="auth-tags">
            {['REFORMED', 'CONFESSIONAL', 'GOSPEL-CENTRED'].map((t) => (
              <span key={t} className="auth-tag">{t}</span>
            ))}
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-form-wrap">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
