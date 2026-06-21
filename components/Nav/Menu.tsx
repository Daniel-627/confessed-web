// components/Nav/Menu.tsx
'use client'
import { usePathname } from 'next/navigation'
import { SignOutButton } from '@clerk/nextjs'
import Link from 'next/link'
const mainLinks = [
  { label: 'Home',         href: '/' },
  { label: 'Articles',     href: '/articles' },
  { label: 'Videos',       href: '/videos' },
  { label: 'Podcasts',     href: '/podcasts' },
  { label: 'Daily Office', href: '/daily-office' },
  { label: 'Shop',         href: '/shop' },
  { label: 'About',        href: '/about' },
  { label: 'Contact',      href: '/contact' },
]

type Props = {
  open: boolean
  onClose: () => void
  user: any
  isLoaded: boolean
}

export default function Menu({ open, onClose, user, isLoaded }: Props) {
  const pathname  = usePathname()
  const role      = (user as any)?.publicMetadata?.role

  return (
    <>
      <style>{`
        .menu-overlay {
          position: fixed; inset: 0; z-index: 100;
          background: #080f1a;
          display: flex; flex-direction: column;
          transform: translateX(100%);
          transition: transform .35s cubic-bezier(.4,0,.2,1);
          overflow-y: auto;
        }
        .menu-overlay.open { transform: translateX(0); }
        .menu-overlay::before {
          content: '';
          position: fixed; top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #C9A94A, transparent);
          z-index: 101; pointer-events: none;
        }

        /* Top bar */
        .menu-topbar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 20px 32px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          flex-shrink: 0;
        }
        .menu-logo {
          display: flex; align-items: center; gap: 10px; text-decoration: none;
        }
        .menu-cross { color: #C9A94A; font-size: 20px; }
        .menu-wordmark {
          font-size: 13px; font-weight: 700; letter-spacing: .2em;
          color: #f0ece0; font-family: var(--font-barlow), sans-serif;
        }
        .menu-close {
          background: transparent; border: 1px solid rgba(255,255,255,0.1);
          color: rgba(240,236,224,0.6); width: 38px; height: 38px;
          border-radius: 8px; display: flex; align-items: center;
          justify-content: center; cursor: pointer; font-size: 18px;
          transition: all .2s; flex-shrink: 0;
        }
        .menu-close:hover { border-color: rgba(201,169,74,0.4); color: #f0ece0; }

        /* Mobile auth strip — only shows on mobile when signed in */
        .menu-user-strip {
          display: none;
          align-items: center; justify-content: space-between;
          padding: 14px 32px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          background: rgba(11,25,41,0.6);
        }
        .menu-user-name {
          font-size: 13px; color: rgba(240,236,224,0.45);
          font-family: var(--font-barlow), sans-serif;
        }
        .menu-user-actions { display: flex; gap: 8px; }
        .menu-user-btn {
          background: transparent; border: 1px solid rgba(255,255,255,0.1);
          color: rgba(240,236,224,0.55); padding: 5px 14px;
          border-radius: 6px; font-size: 12px; font-weight: 500;
          cursor: pointer; text-decoration: none;
          font-family: var(--font-barlow), sans-serif;
          transition: all .2s; white-space: nowrap;
        }
        .menu-user-btn:hover { border-color: rgba(201,169,74,0.3); color: #f0ece0; }

        @media (max-width: 768px) {
          .menu-user-strip { display: flex; }
        }

        /* Nav links */
        .menu-body {
          flex: 1; display: flex; flex-direction: column;
          padding: 40px 32px 32px; gap: 0;
        }
        .menu-section-label {
          font-size: 9px; font-weight: 700; letter-spacing: .2em;
          color: rgba(201,169,74,0.45); text-transform: uppercase;
          margin-bottom: 12px; margin-top: 28px;
          font-family: var(--font-barlow), sans-serif;
        }
        .menu-section-label:first-child { margin-top: 0; }

        .menu-link {
          display: flex; align-items: center; gap: 14px;
          padding: 13px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          text-decoration: none;
          font-family: var(--font-garamond), serif;
          font-size: 26px; color: rgba(240,236,224,0.55);
          transition: color .2s;
        }
        .menu-link:last-of-type { border-bottom: none; }
        .menu-link:hover { color: #f0ece0; }
        .menu-link.active { color: #f0ece0; }
        .menu-link.active::before {
          content: '✝'; color: #C9A94A; font-size: 13px;
          font-family: var(--font-barlow), sans-serif;
          flex-shrink: 0;
        }
        .menu-link-badge {
          font-size: 9px; font-weight: 700; letter-spacing: .1em;
          padding: 2px 8px; border-radius: 100px; border: 1px solid;
          font-family: var(--font-barlow), sans-serif; margin-left: auto;
          flex-shrink: 0;
        }
        .badge-contributor { color: #C9A94A; border-color: rgba(201,169,74,0.3); }
        .badge-admin { color: #81c784; border-color: rgba(129,199,132,0.3); }

        /* Footer — sign in/up for guests */
        .menu-footer {
          padding: 24px 32px;
          border-top: 1px solid rgba(255,255,255,0.05);
          display: flex; flex-direction: column; gap: 10px; flex-shrink: 0;
        }
        .menu-auth-btn {
          width: 100%; padding: 13px; border-radius: 8px;
          font-size: 14px; font-weight: 600; letter-spacing: .04em;
          cursor: pointer; text-decoration: none;
          font-family: var(--font-barlow), sans-serif;
          text-align: center; transition: all .2s; display: block;
        }
        .menu-auth-btn.primary { background: #C9A94A; color: #080f1a; border: none; }
        .menu-auth-btn.primary:hover { background: #b89840; }
        .menu-auth-btn.ghost {
          background: transparent; border: 1px solid rgba(255,255,255,0.12);
          color: rgba(240,236,224,0.65);
        }
        .menu-auth-btn.ghost:hover { border-color: rgba(201,169,74,0.3); color: #f0ece0; }
      `}</style>

      <div className={`menu-overlay${open ? ' open' : ''}`} aria-hidden={!open}>

        {/* Top bar */}
        <div className="menu-topbar">
          <Link href="/" className="menu-logo" onClick={onClose}>
            <span className="menu-cross">✝</span>
            <span className="menu-wordmark">CONFESSED</span>
          </Link>
          <button className="menu-close" onClick={onClose} aria-label="Close menu">✕</button>
        </div>

        {/* Mobile-only signed-in strip */}
        {isLoaded && user && (
          <div className="menu-user-strip">
            <span className="menu-user-name">
              {user.firstName ?? user.primaryEmailAddress?.emailAddress}
            </span>
            <div className="menu-user-actions">
              <Link href="/dashboard" className="menu-user-btn" onClick={onClose}>Dashboard</Link>
              <SignOutButton redirectUrl="/">
                <button className="menu-user-btn">Sign out</button>
              </SignOutButton>
            </div>
          </div>
        )}

        {/* Nav links */}
        <div className="menu-body">
          <p className="menu-section-label">Navigate</p>
          {mainLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`menu-link${pathname === link.href ? ' active' : ''}`}
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}

          {(role === 'contributor' || role === 'admin') && (
            <>
              <p className="menu-section-label">Your Access</p>
              <Link
                href="https://contribute.confessed.faith"
                className="menu-link"
                onClick={onClose}
              >
                Contribute
                <span className="menu-link-badge badge-contributor">Contributor</span>
              </Link>
            </>
          )}

          {role === 'admin' && (
            <Link
              href="https://contribute.confessed.faith/admin"
              className="menu-link"
              onClick={onClose}
            >
              Admin Panel
              <span className="menu-link-badge badge-admin">Admin</span>
            </Link>
          )}
        </div>

        {/* Guest footer */}
        {isLoaded && !user && (
          <div className="menu-footer">
            <Link href="/sign-up" className="menu-auth-btn primary" onClick={onClose}>Get started</Link>
            <Link href="/sign-in" className="menu-auth-btn ghost" onClick={onClose}>Sign in</Link>
          </div>
        )}
      </div>
    </>
  )
}
