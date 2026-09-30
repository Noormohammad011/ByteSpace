import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'

type LearningProgressCardProps = {
  className?: string
}

const LearningProgressCard = ({ className }: LearningProgressCardProps) => {
  return (
    <Card
      className={cn(
        'gap-8 rounded-card bg-neutral-white p-16 ring-0 backdrop-blur-[10px]',
        className
      )}
    >
      <p className="font-body text-label-s font-medium text-shuttle-gray-950">
        Learning Progress
      </p>
      <p className="font-heading text-[48px] font-semibold leading-[1.2] tracking-[-0.48px] text-shuttle-gray-950">
        55%
      </p>
      <div className="relative h-8 w-[200px] rounded-[24px] bg-shuttle-gray-50">
        <div className="absolute left-0 top-0 h-8 w-[112px] rounded-[24px] bg-brand-lime-400" />
      </div>
    </Card>
  )
}

export default LearningProgressCard
