'use client'

import { m, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

import { motionTokens } from '@/lib/motion'

const revealTags = {
  div: m.div,
  section: m.section,
  ul: m.ul,
  ol: m.ol,
  li: m.li,
  dl: m.dl,
  p: m.p,
  h2: m.h2,
  nav: m.nav,
  footer: m.footer,
}

type RevealTag = keyof typeof revealTags

type RevealProps = {
  as?: RevealTag
  id?: string
  className?: string
  'aria-label'?: string
  'aria-labelledby'?: string
  children: ReactNode
}

type RevealItemProps = RevealProps & {
  order?: number
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: motionTokens.distanceReveal },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: motionTokens.durationReveal,
      ease: motionTokens.easeOut,
      delay,
    },
  }),
}

/** Triggers its RevealItems once, when its top crosses 80% of the viewport height. */
export const Reveal = ({ as = 'div', children, ...props }: RevealProps) => {
  const Tag = revealTags[as]

  return (
    <Tag
      {...props}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -20% 0px' }}
    >
      {children}
    </Tag>
  )
}

/**
 * Fades and rises when its parent Reveal enters view; `order` sets the stagger step.
 * Reduced motion and no JS are handled in CSS through `data-reveal`.
 */
export const RevealItem = ({
  as = 'div',
  order = 0,
  children,
  ...props
}: RevealItemProps) => {
  const Tag = revealTags[as]

  return (
    <Tag
      {...props}
      data-reveal=""
      variants={itemVariants}
      custom={order * motionTokens.stagger}
    >
      {children}
    </Tag>
  )
}
