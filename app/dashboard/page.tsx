// app/dashboard/page.tsx
'use client'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useApi } from '@/lib/api'

type UserData = {
  id: string
  email: string
  displayName: string | null
  avatarUrl: string | null
  role: string
  isActive: boolean
  createdAt: string
}

type Preferences = {
  theme: string | null
  bibleTranslation: string | null
  dailyOfficeTime: string | null
  notificationsEmail: boolean | null
  language: string | null
  timezone: string | null
}

const ROLE_META: Record<string, { label: string; color: string; border: string }> = {
  admin:       { label: 'Admin',       color: '#81c784', border: 'rgba(129,199,132,0.3)' },
  contributor: { label: 'Contributor', color: '#C9A94A', border: 'rgba(201,169,74,0.3)'  },
  regular:     { label: 'Member',      color: 'rgba(240,236,224,0.45)', border: 'rgba(255,255,255,0.15)' },
}

const TRANSLATIONS = ['ESV', 'KJV', 'NKJV', 'NIV', 'NASB', 'CSB']
const LANGUAGES    = ['English', 'Swahili', 'French', 'Portuguese', 'Spanish']

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function DashboardPage() {
  const { user: clerkUser, isLoaded } = useUser()
  const router  = useRouter()
  const { request } = useApi()

  const [userData,    setUserData]    = useState<UserData | null>(null)
  const [prefs,       setPrefs]       = useState<Preferences | null>(null)
  const [loading,     setLoading]     = useState(true)

  // Edit profile state
  const [displayName, setDisplayName] = useState('')
  const [saving,      setSaving]      = useState(false)
  const [saveMsg,     setSaveMsg]     = useState<string | null>(null)

  // Edit prefs state
  const [prefDraft,   setPrefDraft]   = useState<Preferences | null>(null)
  const [savingPrefs, setSavingPrefs] = useState(false)

  const [tab, setTab] = useState<'profile' | 'preferences'>('profile')

  useEffect(() => {
    if (isLoaded && !clerkUser) router.replace('/sign-in')
  }, [isLoaded, clerkUser])

  useEffect(() => {
    if (!isLoaded || !clerkUser) return
    ;(async () => {
      try {
        const data = await request<{ user: UserData; preferences: Preferences }>('/me')
        setUserData(data.user)
        setPrefs(data.preferences)
        setDisplayName(data.user.displayName ?? '')
        setPrefDraft(data.preferences)
      } catch {}
      finally { setLoading(false) }
    })()
  }, [isLoaded, clerkUser])

  async function saveProfile() {
    if (!displayName.trim()) return
    setSaving(true)
    try {
      const data = await request<{ user: UserData }>('/me', {
        method: 'PUT',
        body: JSON.stringify({ displayName: displayName.trim() }),
      })
      setUserData(data.user)
      setSaveMsg('Saved')
      setTimeout(() => setSaveMsg(null), 2500)
    } catch {}
    finally { setSaving(false) }
  }

  async function savePrefs() {
    if (!prefDraft) return
    setSavingPrefs(true)
    try {
      const data = await request<{ preferences: Preferences }>('/me/preferences', {
        method: 'PUT',
        body: JSON.stringify(prefDraft),
      })
      setPrefs(data.preferences)
      setSaveMsg('Preferences saved')
      setTimeout(() => setSaveMsg(null), 2500)
    } catch {}
    finally { setSavingPrefs(false) }
  }

  const role = ROLE_META[userData?.role ?? 'regular'] ?? ROLE_META.regular

  if (loading || !userData) return <DashLoading />

  return (
    <>
      <style>{`
        .dp-wrap {
          min-height: calc(100vh - 64px);
          background: #080f1a;
          font-family: var(--font-barlow), sans-serif;
          color: #f0ece0;
        }

        /* Page header */
        .dp-header {
          padding: 48px 64px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .dp-header-top {
          display: flex; align-items: center; gap: 20px;
          margin-bottom: 28px; flex-wrap: wrap;
        }
        .dp-avatar {
          width: 56px; height: 56px; border-radius: 50%;
          background: rgba(201,169,74,0.1);
          border: 1px solid rgba(201,169,74,0.2);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-garamond), serif;
          font-size: 22px; color: #C9A94A; flex-shrink: 0;
          overflow: hidden;
        }
        .dp-avatar img { width: 100%; height: 100%; object-fit: cover; }
        .dp-header-info { flex: 1; min-width: 0; }
        .dp-name {
          font-family: var(--font-garamond), serif;
          font-size: 26px; color: #f0ece0; font-weight: 400;
          margin-bottom: 4px;
        }
        .dp-name em { font-style: italic; color: #C9A94A; }
        .dp-email {
          font-size: 13px; color: rgba(240,236,224,0.35);
        }
        .dp-role-badge {
          font-size: 9px; font-weight: 700; letter-spacing: .12em;
          text-transform: uppercase; padding: 4px 12px;
          border-radius: 100px; border: 1px solid; flex-shrink: 0;
        }
        .dp-joined {
          font-size: 11px; color: rgba(240,236,224,0.2);
          margin-left: auto; white-space: nowrap;
        }

        /* Tabs */
        .dp-tabs { display: flex; gap: 0; }
        .dp-tab {
          padding: 10px 24px; font-size: 12px; font-weight: 600;
          letter-spacing: .08em; text-transform: uppercase;
          cursor: pointer; border: none; background: transparent;
          color: rgba(240,236,224,0.35);
          border-bottom: 2px solid transparent;
          transition: all .2s; font-family: var(--font-barlow), sans-serif;
          white-space: nowrap;
        }
        .dp-tab.active { color: #C9A94A; border-bottom-color: #C9A94A; }
        .dp-tab:hover  { color: rgba(240,236,224,0.7); }

        /* Body */
        .dp-body { padding: 40px 64px 80px; max-width: 720px; }

        /* Fields */
        .dp-section-title {
          font-family: var(--font-garamond), serif;
          font-size: 20px; color: #f0ece0;
          margin-bottom: 24px; padding-bottom: 12px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .dp-section-title em { font-style: italic; color: #C9A94A; }

        .dp-field { margin-bottom: 20px; }
        .dp-label {
          font-size: 10px; font-weight: 700; letter-spacing: .14em;
          text-transform: uppercase; color: rgba(240,236,224,0.35);
          margin-bottom: 8px; display: block;
        }
        .dp-input, .dp-select {
          width: 100%; background: #081422;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 8px; padding: 11px 16px;
          font-size: 14px; color: #f0ece0;
          font-family: var(--font-barlow), sans-serif;
          outline: none; transition: border-color .2s;
          caret-color: #C9A94A; box-sizing: border-box;
        }
        .dp-input:focus, .dp-select:focus { border-color: rgba(201,169,74,0.4); }
        .dp-input::placeholder { color: rgba(240,236,224,0.2); }
        .dp-input:disabled {
          opacity: .4; cursor: not-allowed;
          background: rgba(255,255,255,0.02);
        }
        .dp-select { cursor: pointer; }
        .dp-select option { background: #0b1929; }

        .dp-field-hint {
          font-size: 11px; color: rgba(240,236,224,0.2);
          margin-top: 5px;
        }

        /* Toggle */
        .dp-toggle-row {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 0; border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .dp-toggle-row:last-of-type { border-bottom: none; }
        .dp-toggle-label { font-size: 13px; color: rgba(240,236,224,0.7); }
        .dp-toggle-sub { font-size: 11px; color: rgba(240,236,224,0.25); margin-top: 2px; }
        .dp-toggle {
          width: 40px; height: 22px; border-radius: 100px;
          border: none; cursor: pointer; position: relative;
          transition: background .2s; flex-shrink: 0;
          background: rgba(255,255,255,0.1);
        }
        .dp-toggle.on { background: #C9A94A; }
        .dp-toggle::after {
          content: ''; position: absolute;
          top: 3px; left: 3px; width: 16px; height: 16px;
          border-radius: 50%; background: #f0ece0;
          transition: transform .2s;
        }
        .dp-toggle.on::after { transform: translateX(18px); }

        /* Actions */
        .dp-actions {
          display: flex; align-items: center; gap: 16px;
          margin-top: 32px; flex-wrap: wrap;
        }
        .dp-save-btn {
          background: #C9A94A; border: none; color: #080f1a;
          padding: 11px 28px; border-radius: 8px;
          font-size: 13px; font-weight: 700; letter-spacing: .06em;
          cursor: pointer; font-family: var(--font-barlow), sans-serif;
          transition: background .2s;
        }
        .dp-save-btn:hover { background: #b89840; }
        .dp-save-btn:disabled { opacity: .5; cursor: not-allowed; }
        .dp-save-msg {
          font-size: 12px; color: #81c784; letter-spacing: .06em;
        }

        /* Contributor card */
        .dp-contrib-card {
          background: #0b1929;
          border: 1px solid rgba(201,169,74,0.15);
          border-radius: 10px; padding: 24px;
          margin-top: 32px;
          display: flex; align-items: center; justify-content: space-between;
          gap: 16px; flex-wrap: wrap;
        }
        .dp-contrib-text { font-family: var(--font-garamond), serif; font-size: 16px; color: rgba(240,236,224,0.6); font-style: italic; }
        .dp-contrib-btn {
          background: transparent; border: 1px solid rgba(201,169,74,0.3);
          color: #C9A94A; padding: 9px 20px; border-radius: 8px;
          font-size: 12px; font-weight: 600; letter-spacing: .06em;
          text-decoration: none; font-family: var(--font-barlow), sans-serif;
          transition: all .2s; white-space: nowrap;
        }
        .dp-contrib-btn:hover { background: rgba(201,169,74,0.08); }

        @media (max-width: 768px) {
          .dp-header { padding: 32px 20px 0; }
          .dp-body    { padding: 32px 20px 64px; }
          .dp-tab     { padding: 10px 14px; font-size: 11px; letter-spacing: .04em; }
          .dp-joined  { display: none; }
        }
      `}</style>

      <div className="dp-wrap">
        {/* Header */}
        <div className="dp-header">
          <div className="dp-header-top">
            <div className="dp-avatar">
              {userData.avatarUrl
                ? <img src={userData.avatarUrl} alt={userData.displayName ?? ''} />
                : (userData.displayName ?? userData.email)[0].toUpperCase()
              }
            </div>
            <div className="dp-header-info">
              <h1 className="dp-name">
                {userData.displayName
                  ? <><em>{userData.displayName}</em></>
                  : userData.email
                }
              </h1>
              <p className="dp-email">{userData.email}</p>
            </div>
            <span
              className="dp-role-badge"
              style={{ color: role.color, borderColor: role.border }}
            >
              {role.label}
            </span>
            <span className="dp-joined">
              Member since {formatDate(userData.createdAt)}
            </span>
          </div>

          <div className="dp-tabs">
            <button
              className={`dp-tab${tab === 'profile' ? ' active' : ''}`}
              onClick={() => setTab('profile')}
            >
              Profile
            </button>
            <button
              className={`dp-tab${tab === 'preferences' ? ' active' : ''}`}
              onClick={() => setTab('preferences')}
            >
              Preferences
            </button>
          </div>
        </div>

        <div className="dp-body">
          {tab === 'profile' ? (
            <>
              <h2 className="dp-section-title">Your <em>profile</em></h2>

              <div className="dp-field">
                <label className="dp-label">Display name</label>
                <input
                  className="dp-input"
                  placeholder="How you appear on Confessed"
                  value={displayName}
                  onChange={e => setDisplayName(e.target.value)}
                />
              </div>

              <div className="dp-field">
                <label className="dp-label">Email address</label>
                <input
                  title="Email address associated with your account"
                  className="dp-input"
                  value={userData.email}
                  disabled
                />
                <p className="dp-field-hint">Managed via your Clerk account</p>
              </div>

              <div className="dp-field">
                <label className="dp-label">Account role</label>
                <input
                  title="Your role within the Confessed community"
                  className="dp-input"
                  value={role.label}
                  disabled
                />
              </div>

              <div className="dp-actions">
                <button
                  className="dp-save-btn"
                  onClick={saveProfile}
                  disabled={saving || !displayName.trim()}
                >
                  {saving ? 'Saving…' : 'Save changes'}
                </button>
                {saveMsg && <span className="dp-save-msg">{saveMsg} ✓</span>}
              </div>

              {userData.role === 'regular' && (
                <div className="dp-contrib-card">
                  <p className="dp-contrib-text">
                    Want to write for Confessed? Apply to become a contributor.
                  </p>
                  <a
                    href="https://contribute.confessed.faith/apply"
                    className="dp-contrib-btn"
                    target="_blank"
                    rel="noopener"
                  >
                    Apply now
                  </a>
                </div>
              )}

              {(userData.role === 'contributor' || userData.role === 'admin') && (
                <div className="dp-contrib-card">
                  <p className="dp-contrib-text">
                    Access your contributor portal to write and publish articles.
                  </p>
                  <a
                    href="https://contribute.confessed.faith"
                    className="dp-contrib-btn"
                    target="_blank"
                    rel="noopener"
                  >
                    Open portal
                  </a>
                </div>
              )}
            </>
          ) : (
            <>
              <h2 className="dp-section-title">Your <em>preferences</em></h2>

              {prefDraft && (
                <>
                  <div className="dp-field">
                    <label className="dp-label">Bible translation</label>
                    <select
                      title="Preferred Bible translation for readings"
                      className="dp-select"
                      value={prefDraft.bibleTranslation ?? 'ESV'}
                      onChange={e => setPrefDraft({ ...prefDraft, bibleTranslation: e.target.value })}
                    >
                      {TRANSLATIONS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div className="dp-field">
                    <label className="dp-label">Language</label>
                    <select
                      title="Language for the Confessed interface"
                      className="dp-select"
                      value={prefDraft.language ?? 'English'}
                      onChange={e => setPrefDraft({ ...prefDraft, language: e.target.value })}
                    >
                      {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  </div>

                  <div className="dp-field">
                    <label className="dp-label">Daily Office time</label>
                    <input
                      title="Time for daily reading reminder"
                      className="dp-input"
                      type="time"
                      value={prefDraft.dailyOfficeTime ?? '07:00'}
                      onChange={e => setPrefDraft({ ...prefDraft, dailyOfficeTime: e.target.value })}
                    />
                    <p className="dp-field-hint">When you'd like your daily reading reminder</p>
                  </div>

                  <div className="dp-field">
                    <label className="dp-label">Notifications</label>
                    <div>
                      <div className="dp-toggle-row">
                        <div>
                          <p className="dp-toggle-label">Email notifications</p>
                          <p className="dp-toggle-sub">New articles, announcements, and updates</p>
                        </div>
                        <button
                          className={`dp-toggle${prefDraft.notificationsEmail ? ' on' : ''}`}
                          onClick={() => setPrefDraft({ ...prefDraft, notificationsEmail: !prefDraft.notificationsEmail })}
                          aria-label="Toggle email notifications"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="dp-actions">
                    <button
                      className="dp-save-btn"
                      onClick={savePrefs}
                      disabled={savingPrefs}
                    >
                      {savingPrefs ? 'Saving…' : 'Save preferences'}
                    </button>
                    {saveMsg && <span className="dp-save-msg">{saveMsg} ✓</span>}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

function DashLoading() {
  return (
    <div style={{
      minHeight: 'calc(100vh - 64px)', background: '#080f1a',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', gap: 20,
    }}>
      <span style={{ fontSize: 24, color: '#C9A94A' }}>✝</span>
      <div style={{ display: 'flex', gap: 5, alignItems: 'flex-end', height: 20 }}>
        {[8,14,20,14,8].map((h, i) => (
          <div key={i} style={{
            width: 3, height: h, background: '#C9A94A', borderRadius: 2,
            animation: 'bar 1.2s ease-in-out infinite',
            animationDelay: `${i * 0.15}s`,
          }} />
        ))}
      </div>
      <style>{`@keyframes bar { 0%,100%{transform:scaleY(.4);opacity:.3} 50%{transform:scaleY(1);opacity:1} }`}</style>
    </div>
  )
}
