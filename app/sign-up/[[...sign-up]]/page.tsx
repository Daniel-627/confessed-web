// app/sign-up/[[...sign-up]]/page.tsx
import { SignUp } from '@clerk/nextjs'
import AuthLayout from '@/app/(auth)/auth-layout'

export const metadata = { title: 'Sign Up' }

export default function SignUpPage() {
  return (
    <AuthLayout>
      <div className="auth-heading">
        <h1>Create your account</h1>
        <p>Join the Confessed community</p>
      </div>
      <SignUp appearance={{ layout: { unsafe_disableDevelopmentModeWarnings: true } }} />
    </AuthLayout>
  )
}