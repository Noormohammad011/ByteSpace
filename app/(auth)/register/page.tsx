import type { Metadata } from 'next'
import { ViewTransition } from 'react'
import { registerContent } from '@/data'
import AuthCard from '@/components/auth/AuthCard'
import AuthShell from '@/components/auth/AuthShell'
import RegisterForm from '@/components/auth/RegisterForm'

export const metadata: Metadata = {
  title: 'Create an account | ByteSpace',
  description: registerContent.promoBody,
  openGraph: {
    title: 'Create an account | ByteSpace',
    description: registerContent.promoBody,
    images: [{ url: '/assets/exports/register.png' }],
  },
}

const RegisterPage = () => {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      <AuthShell
        promoTitle={registerContent.promoTitle}
        promoBody={registerContent.promoBody}
      >
        <AuthCard content={registerContent}>
          <RegisterForm submitLabel={registerContent.submitLabel} />
        </AuthCard>
      </AuthShell>
    </ViewTransition>
  )
}

export default RegisterPage
