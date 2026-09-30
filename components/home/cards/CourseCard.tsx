import Image from 'next/image'
import type { Course } from '@/data/types'
import { cn } from '@/lib/utils'
import { Avatar } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'

type CourseCardVariant = 'catalog' | 'promo'

type CourseCardProps = {
  course: Course
  variant?: CourseCardVariant
  className?: string
}

// `catalog` is the Home listing card; `promo` is the auth collage card
// (filled lime star, black students badge).
const courseCardVariants = {
  catalog: {
    star: { src: '/assets/home/icons/star-outline.svg', width: 24, height: 24 },
    plusClassName: 'bg-brand-lime-400 text-shuttle-gray-950',
  },
  promo: {
    star: { src: '/assets/home/icons/star.svg', width: 18, height: 17 },
    plusClassName: 'bg-black-950 text-neutral-white',
  },
} satisfies Record<
  CourseCardVariant,
  {
    star: { src: string; width: number; height: number }
    plusClassName: string
  }
>

const CourseCard = ({
  course,
  variant = 'catalog',
  className,
}: CourseCardProps) => {
  const { star: starIcon, plusClassName } = courseCardVariants[variant]
  return (
    <Card
      className={cn(
        'w-full gap-0 rounded-[24px] border border-shuttle-gray-200 bg-neutral-white p-[15px] ring-0 xl:h-[384px]',
        className
      )}
    >
      <div className="relative aspect-[341/195] w-full overflow-hidden rounded-[12px]">
        <Image
          src={course.thumbnail}
          alt=""
          fill
          sizes="(min-width: 1280px) 341px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover"
        />
        <div className="absolute bottom-[13px] left-[13px] right-8 flex flex-wrap gap-12">
          {[
            course.lessonsLabel,
            course.durationLabel,
            course.commentsLabel,
          ].map((label) => (
            <span
              key={label}
              className="rounded-[24px] bg-[rgba(246,246,246,0.6)] px-12 py-[6px] font-body text-label-xs font-medium text-black-700 backdrop-blur-[4px]"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-[21px] flex flex-col gap-16">
        <div>
          <div className="flex items-start justify-between gap-8">
            <h3 className="min-w-0 max-w-[260px] flex-1 truncate font-heading text-[20px] font-semibold leading-[1.2] tracking-[-0.2px] text-black-950">
              {course.title}
            </h3>
            <div className="flex shrink-0 items-center gap-4">
              <span className="font-body text-body-l text-black-700">
                {course.rating}
              </span>
              <span className="flex size-24 items-center justify-center">
                <Image
                  src={starIcon.src}
                  alt=""
                  width={starIcon.width}
                  height={starIcon.height}
                />
              </span>
            </div>
          </div>
          <p className="font-body text-body-xs text-black-700">
            by{' '}
            <span className="text-brand-blue-800">{course.instructorName}</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-12">
          <span className="inline-flex items-center gap-4 rounded-[24px] bg-shuttle-gray-50 px-12 py-[6px] font-body text-label-xs font-medium text-shuttle-gray-700">
            <Image
              src="/assets/home/icons/signal.svg"
              alt=""
              width={20}
              height={20}
            />
            {course.levelLabel}
          </span>
          <div className="flex items-start">
            {course.studentAvatars.map((avatar, index) => (
              <Avatar
                key={`${course.id}-avatar-${index}`}
                className="-mr-8 after:hidden"
              >
                <Image
                  src={avatar}
                  alt=""
                  width={32}
                  height={32}
                  className="size-full rounded-full object-cover"
                />
              </Avatar>
            ))}
            <span
              className={cn(
                'flex size-32 shrink-0 items-center justify-center rounded-full font-body text-label-xs font-medium',
                plusClassName
              )}
            >
              {course.studentsPlusLabel}
            </span>
          </div>
        </div>

        <div className="flex items-end">
          <span className="font-heading text-[20px] font-semibold leading-[1.2] tracking-[-0.2px] text-brand-blue-800">
            {course.priceLabel}
          </span>
          <span className="font-body text-body-xs text-black-700">
            {course.priceSuffix}
          </span>
        </div>
      </div>
    </Card>
  )
}

export default CourseCard
