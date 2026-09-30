import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'
import Container from './Container'

type SectionProps = ComponentProps<'section'> & {
  containerClassName?: string
}

const Section = ({
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) => {
  return (
    <section
      className={cn('relative w-full py-60 md:py-80', className)}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}

export default Section
