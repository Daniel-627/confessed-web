// app/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from '@clerk/nextjs'

const appearance = {
  variables: {
    colorPrimary: '#C9A94A',
    colorBackground: '#0f1f35',
    colorInputBackground: '#0a1628',
    colorInputText: '#f0ece0',
    colorText: '#f0ece0',
    colorTextSecondary: 'rgba(240,236,224,0.5)',
    colorNeutral: '#f0ece0',
    borderRadius: '8px',
    fontFamily: 'Inter, sans-serif',
  },
  elements: {
    card: 'shadow-none border border-white/10',
    formButtonPrimary: 'bg-[#C9A94A] text-[#0a1628] font-semibold hover:bg-[#b8983e]',
    footerActionLink: 'text-[#C9A94A]',
    identityPreviewEditButton: 'text-[#C9A94A]',
  },
}

export default function Page() {
  return (
    <div className="flex min-h-screen bg-[#0d1b2e]">
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between flex-1 p-12 bg-[#0a1628] border-r border-white/5">
        <div className="flex items-center gap-3">
          <span className="text-[#C9A94A] text-3xl font-light">✝</span>
          <span className="text-[#f0ece0] font-semibold tracking-widest text-lg">CONFESSED</span>
        </div>
        <div>
          <p className="text-[rgba(240,236,224,0.55)] italic text-base leading-relaxed max-w-sm mb-3">
            "For I am not ashamed of the gospel, for it is the power of God for salvation to everyone who believes."
          </p>
          <p className="text-[#C9A94A] text-xs tracking-widest">Romans 1:16 · ESV</p>
          <div className="flex gap-2 mt-8">
            {['REFORMED', 'CONFESSIONAL', 'GOSPEL-CENTRED'].map(t => (
              <span key={t} className="text-[10px] tracking-widest text-[rgba(201,169,74,0.7)] border border-[rgba(201,169,74,0.25)] px-2.5 py-1 rounded-full">{t}</span>
            ))}
          </div>
        </div>
      </div>
      {/* Right panel — Clerk form */}
      <div className="flex flex-1 items-center justify-center p-8">
        <SignIn appearance={appearance} />
      </div>
    </div>
  )
}