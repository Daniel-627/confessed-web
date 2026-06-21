// components/Nav/Navbar.tsx
'use client'
import { useState } from 'react'
import { useUser, SignOutButton } from '@clerk/nextjs'
import Link from 'next/link'
import Menu from './Menu'

export default function Navbar() {
  const { user, isLoaded } = useUser()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <style>{`
        .navbar {
          position: relative;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 48px;
          height: 64px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          background: rgba(8,15,26,0.95);
          backdrop-filter: blur(12px);
          font-family: var(--font-barlow), sans-serif;
        }
        .navbar::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #C9A94A, transparent);
          pointer-events: none;
        }
        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .navbar-cross { color: #C9A94A; font-size: 20px; line-height: 1; }
        .navbar-wordmark {
          font-size: 13px; font-weight: 700;
          letter-spacing: .22em; color: #f0ece0;
        }

        /* Desktop right side */
        .navbar-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* Auth buttons — desktop only */
        .navbar-auth, .navbar-user {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .navbar-user-name {
          font-size: 13px;
          color: rgba(240,236,224,0.55);
        }
        .nb-btn-ghost {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(240,236,224,0.65);
          padding: 7px 18px; border-radius: 6px;
          font-size: 13px; font-weight: 500;
          cursor: pointer; text-decoration: none;
          font-family: var(--font-barlow), sans-serif;
          transition: all .2s; white-space: nowrap;
        }
        .nb-btn-ghost:hover { border-color: rgba(201,169,74,0.35); color: #f0ece0; }
        .nb-btn-gold {
          background: #C9A94A; border: none; color: #080f1a;
          padding: 8px 20px; border-radius: 6px;
          font-size: 13px; font-weight: 700; letter-spacing: .04em;
          cursor: pointer; text-decoration: none;
          font-family: var(--font-barlow), sans-serif;
          transition: background .2s; white-space: nowrap;
        }
        .nb-btn-gold:hover { background: #b89840; }

        /* Hamburger */
        .navbar-menu-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(240,236,224,0.7);
          width: 38px; height: 38px; border-radius: 8px;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          gap: 5px; cursor: pointer;
          transition: all .2s; flex-shrink: 0;
        }
        .navbar-menu-btn:hover { border-color: rgba(201,169,74,0.4); color: #C9A94A; }
        .hamburger-line {
          width: 16px; height: 1.5px;
          background: currentColor; border-radius: 2px;
        }

        /* Mobile — hide everything except logo + hamburger */
        @media (max-width: 768px) {
          .navbar { padding: 0 20px; }
          .navbar-auth { display: none; }
          .navbar-user { display: none; }
          .navbar-user-name { display: none; }
        }
      `}</style>

      <nav className="navbar">
        <Link href="/" className="navbar-logo">
          <span className="navbar-cross">✝</span>
          <span className="navbar-wordmark">CONFESSED</span>
        </Link>

        <div className="navbar-right">
          {isLoaded && (
            user ? (
              <div className="navbar-user">
                <span className="navbar-user-name">{user.firstName ?? user.primaryEmailAddress?.emailAddress}</span>
                <Link href="/dashboard" className="nb-btn-ghost">Dashboard</Link>
                <SignOutButton redirectUrl="/"><button className="nb-btn-ghost">Sign out</button></SignOutButton>
              </div>
            ) : (
              <div className="navbar-auth">
                <Link href="/sign-in" className="nb-btn-ghost">Sign in</Link>
                <Link href="/sign-up" className="nb-btn-gold">Get started</Link>
              </div>
            )
          )}
          <button className="navbar-menu-btn" onClick={() => setMenuOpen(true)} aria-label="Open menu">
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </nav>

      <Menu open={menuOpen} onClose={() => setMenuOpen(false)} user={user} isLoaded={isLoaded} />
    </>
  )
}
