import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type SectionHeaderProps = {
  id: string
  title: ReactNode
  body?: ReactNode
  align?: 'center' | 'start'
  className?: string
  titleClassName?: string
  bodyClassName?: string
}

const alignClasses = {
  center: 'items-center text-center',
  start: 'items-start text-left',
} satisfies Record<NonNullable<SectionHeaderProps['align']>, string>

const SectionHeader = ({
  id,
  title,
  body,
  align = 'center',
  className,
  titleClassName,
  bodyClassName,
}: SectionHeaderProps) => {
  return (
    <div className={cn('flex flex-col gap-20', alignClasses[align], className)}>
      <h2
        id={id}
        className={cn(
          'font-heading text-heading-m font-semibold text-shuttle-gray-950',
          titleClassName
        )}
      >
        {title}
      </h2>
      {body ? (
        <p
          className={cn(
            'font-body text-body-l text-shuttle-gray-400',
            bodyClassName
          )}
        >
          {body}
        </p>
      ) : null}
    </div>
  )
}

export default SectionHeader
