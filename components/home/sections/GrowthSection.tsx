import Image from 'next/image'
import type { Course, HomeContent, Stat } from '@/data/types'
import Section from '@/components/layout/Section'
import SectionHeader from '@/components/layout/SectionHeader'
import CourseCard from '../cards/CourseCard'
import LearningProgressCard from '../cards/LearningProgressCard'
import ScaledCanvas from '../ScaledCanvas'

type GrowthSectionProps = {
  content: HomeContent
  stats: Stat[]
  featuredCourse: Course
}

// Growth cluster: origin (639, 113) in the 1200 content box, children in local px.
// ponytail: width trimmed from the 696 Figma frame to 600 (content ends at ~577) so the box never spills past a 1280 viewport.
const GROWTH_CANVAS = { width: 600, height: 536 } as const

const GrowthSection = ({
  content,
  stats,
  featuredCourse,
}: GrowthSectionProps) => {
  return (
    <Section
      aria-labelledby="growth-heading"
      className="xl:py-0"
      containerClassName="flex flex-col gap-48 xl:relative xl:block xl:h-[716px]"
    >
      <div className="flex flex-col gap-40 xl:absolute xl:left-32 xl:top-[188px]">
        <SectionHeader
          id="growth-heading"
          title={content.growthTitle}
          body={content.growthBody}
          align="start"
          className="gap-40"
          titleClassName="xl:w-[541px]"
          bodyClassName="xl:w-[470px]"
        />
        <dl className="mt-24 flex flex-wrap gap-x-40 gap-y-24">
          {stats.map((stat) => (
            <div key={stat.id} className="flex flex-col-reverse gap-4">
              <dt className="font-body text-body-m text-shuttle-gray-700">
                {stat.label}
              </dt>
              <dd className="font-heading text-[32px] font-medium leading-[1.2] text-brand-blue-800">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="xl:absolute xl:left-[671px] xl:top-[113px]">
        <ScaledCanvas width={GROWTH_CANVAS.width} height={GROWTH_CANVAS.height}>
          <CourseCard
            course={featuredCourse}
            className="absolute left-0 top-0 h-[384px] w-[373px]"
          />
          <div className="absolute left-[61px] top-[53px] z-10 h-[483px] w-[516px]">
            <Image
              src="/assets/home/hero/person.png"
              alt="Learner with headphones holding a laptop"
              fill
              sizes="(min-width: 1280px) 516px, 80vw"
              className="object-contain object-bottom [filter:drop-shadow(10.21px_14.58px_16.09px_rgba(0,0,0,0.08))_drop-shadow(25.84px_36.91px_36px_rgba(0,0,0,0.1))]"
            />
          </div>
          <LearningProgressCard className="absolute left-[344px] top-[213px] z-20 w-[232px]" />
          <Image
            src="/assets/home/hero/spring-alt-lime.png"
            alt=""
            width={686}
            height={900}
            className="pointer-events-none absolute left-[450px] top-[91px] z-20 h-auto w-[124px]"
          />
        </ScaledCanvas>
      </div>
    </Section>
  )
}

export default GrowthSection
