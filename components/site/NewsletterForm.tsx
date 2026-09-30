'use client'

import type { SubmitEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type NewsletterFormProps = {
  title: string
  placeholder: string
  buttonLabel: string
  disclaimer: string
}

const handleNewsletterSubmit = (event: SubmitEvent<HTMLFormElement>) => {
  event.preventDefault()
}

const NewsletterForm = ({
  title,
  placeholder,
  buttonLabel,
  disclaimer,
}: NewsletterFormProps) => {
  return (
    <form
      className="flex flex-col gap-24"
      onSubmit={handleNewsletterSubmit}
      aria-label="Newsletter signup"
    >
      <p className="font-body text-body-s text-shuttle-gray-950">{title}</p>
      <div className="flex flex-col gap-16 sm:flex-row sm:items-center sm:gap-24">
        <label className="sr-only" htmlFor="newsletter-email">
          Email
        </label>
        <Input
          id="newsletter-email"
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder={placeholder}
          variant="pill"
          className="w-full border-shuttle-gray-200 focus-visible:border-brand-blue-800 sm:w-[377px]"
        />
        <Button type="submit" variant="lime" size="touch">
          {buttonLabel}
        </Button>
      </div>
      <p className="font-body text-body-xs text-shuttle-gray-950">
        {disclaimer}
      </p>
    </form>
  )
}

export default NewsletterForm
