import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

const Container = ({ className, ...props }: ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'mx-auto w-full px-page-mobile md:px-page-tablet lg:px-page-desktop xl:max-w-shell',
        className
      )}
      {...props}
    />
  )
}

export default Container
