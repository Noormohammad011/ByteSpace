'use client'

import type { SubmitEvent } from 'react'
import { Button } from '@/components/ui/button'
import AuthField from './AuthField'

type LoginFormProps = {
  submitLabel: string
}

const handleLoginSubmit = (event: SubmitEvent<HTMLFormElement>) => {
  event.preventDefault()
}

const LoginForm = ({ submitLabel }: LoginFormProps) => {
  return (
    <form
      method="post"
      className="flex flex-col gap-24"
      onSubmit={handleLoginSubmit}
    >
      <AuthField
        id="login-email"
        name="email"
        type="email"
        label="Email"
        autoComplete="email"
        placeholder="designer@example.com"
      />
      <AuthField
        id="login-password"
        name="password"
        type="password"
        label="Password"
        autoComplete="current-password"
        placeholder="********"
      />
      <Button type="submit" variant="lime" size="touch" className="self-end">
        {submitLabel}
      </Button>
    </form>
  )
}

export default LoginForm
