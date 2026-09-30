import type { Metadata } from 'next'
import { loginContent } from '@/data'
import AuthCard from '@/components/auth/AuthCard'
import AuthShell from '@/components/auth/AuthShell'
import LoginForm from '@/components/auth/LoginForm'
import SocialSignIn from '@/components/auth/SocialSignIn'

export const metadata: Metadata = {
  title: 'Sign in | ByteSpace',
  description: loginContent.promoBody,
  openGraph: {
    title: 'Sign in | ByteSpace',
    description: loginContent.promoBody,
    images: [{ url: '/assets/exports/login.png' }],
  },
}

const LoginPage = () => {
  return (
    <AuthShell
      promoTitle={loginContent.promoTitle}
      promoBody={loginContent.promoBody}
    >
      <AuthCard content={loginContent} className="xl:pb-[41px]">
        <LoginForm submitLabel={loginContent.submitLabel} />
        <SocialSignIn />
      </AuthCard>
    </AuthShell>
  )
}

export default LoginPage
