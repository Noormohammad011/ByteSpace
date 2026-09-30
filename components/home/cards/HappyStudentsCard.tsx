import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'

type HappyStudentsTone = 'white' | 'lime'

type HappyStudentsCardProps = {
  tone?: HappyStudentsTone
  className?: string
}

const avatarIndexes = [1, 2, 3, 4, 5, 6, 7]

const toneClassNames = {
  white: 'bg-neutral-white',
  lime: 'bg-brand-lime-400',
} satisfies Record<HappyStudentsTone, string>

// The lime tone reuses the lime star.svg shape as a mask so it can be painted blue.
const BlueStar = () => (
  <span
    aria-hidden
    className="h-[12.6px] w-[13.2px] bg-brand-blue-800 [mask:url(/assets/home/icons/star.svg)_center/contain_no-repeat]"
  />
)

const HappyStudentsCard = ({
  tone = 'white',
  className,
}: HappyStudentsCardProps) => {
  const isLime = tone === 'lime'

  return (
    <Card
      className={cn(
        'w-[258px] gap-8 rounded-card p-16 ring-0 backdrop-blur-[10px]',
        toneClassNames[tone],
        className
      )}
    >
      <div>
        <p className="font-body text-label-m font-medium text-shuttle-gray-950">
          Happy Students
        </p>
        <div className="flex items-center gap-4">
          <p className="font-body text-body-xs text-shuttle-gray-400">
            <span className="text-shuttle-gray-950">4.5 </span>
            (240)
          </p>
          {isLime ? (
            <BlueStar />
          ) : (
            <Image
              src="/assets/home/icons/star.svg"
              alt=""
              width={16}
              height={16}
            />
          )}
        </div>
      </div>
      <div className="flex items-start">
        {avatarIndexes.map((index) => (
          <Avatar key={index} className="-mr-16 size-[43px] after:hidden">
            <Image
              src={`/assets/home/hero/avatar-${index}.png`}
              alt=""
              width={43}
              height={43}
              className="size-full rounded-full object-cover"
            />
          </Avatar>
        ))}
        {isLime ? (
          <span className="relative flex size-[43px] shrink-0 items-center justify-center rounded-full bg-shuttle-gray-950 font-body text-[12px] font-bold text-neutral-white">
            2K+
          </span>
        ) : (
          <div className="relative size-[43px] shrink-0">
            <Image
              src="/assets/home/icons/avatar-plus.svg"
              alt=""
              width={43}
              height={43}
            />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-body text-[12px] font-bold text-shuttle-gray-950">
              2K+
            </span>
          </div>
        )}
      </div>
    </Card>
  )
}

export default HappyStudentsCard
