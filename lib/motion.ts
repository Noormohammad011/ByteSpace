import tokens from '@/design/design-system/bytespace.tokens.json'

const { motion } = tokens

type CubicBezier = [number, number, number, number]

export const motionTokens = {
  durationReveal: motion.durationMs.reveal / 1000,
  durationFloat: motion.durationMs.float / 1000,
  stagger: motion.staggerMs / 1000,
  easeOut: motion.ease.out as CubicBezier,
  distanceReveal: motion.distancePx.reveal,
}
