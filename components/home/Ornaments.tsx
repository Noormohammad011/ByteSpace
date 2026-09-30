import Image from 'next/image'
import type { CSSProperties } from 'react'
import { motionTokens } from '@/lib/motion'
import { cn } from '@/lib/utils'

type OrnamentBreakpoint = 'lg' | 'xl'

export type Ornament = {
  id: string
  src: string
  width: number
  height: number
  from: OrnamentBreakpoint
  className: string
}

type OrnamentsProps = {
  items: Ornament[]
}

const visibilityFrom = {
  lg: 'hidden lg:block',
  xl: 'hidden xl:block',
} satisfies Record<OrnamentBreakpoint, string>

export const floatOffset = (index: number, count: number) =>
  ({
    '--float-offset': `${-(index / count) * motionTokens.durationFloat}s`,
  }) as CSSProperties

// From xl the layer is the 1440 Figma frame centered on the page, so narrower
// desktop widths crop shapes at the edges instead of sliding them over content.
const Ornaments = ({ items }: OrnamentsProps) => {
  return (
    <div className="pointer-events-none absolute inset-0 xl:left-1/2 xl:right-auto xl:w-[1440px] xl:-translate-x-1/2">
      {items.map((ornament, index) => (
        <Image
          key={ornament.id}
          src={ornament.src}
          alt=""
          width={ornament.width}
          height={ornament.height}
          style={floatOffset(index, items.length)}
          className={cn(
            'pointer-events-none absolute h-auto animate-float',
            visibilityFrom[ornament.from],
            ornament.className
          )}
        />
      ))}
    </div>
  )
}

export default Ornaments
