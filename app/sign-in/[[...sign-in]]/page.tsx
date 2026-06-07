// app/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from '@clerk/nextjs'
import AuthLayout from '@/app/(auth)/auth-layout'

export const metadata = { title: 'Sign In' }

export default function SignInPage() {
  return (
    <AuthLayout>
      <div className="auth-heading">
        <h1>Welcome back</h1>
        <p>Sign in to your Confessed account</p>
      </div>
      <SignIn appearance={{ layout: { unsafe_disableDevelopmentModeWarnings: true } }} />
    </AuthLayout>
  )
}