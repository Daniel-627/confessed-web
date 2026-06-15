// app/apply/page.tsx
'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useApi } from '@/lib/api'

const TITLES = [
  { value: 'pastor', label: 'Pastor' },
  { value: 'evangelist', label: 'Evangelist' },
  { value: 'apologist', label: 'Apologist' },
  { value: 'theologian', label: 'Theologian' },
  { value: 'elder', label: 'Elder' },
  { value: 'deacon', label: 'Deacon' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'author', label: 'Author' },
  { value: 'other', label: 'Other' },
]

type StatusResponse =
  | { status: 'none' }
  | { status: 'not_applicable'; role: string }
  | { status: 'pending' | 'approved' | 'rejected'; submittedAt: string; reviewedAt?: string | null; decisionReason?: string | null }

export default function ApplyPage() {
  const { user, isLoaded } = useUser()
  const router = useRouter()
  const { request } = useApi()

  const [checking, setChecking] = useState(true)
  const [statusData, setStatusData] = useState<StatusResponse | null>(null)

  // Form state
  const [fullName, setFullName] = useState('')
  const [desiredTitle, setDesiredTitle] = useState('pastor')
  const [customTitle, setCustomTitle] = useState('')
  const [bio, setBio] = useState('')
  const [churchName, setChurchName] = useState('')
  const [ministryName, setMinistryName] = useState('')
  const [location, setLocation] = useState('')
  const [theologicalStatement, setTheologicalStatement] = useState('')
  const [writingSamples, setWritingSamples] = useState('')
  const [twitterUrl, setTwitterUrl] = useState('')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [agrees, setAgrees] = useState(false)

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isLoaded) return
    if (!user) { router.replace('/sign-in?redirect_url=/apply'); return }

    request<StatusResponse>('/contributors/apply/status')
      .then(setStatusData)
      .catch(() => setStatusData({ status: 'none' }))
      .finally(() => setChecking(false))
  }, [isLoaded, user])

  const bioLen = bio.trim().length
  const statementLen = theologicalStatement.trim().length
  const bioValid = bioLen >= 200
  const statementValid = statementLen >= 300

  const canSubmit =
    fullName.trim().length > 1 &&
    bioValid &&
    statementValid &&
    agrees &&
    (desiredTitle !== 'other' || customTitle.trim().length > 0)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!canSubmit) return

    setSubmitting(true)
    setError(null)

    try {
      await request('/contributors/apply', {
        method: 'POST',
        body: JSON.stringify({
          fullName: fullName.trim(),
          desiredTitle,
          customTitle: desiredTitle === 'other' ? customTitle.trim() : undefined,
          bio: bio.trim(),
          churchName: churchName.trim() || undefined,
          ministryName: ministryName.trim() || undefined,
          location: location.trim() || undefined,
          theologicalStatement: theologicalStatement.trim(),
          writingSamples: writingSamples
            .split('\n')
            .map(s => s.trim())
            .filter(Boolean),
          socialLinks: {
            twitter: twitterUrl.trim() || undefined,
            youtube: youtubeUrl.trim() || undefined,
            website: websiteUrl.trim() || undefined,
          },
          agreesToStandards: agrees,
        }),
      })

      setStatusData({ status: 'pending', submittedAt: new Date().toISOString() })
    } catch (err: any) {
      setError(err.message ?? 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!isLoaded || checking) return <PageLoading />

  // Already a contributor or admin
  if (statusData?.status === 'not_applicable') {
    return (
      <StatusCard
        icon="✝"
        title={<>Already <em>contributing</em></>}
        message={`You're already a ${statusData.role} on Confessed — no application needed.`}
        cta={{ label: 'Go to Contribute', href: 'https://contribute.confessed.faith' }}
      />
    )
  }

  // Has a pending application
  if (statusData?.status === 'pending') {
    return (
      <StatusCard
        icon="⏳"
        title={<>Application <em>pending</em></>}
        message="Your application has been received and is under review. Our team typically responds within 3–5 business days. You'll receive an email with our decision."
        meta={`Submitted ${new Date(statusData.submittedAt).toLocaleDateString()}`}
        cta={{ label: 'Return home', href: '/' }}
      />
    )
  }

  // Was approved (shouldn't normally land here since role would change, but just in case)
  if (statusData?.status === 'approved') {
    return (
      <StatusCard
        icon="✓"
        title={<>Application <em>approved</em></>}
        message="Congratulations — your application has been approved. Visit the Contribute portal to get started."
        cta={{ label: 'Go to Contribute', href: 'https://contribute.confessed.faith' }}
      />
    )
  }

  // Was rejected — can reapply after 30 days
  if (statusData?.status === 'rejected') {
    const reviewedAt = statusData.reviewedAt ? new Date(statusData.reviewedAt) : null
    const canReapplyAt = reviewedAt ? new Date(reviewedAt.getTime() + 30 * 24 * 60 * 60 * 1000) : null
    const canReapplyNow = canReapplyAt ? Date.now() >= canReapplyAt.getTime() : true

    if (!canReapplyNow) {
      return (
        <StatusCard
          icon="—"
          title={<>Application <em>not approved</em></>}
          message={
            statusData.decisionReason
              ? `Reason: ${statusData.decisionReason}`
              : "After review, we weren't able to approve your application at this time."
          }
          meta={`You can reapply after ${canReapplyAt?.toLocaleDateString()}`}
          cta={{ label: 'Return home', href: '/' }}
        />
      )
    }
    // else: fall through to show the form again for reapplication
  }

  // status === 'none' or eligible to reapply → show the form
  return (
    <div className="apply-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Barlow:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }

        .apply-page {
          min-height: calc(100vh - 64px);
          background: #080f1a;
          font-family: 'Barlow', sans-serif;
          color: #f0ece0;
          padding: 56px 24px 80px;
          position: relative;
        }
        .apply-page::before {
          content: '';
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }

        .apply-container {
          max-width: 640px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .apply-header { text-align: center; margin-bottom: 48px; }
        .apply-eyebrow {
          font-size: 10px; font-weight: 700; letter-spacing: .2em;
          color: #C9A94A; text-transform: uppercase; margin-bottom: 12px;
        }
        .apply-title {
          font-family: 'EB Garamond', serif;
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 500;
          margin-bottom: 12px;
        }
        .apply-title em { font-style: italic; color: #C9A94A; }
        .apply-sub {
          font-size: 14px;
          color: rgba(240,236,224,0.4);
          line-height: 1.7;
          max-width: 480px;
          margin: 0 auto;
        }

        .apply-form {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .field-group { display: flex; flex-direction: column; gap: 6px; }
        .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

        .field-label {
          font-size: 11px; font-weight: 600; letter-spacing: .1em;
          color: rgba(240,236,224,0.45); text-transform: uppercase;
        }
        .field-hint {
          font-size: 11px; color: rgba(240,236,224,0.25); margin-top: 2px;
        }
        .field-hint.valid { color: rgba(129,199,132,0.6); }
        .field-hint.invalid { color: rgba(229,115,115,0.6); }

        .field-input, .field-select, .field-textarea {
          background: #081422;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          padding: 11px 14px;
          font-size: 14px;
          color: #f0ece0;
          font-family: 'Barlow', sans-serif;
          outline: none;
          transition: border-color .15s;
          width: 100%;
        }
        .field-input:focus, .field-select:focus, .field-textarea:focus {
          border-color: rgba(201,169,74,0.55);
          box-shadow: 0 0 0 3px rgba(201,169,74,0.08);
        }
        .field-input::placeholder, .field-textarea::placeholder { color: rgba(240,236,224,0.2); }
        .field-textarea { resize: vertical; min-height: 120px; line-height: 1.6; }
        .field-select option { background: #0b1929; color: #f0ece0; }

        .section-divider {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding-top: 28px;
          margin-top: 4px;
        }
        .section-title {
          font-family: 'EB Garamond', serif;
          font-size: 18px;
          font-style: italic;
          color: rgba(240,236,224,0.5);
          margin-bottom: 16px;
        }

        .checkbox-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px;
          padding: 14px 16px;
        }
        .checkbox-row input { margin-top: 2px; accent-color: #C9A94A; cursor: pointer; }
        .checkbox-row label { font-size: 13px; color: rgba(240,236,224,0.6); line-height: 1.6; cursor: pointer; }

        .error-box {
          background: rgba(229,115,115,0.08);
          border: 1px solid rgba(229,115,115,0.25);
          border-radius: 8px;
          padding: 12px 16px;
          font-size: 13px;
          color: rgba(229,115,115,0.85);
        }

        .submit-btn {
          background: #C9A94A;
          color: #080f1a;
          border: none;
          padding: 14px 28px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: .06em;
          cursor: pointer;
          font-family: 'Barlow', sans-serif;
          transition: background .2s;
        }
        .submit-btn:hover:not(:disabled) { background: #b89840; }
        .submit-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        @media (max-width: 600px) {
          .field-row { grid-template-columns: 1fr; }
          .apply-page { padding: 40px 16px 60px; }
        }
      `}</style>

      <div className="apply-container">
        <div className="apply-header">
          <p className="apply-eyebrow">Reformed · Confessional · Gospel-Centred</p>
          <h1 className="apply-title">Become a <em>Contributor</em></h1>
          <p className="apply-sub">
            Confessed contributors write articles, record podcasts, and shape gospel-centred content
            for the church. Tell us about yourself and your theological convictions.
          </p>
        </div>

        <form className="apply-form" onSubmit={handleSubmit}>
          {/* Basic info */}
          <div className="field-row">
            <div className="field-group">
              <label className="field-label">Full Name</label>
              <input
                className="field-input"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Your full name"
                required
              />
            </div>
            <div className="field-group">
              <label className="field-label">Desired Title</label>
              <select
                className="field-select"
                value={desiredTitle}
                onChange={e => setDesiredTitle(e.target.value)}
              >
                {TITLES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
          </div>

          {desiredTitle === 'other' && (
            <div className="field-group">
              <label className="field-label">Custom Title</label>
              <input
                className="field-input"
                value={customTitle}
                onChange={e => setCustomTitle(e.target.value)}
                placeholder="e.g. Worship Leader, Missionary"
              />
            </div>
          )}

          <div className="field-row">
            <div className="field-group">
              <label className="field-label">Church Name</label>
              <input
                className="field-input"
                value={churchName}
                onChange={e => setChurchName(e.target.value)}
                placeholder="Optional"
              />
            </div>
            <div className="field-group">
              <label className="field-label">Ministry Name</label>
              <input
                className="field-input"
                value={ministryName}
                onChange={e => setMinistryName(e.target.value)}
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="field-group">
            <label className="field-label">Location</label>
            <input
              className="field-input"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="e.g. Nairobi, Kenya"
            />
          </div>

          {/* Bio */}
          <div className="section-divider">
            <p className="section-title">About you</p>
            <div className="field-group">
              <label className="field-label">Bio</label>
              <textarea
                className="field-textarea"
                value={bio}
                onChange={e => setBio(e.target.value)}
                placeholder="Tell us about your background, ministry experience, and calling..."
              />
              <p className={`field-hint ${bio.length > 0 ? (bioValid ? 'valid' : 'invalid') : ''}`}>
                {bioLen} / 200 characters minimum
              </p>
            </div>
          </div>

          {/* Theological statement */}
          <div className="section-divider">
            <p className="section-title">Theological convictions</p>
            <div className="field-group">
              <label className="field-label">Theological Statement</label>
              <textarea
                className="field-textarea"
                value={theologicalStatement}
                onChange={e => setTheologicalStatement(e.target.value)}
                placeholder="In your own words, describe your Reformed convictions — your view of Scripture, salvation, the sovereignty of God, and the gospel..."
                style={{ minHeight: 160 }}
              />
              <p className={`field-hint ${theologicalStatement.length > 0 ? (statementValid ? 'valid' : 'invalid') : ''}`}>
                {statementLen} / 300 characters minimum
              </p>
            </div>
          </div>

          {/* Writing samples & links */}
          <div className="section-divider">
            <p className="section-title">Writing samples &amp; links</p>
            <div className="field-group">
              <label className="field-label">Writing Sample URLs</label>
              <textarea
                className="field-textarea"
                value={writingSamples}
                onChange={e => setWritingSamples(e.target.value)}
                placeholder={'One URL per line\nhttps://example.com/my-article'}
                style={{ minHeight: 90 }}
              />
              <p className="field-hint">Optional — links to blog posts, sermons, or articles you've written</p>
            </div>

            <div className="field-row" style={{ marginTop: 16 }}>
              <div className="field-group">
                <label className="field-label">Twitter / X</label>
                <input className="field-input" value={twitterUrl} onChange={e => setTwitterUrl(e.target.value)} placeholder="https://x.com/..." />
              </div>
              <div className="field-group">
                <label className="field-label">YouTube</label>
                <input className="field-input" value={youtubeUrl} onChange={e => setYoutubeUrl(e.target.value)} placeholder="https://youtube.com/..." />
              </div>
            </div>
            <div className="field-group" style={{ marginTop: 16 }}>
              <label className="field-label">Website</label>
              <input className="field-input" value={websiteUrl} onChange={e => setWebsiteUrl(e.target.value)} placeholder="https://..." />
            </div>
          </div>

          {/* Agreement */}
          <div className="checkbox-row">
            <input
              type="checkbox"
              id="agrees"
              checked={agrees}
              onChange={e => setAgrees(e.target.checked)}
            />
            <label htmlFor="agrees">
              I affirm that my beliefs align with Confessed's Reformed, confessional convictions,
              and I agree to uphold the theological and editorial standards of the platform.
            </label>
          </div>

          {error && <div className="error-box">{error}</div>}

          <button type="submit" className="submit-btn" disabled={!canSubmit || submitting}>
            {submitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </div>
  )
}

function PageLoading() {
  return (
    <div style={{ minHeight: 'calc(100vh - 64px)', background: '#080f1a', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
      <span style={{ fontSize: 28, color: '#C9A94A' }}>✝</span>
      <div style={{ display: 'flex', gap: 5, alignItems: 'flex-end', height: 20 }}>
        {[8,14,20,14,8].map((h, i) => (
          <div key={i} style={{ width: 3, height: h, background: '#C9A94A', borderRadius: 2, animation: 'bar 1.2s ease-in-out infinite', animationDelay: `${i * 0.15}s` }} />
        ))}
      </div>
      <style>{`@keyframes bar { 0%,100%{transform:scaleY(.4);opacity:.3} 50%{transform:scaleY(1);opacity:1} }`}</style>
    </div>
  )
}

function StatusCard({
  icon, title, message, meta, cta,
}: {
  icon: string
  title: React.ReactNode
  message: string
  meta?: string
  cta: { label: string; href: string }
}) {
  return (
    <div style={{
      minHeight: 'calc(100vh - 64px)',
      background: '#080f1a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px',
      fontFamily: 'Barlow, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;1,400&display=swap');
      `}</style>
      <div style={{ textAlign: 'center', maxWidth: 440, position: 'relative', zIndex: 1 }}>
        <span style={{ fontSize: 32, color: '#C9A94A', display: 'block', marginBottom: 24 }}>{icon}</span>
        <h1 style={{ fontFamily: 'EB Garamond, serif', fontSize: 32, color: '#f0ece0', marginBottom: 12 }}>
          {title}
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(240,236,224,0.45)', lineHeight: 1.7, marginBottom: meta ? 8 : 32 }}>
          {message}
        </p>
        {meta && (
          <p style={{ fontSize: 12, color: 'rgba(201,169,74,0.6)', marginBottom: 32, textTransform: 'uppercase', letterSpacing: '.08em' }}>
            {meta}
          </p>
        )}
        <a
          href={cta.href}
          style={{
            display: 'inline-block',
            background: '#C9A94A',
            color: '#080f1a',
            padding: '12px 28px',
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '.06em',
            textDecoration: 'none',
          }}
        >
          {cta.label}
        </a>
      </div>
    </div>
  )
}
