// app/terms/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Confessed.',
}

const LAST_UPDATED = 'June 2026'

export default function TermsPage() {
  return (
    <>
      <style>{`
        .legal-wrap {
          background: #080f1a;
          font-family: var(--font-barlow), sans-serif;
          color: #f0ece0;
          min-height: 100vh;
        }
        .legal-header {
          padding: 72px 64px 48px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          max-width: 860px;
        }
        .legal-eyebrow {
          font-size: 10px; font-weight: 700; letter-spacing: .2em;
          color: rgba(201,169,74,0.5); text-transform: uppercase;
          margin-bottom: 16px;
        }
        .legal-title {
          font-family: var(--font-garamond), serif;
          font-size: clamp(28px, 4vw, 48px);
          font-weight: 400; color: #f0ece0;
          margin-bottom: 12px;
        }
        .legal-updated {
          font-size: 12px; color: rgba(240,236,224,0.25);
        }
        .legal-body {
          padding: 56px 64px 96px;
          max-width: 860px;
        }
        .legal-section { margin-bottom: 48px; }
        .legal-section h2 {
          font-family: var(--font-garamond), serif;
          font-size: 22px; font-weight: 400;
          color: #f0ece0; margin-bottom: 14px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(201,169,74,0.1);
        }
        .legal-section p, .legal-section li {
          font-family: var(--font-garamond), serif;
          font-size: 16px; line-height: 1.85;
          color: rgba(240,236,224,0.55);
          margin-bottom: 14px;
        }
        .legal-section ul {
          padding-left: 20px; margin-bottom: 14px;
        }
        .legal-section a { color: #C9A94A; text-decoration: none; }
        .legal-section a:hover { text-decoration: underline; }

        @media (max-width: 768px) {
          .legal-header { padding: 48px 20px 36px; }
          .legal-body   { padding: 40px 20px 72px; }
        }
      `}</style>

      <div className="legal-wrap">
        <div className="legal-header">
          <p className="legal-eyebrow">Legal</p>
          <h1 className="legal-title">Terms of Service</h1>
          <p className="legal-updated">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="legal-body">
          <div className="legal-section">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing or using Confessed at confessed.faith (the "Platform"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Platform.</p>
          </div>

          <div className="legal-section">
            <h2>2. About Confessed</h2>
            <p>Confessed is a Reformed Baptist theology, apologetics, and discipleship platform. We produce articles, audio, and video content grounded in the Second London Baptist Confession of Faith (1689). Our mission is to make Reformed Baptist theology accessible, compelling, and missional.</p>
          </div>

          <div className="legal-section">
            <h2>3. User Accounts</h2>
            <p>To access certain features of the Platform, you may be required to create an account. You are responsible for:</p>
            <ul>
              <li>Providing accurate and truthful information during registration</li>
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activity that occurs under your account</li>
            </ul>
            <p>We reserve the right to suspend or terminate accounts that violate these Terms or that we determine, in our sole discretion, are being used inappropriately.</p>
          </div>

          <div className="legal-section">
            <h2>4. Contributor Content</h2>
            <p>Contributors who are approved to publish content on the Platform agree that:</p>
            <ul>
              <li>All submitted content is their original work or they have the right to publish it</li>
              <li>Content must be theologically consistent with the Reformed Baptist tradition and the 1689 Confession</li>
              <li>Content must not be defamatory, abusive, or otherwise unlawful</li>
              <li>Confessed retains the right to moderate, suspend, or remove content that violates these standards</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>5. Intellectual Property</h2>
            <p>All content published on Confessed — including articles, audio, video, and design — is the intellectual property of Confessed or its respective contributors. You may not reproduce, distribute, or commercially exploit any content without express written permission.</p>
            <p>Personal, non-commercial sharing of content with appropriate attribution to Confessed is permitted and encouraged.</p>
          </div>

          <div className="legal-section">
            <h2>6. Prohibited Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the Platform for any unlawful purpose</li>
              <li>Attempt to gain unauthorised access to any part of the Platform</li>
              <li>Harass, threaten, or abuse other users or contributors</li>
              <li>Post content that is false, defamatory, or misleading</li>
              <li>Scrape or systematically collect data from the Platform without permission</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2>7. Disclaimer of Warranties</h2>
            <p>The Platform is provided "as is" without warranties of any kind, express or implied. Confessed does not warrant that the Platform will be uninterrupted, error-free, or free of harmful components.</p>
          </div>

          <div className="legal-section">
            <h2>8. Limitation of Liability</h2>
            <p>To the fullest extent permitted by law, Confessed shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Platform.</p>
          </div>

          <div className="legal-section">
            <h2>9. Changes to Terms</h2>
            <p>We reserve the right to update these Terms at any time. Continued use of the Platform after changes constitutes acceptance of the new Terms. We will update the "Last updated" date at the top of this page when changes are made.</p>
          </div>

          <div className="legal-section">
            <h2>10. Contact</h2>
            <p>If you have questions about these Terms, please contact us at <a href="mailto:hello@confessed.faith">hello@confessed.faith</a>.</p>
          </div>
        </div>
      </div>
    </>
  )
}
