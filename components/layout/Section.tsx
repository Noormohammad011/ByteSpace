import type { ComponentProps } from 'react'
import { Reveal } from '@/components/motion/Reveal'
import { cn } from '@/lib/utils'
import Container from './Container'

type SectionProps = Omit<ComponentProps<typeof Reveal>, 'as'> & {
  containerClassName?: string
}

const Section = ({
  className,
  containerClassName,
  children,
  ...props
}: SectionProps) => {
  return (
    <Reveal
      as="section"
      className={cn('relative w-full py-60 md:py-80', className)}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </Reveal>
  )
}

export default Section
