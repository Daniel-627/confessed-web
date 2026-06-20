// app/privacy/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Confessed.',
}

const LAST_UPDATED = 'June 2026'

export default function PrivacyPage() {
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
        .legal-updated { font-size: 12px; color: rgba(240,236,224,0.25); }
        .legal-body { padding: 56px 64px 96px; max-width: 860px; }
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
          color: rgba(240,236,224,0.55); margin-bottom: 14px;
        }
        .legal-section ul { padding-left: 20px; margin-bottom: 14px; }
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
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-updated">Last updated: {LAST_UPDATED}</p>
        </div>
        <div className="legal-body">
          <div className="legal-section">
            <h2>1. Introduction</h2>
            <p>Confessed ("we", "us", "our") is committed to protecting your personal information. This Privacy Policy explains what data we collect, how we use it, and your rights regarding that data when you use confessed.faith.</p>
          </div>
          <div className="legal-section">
            <h2>2. Data We Collect</h2>
            <ul>
              <li><strong style={{color:'#f0ece0'}}>Account data:</strong> Name and email address when you create an account via Clerk.</li>
              <li><strong style={{color:'#f0ece0'}}>Usage data:</strong> Pages visited, articles read, and time spent on the Platform — collected anonymously for analytics.</li>
              <li><strong style={{color:'#f0ece0'}}>Contributor data:</strong> Application details including bio, theological statement, and writing samples submitted during the contributor application process.</li>
              <li><strong style={{color:'#f0ece0'}}>Contact data:</strong> Name, email, and message content when you contact us through the contact form.</li>
            </ul>
          </div>
          <div className="legal-section">
            <h2>3. How We Use Your Data</h2>
            <ul>
              <li>To provide and maintain your account and access to the Platform</li>
              <li>To process contributor applications and manage contributor access</li>
              <li>To respond to your messages and enquiries</li>
              <li>To send transactional emails (account activity, application decisions)</li>
              <li>To improve the Platform through anonymised analytics</li>
              <li>To send the newsletter, if you have subscribed</li>
            </ul>
          </div>
          <div className="legal-section">
            <h2>4. Third-Party Services</h2>
            <p>We use the following third-party services that may process your data:</p>
            <ul>
              <li><strong style={{color:'#f0ece0'}}>Clerk</strong> — authentication and user account management</li>
              <li><strong style={{color:'#f0ece0'}}>Neon</strong> — database hosting (PostgreSQL)</li>
              <li><strong style={{color:'#f0ece0'}}>Vercel</strong> — hosting and deployment</li>
              <li><strong style={{color:'#f0ece0'}}>Resend</strong> — transactional email delivery</li>
            </ul>
            <p>Each of these services has its own privacy policy. We encourage you to review them.</p>
          </div>
          <div className="legal-section">
            <h2>5. Data Retention</h2>
            <p>We retain your data for as long as your account is active or as needed to provide the Platform. You may request deletion of your account and associated data at any time by contacting us at <a href="mailto:hello@confessed.faith">hello@confessed.faith</a>.</p>
          </div>
          <div className="legal-section">
            <h2>6. Your Rights</h2>
            <p>Depending on your jurisdiction, you may have the right to access, correct, or delete your personal data. To exercise any of these rights, please contact us at <a href="mailto:hello@confessed.faith">hello@confessed.faith</a>.</p>
          </div>
          <div className="legal-section">
            <h2>7. Cookies</h2>
            <p>We use cookies for authentication (via Clerk) and basic analytics. We do not use tracking cookies for advertising purposes.</p>
          </div>
          <div className="legal-section">
            <h2>8. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will update the "Last updated" date when we do. Continued use of the Platform constitutes acceptance of the updated policy.</p>
          </div>
          <div className="legal-section">
            <h2>9. Contact</h2>
            <p>For any privacy-related questions, contact us at <a href="mailto:hello@confessed.faith">hello@confessed.faith</a>.</p>
          </div>
        </div>
      </div>
    </>
  )
}
