import type { CSSProperties, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ScaledCanvasProps = {
  width: number
  height: number
  className?: string
  children: ReactNode
}

// Unitless numbers only, so the division stays plain number math; px comes last.
// --avail is the content width at the start of each band (viewport minus page padding).
const ScaledCanvas = ({
  width,
  height,
  className,
  children,
}: ScaledCanvasProps) => {
  const style = { '--cw': width, '--ch': height } as CSSProperties

  return (
    <div
      style={style}
      className={cn(
        'relative mx-auto shrink-0 overflow-hidden [--avail:328] [--s:min(1,calc(var(--avail)/var(--cw)))] sm:[--avail:608] md:[--avail:720] lg:[--avail:960] xl:mx-0 xl:[--s:1]',
        'h-[calc(var(--ch)*var(--s)*1px)] w-[calc(var(--cw)*var(--s)*1px)]',
        className
      )}
    >
      <div className="absolute left-0 top-0 h-[calc(var(--ch)*1px)] w-[calc(var(--cw)*1px)] origin-top-left overflow-hidden [scale:var(--s)]">
        {children}
      </div>
    </div>
  )
}

export default ScaledCanvas
