// app/contact/page.tsx
'use client'
import { useState } from 'react'

const REASONS = [
  'General enquiry',
  'Contributor application question',
  'Theological question',
  'Press or media',
  'Partnership or collaboration',
  'Report an issue',
  'Other',
]

export default function ContactPage() {
  const [name,    setName]    = useState('')
  const [email,   setEmail]   = useState('')
  const [reason,  setReason]  = useState('')
  const [message, setMessage] = useState('')
  const [sent,    setSent]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState<string | null>(null)

  async function handleSubmit() {
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in all required fields.')
      return
    }
    setLoading(true)
    setError(null)
    // Stub — wire to Resend in Step 2
    await new Promise(r => setTimeout(r, 800))
    setSent(true)
    setLoading(false)
  }

  return (
    <>
      <style>{`
        .ct-wrap {
          min-height: 100vh;
          background: #080f1a;
          font-family: var(--font-barlow), sans-serif;
          color: #f0ece0;
          display: grid;
          grid-template-columns: 1fr 1fr;

        /* Left — info */
        .ct-left {
          padding: 96px 64px;
          border-right: 1px solid rgba(255,255,255,0.05);
          display: flex;
          flex-direction: column;
        .ct-eyebrow {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 28px;
        .ct-eyebrow-line { width: 28px; height: 1px; background: #C9A94A; }
        .ct-eyebrow-text {
          font-size: 10px; font-weight: 700; letter-spacing: .2em;
          color: #C9A94A; text-transform: uppercase;
        .ct-title {
          font-family: var(--font-garamond), serif;
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 400; line-height: 1.15;
          color: #f0ece0; margin-bottom: 20px;
        .ct-title em { font-style: italic; color: #C9A94A; }
        .ct-lead {
          font-family: var(--font-garamond), serif;
          font-size: 17px; line-height: 1.8;
          color: rgba(240,236,224,0.5);
          margin-bottom: 48px;

        .ct-info-block { margin-bottom: 32px; }
        .ct-info-label {
          font-size: 10px; font-weight: 700; letter-spacing: .16em;
          text-transform: uppercase; color: rgba(201,169,74,0.5);
          margin-bottom: 6px;
        .ct-info-value {
          font-size: 14px; color: rgba(240,236,224,0.6);
        .ct-info-value a {
          color: #C9A94A; text-decoration: none;
        .ct-info-value a:hover { text-decoration: underline; }

        .ct-note {
          margin-top: auto;
          font-family: var(--font-garamond), serif;
          font-size: 14px; font-style: italic;
          color: rgba(240,236,224,0.2);
          line-height: 1.7;

        /* Right — form */
        .ct-right {
          padding: 96px 64px;
          display: flex;
          flex-direction: column;

        .ct-form { display: flex; flex-direction: column; gap: 20px; }

        .ct-field-label {
          font-size: 10px; font-weight: 700; letter-spacing: .14em;
          text-transform: uppercase; color: rgba(240,236,224,0.35);
          margin-bottom: 7px; display: block;
        .ct-input, .ct-select, .ct-textarea {
          width: 100%;
          background: #081422;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px;
          padding: 12px 16px;
          font-size: 14px;
          color: #f0ece0;
          font-family: var(--font-barlow), sans-serif;
          outline: none;
          transition: border-color .2s;
          caret-color: #C9A94A;
        .ct-input:focus, .ct-select:focus, .ct-textarea:focus {
          border-color: rgba(201,169,74,0.4);
        .ct-input::placeholder, .ct-textarea::placeholder {
          color: rgba(240,236,224,0.2);
        .ct-select { cursor: pointer; }
        .ct-select option { background: #0b1929; }
        .ct-textarea { resize: vertical; min-height: 140px; line-height: 1.6; }

        .ct-error {
          font-size: 12px; color: #e57373;
          padding: 10px 14px;
          background: rgba(229,115,115,0.06);
          border: 1px solid rgba(229,115,115,0.2);
          border-radius: 6px;
        .ct-submit {
          background: #C9A94A; border: none; color: #080f1a;
          padding: 14px 32px; border-radius: 8px;
          font-size: 13px; font-weight: 700; letter-spacing: .06em;
          cursor: pointer; font-family: var(--font-barlow), sans-serif;
          transition: background .2s; align-self: flex-start;
        .ct-submit:hover { background: #b89840; }
        .ct-submit:disabled { opacity: .5; cursor: not-allowed; }

        /* Success state */
        .ct-success {
          display: flex; flex-direction: column;
          align-items: flex-start; gap: 16px;
          padding: 40px 0;
        .ct-success-cross { color: #C9A94A; font-size: 32px; }
        .ct-success-title {
          font-family: var(--font-garamond), serif;
          font-size: 28px; color: #f0ece0;
        .ct-success-body {
          font-family: var(--font-garamond), serif;
          font-size: 17px; font-style: italic;
          color: rgba(240,236,224,0.5); line-height: 1.7;

        @media (max-width: 900px) {
          .ct-wrap { grid-template-columns: 1fr; }
          .ct-left  { padding: 64px 40px 48px; border-right: none; border-bottom: 1px solid rgba(255,255,255,0.05); }
          .ct-right { padding: 48px 40px 72px; }
          .ct-note  { display: none; }
        @media (max-width: 560px) {
          .ct-left  { padding: 48px 20px 40px; }
          .ct-right { padding: 40px 20px 64px; }
          .ct-submit { width: 100%; text-align: center; }
      `}</style>

      <div className="ct-wrap">
        {/* Left */}
        <div className="ct-left">
          <div className="ct-eyebrow">
            <span className="ct-eyebrow-line" />
            <span className="ct-eyebrow-text">Get in touch</span>
            <span className="ct-eyebrow-line" />
          </div>
          <h1 className="ct-title">We would<br />love to <em>hear</em><br />from you</h1>
          <p className="ct-lead">
            Whether you have a theological question, want to collaborate,
            or simply want to reach out — we read every message.
          </p>

          <div className="ct-info-block">
            <p className="ct-info-label">Email</p>
            <p className="ct-info-value">
              <a href="mailto:hello@confessed.faith">hello@confessed.faith</a>
            </p>
          </div>

          <div className="ct-info-block">
            <p className="ct-info-label">Based in</p>
            <p className="ct-info-value">Nairobi, Kenya — writing for the world</p>
          </div>

          <div className="ct-info-block">
            <p className="ct-info-label">On X / Twitter</p>
            <p className="ct-info-value">
              <a href="https://x.com/ConfessedFaith" target="_blank" rel="noopener">@ConfessedFaith</a>
            </p>
          </div>

          <div className="ct-info-block">
            <p className="ct-info-label">Want to contribute?</p>
            <p className="ct-info-value">
              <a href="https://contribute.confessed.faith/apply">Apply here</a> — we review every application.
            </p>
          </div>

          <p className="ct-note">
            "Iron sharpens iron, and one man sharpens another." — Proverbs 27:17
          </p>
        </div>

        {/* Right */}
        <div className="ct-right">
          {sent ? (
            <div className="ct-success">
              <span className="ct-success-cross">✝</span>
              <h2 className="ct-success-title">Message received.</h2>
              <p className="ct-success-body">
                Thank you for reaching out. We read every message and will
                respond as soon as we are able. Grace and peace to you.
              </p>
            </div>
          ) : (
            <div className="ct-form">
              <div>
                <label className="ct-field-label">Name *</label>
                <input
                  className="ct-input"
                  placeholder="Your full name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>
              <div>
                <label className="ct-field-label">Email *</label>
                <input
                  className="ct-input"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label className="ct-field-label">Reason for contact</label>
                <select
                  title="Reason"
                  className="ct-select"
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                >
                  <option value="">Select a reason…</option>
                  {REASONS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="ct-field-label">Message *</label>
                <textarea
                  className="ct-textarea"
                  placeholder="Write your message here…"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                />
              </div>
              {error && <p className="ct-error">{error}</p>}
              <button
                className="ct-submit"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? 'Sending…' : 'Send message'}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}   