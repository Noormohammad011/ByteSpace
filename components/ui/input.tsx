import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const inputVariants = cva(
  'w-full min-w-0 border transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20',
  {
    variants: {
      variant: {
        default:
          'h-32 rounded-lg border-input bg-transparent px-2.5 py-1 text-base md:text-sm',
        pill: 'h-[52px] rounded-pill border-input bg-neutral-white px-24 font-body text-body-m text-shuttle-gray-950 placeholder:text-shuttle-gray-400',
        field:
          'h-[52px] rounded-[12px] border-shuttle-gray-100 bg-neutral-white px-24 font-body text-body-l text-shuttle-gray-950 placeholder:text-shuttle-gray-400 focus-visible:border-brand-blue-800',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function Input({
  className,
  type,
  variant = 'default',
  ...props
}: React.ComponentProps<'input'> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      data-variant={variant}
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Input, inputVariants }
