import Link from 'next/link'
import type { ReactNode } from 'react'
import type { AuthPageContent } from '@/data/types'
import { cn } from '@/lib/utils'

type AuthCardProps = {
  content: AuthPageContent
  children: ReactNode
  className?: string
}

const AuthCard = ({ content, children, className }: AuthCardProps) => {
  return (
    <section
      className={cn(
        'flex w-full flex-col rounded-[24px] bg-neutral-white p-24 sm:p-40 xl:h-[784px] xl:px-64 xl:pb-[52px] xl:pt-64',
        className
      )}
    >
      <p className="font-body text-label-l text-brand-blue-800">
        {content.eyebrow}
      </p>
      <h1 className="mt-[5px] font-heading text-display-s font-semibold text-shuttle-gray-950">
        {content.title}
      </h1>
      <div className="mt-32 flex flex-col xl:mt-[42px]">{children}</div>
      <p className="mt-40 text-center font-body text-body-m text-shuttle-gray-700 xl:mt-auto">
        {content.switchPrompt}{' '}
        <Link
          href={content.switchHref}
          className="font-medium text-brand-blue-800 underline-offset-4 hover:underline"
        >
          {content.switchLabel}
        </Link>
      </p>
    </section>
  )
}

export default AuthCard
