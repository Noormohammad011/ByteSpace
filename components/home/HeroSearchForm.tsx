'use client'

import Image from 'next/image'
import type { SubmitEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

type HeroSearchFormProps = {
  placeholder: string
  buttonLabel: string
  className?: string
}

const handleSearchSubmit = (event: SubmitEvent<HTMLFormElement>) => {
  event.preventDefault()
}

const HeroSearchForm = ({
  placeholder,
  buttonLabel,
  className,
}: HeroSearchFormProps) => {
  return (
    <form
      className={cn(
        'flex w-full max-w-[461px] flex-col gap-16 sm:max-w-[608px] sm:flex-row sm:items-start xl:w-auto xl:max-w-none',
        className
      )}
      onSubmit={handleSearchSubmit}
      role="search"
      aria-label="Search courses"
    >
      <label className="relative flex w-full sm:flex-1 xl:w-[461px] xl:flex-none">
        <span className="sr-only">Search</span>
        <Image
          src="/assets/home/icons/search.svg"
          alt=""
          width={24}
          height={24}
          className="pointer-events-none absolute left-24 top-1/2 -translate-y-1/2"
        />
        <Input
          type="search"
          name="q"
          variant="pill"
          placeholder={placeholder}
          className="border-transparent pl-[56px] text-body-l"
        />
      </label>
      <Button type="submit" variant="lime" size="touch">
        {buttonLabel}
      </Button>
    </form>
  )
}

export default HeroSearchForm
