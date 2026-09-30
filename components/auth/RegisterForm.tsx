'use client'

import type { SubmitEvent } from 'react'
import { Button } from '@/components/ui/button'
import AuthField from './AuthField'

type RegisterFormProps = {
  submitLabel: string
}

const handleRegisterSubmit = (event: SubmitEvent<HTMLFormElement>) => {
  event.preventDefault()
}

const RegisterForm = ({ submitLabel }: RegisterFormProps) => {
  return (
    <form
      method="post"
      className="flex flex-col gap-24"
      onSubmit={handleRegisterSubmit}
    >
      <AuthField
        id="register-name"
        name="name"
        label="Full Name"
        autoComplete="name"
        placeholder="Jamie Davis"
      />
      <AuthField
        id="register-email"
        name="email"
        type="email"
        label="Email"
        autoComplete="email"
        placeholder="designer@example.com"
      />
      <AuthField
        id="register-password"
        name="password"
        type="password"
        label="Password"
        autoComplete="new-password"
        minLength={8}
        placeholder="********"
      />
      <Button type="submit" variant="lime" size="touch" className="self-end">
        {submitLabel}
      </Button>
    </form>
  )
}

export default RegisterForm
