import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        'display-s',
        'display-xs',
        'heading-l',
        'heading-m',
        'heading-s',
        'heading-xs',
        'label-xl',
        'label-l',
        'label-m',
        'label-s',
        'label-xs',
        'body-l',
        'body-m',
        'body-s',
        'body-xs',
      ],
      container: ['shell'],
      radius: ['card', 'pill'],
      shadow: ['elevation-a'],
      spacing: ['page-mobile', 'page-tablet', 'page-desktop'],
    },
  },
})

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))
