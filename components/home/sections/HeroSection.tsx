import Image from 'next/image'
import type { HomeContent } from '@/data/types'
import { Card } from '@/components/ui/card'
import HappyStudentsCard from '../cards/HappyStudentsCard'
import LearningProgressCard from '../cards/LearningProgressCard'
import HeroSearchForm from '../HeroSearchForm'
import Ornaments, { type Ornament } from '../Ornaments'
import ScaledCanvas from '../ScaledCanvas'

type HeroSectionProps = {
  content: HomeContent
}

const heroOrnaments: Ornament[] = [
  {
    id: 'spring-lime',
    src: '/assets/home/hero/spring-lime.png',
    width: 847,
    height: 900,
    from: 'lg',
    className:
      'left-[-50px] top-[700px] w-[150px] xl:left-[-60px] xl:top-[270px] xl:w-[270px]',
  },
  {
    id: 'spring-white-small',
    src: '/assets/home/hero/spring-white.png',
    width: 847,
    height: 900,
    from: 'xl',
    className: 'left-[214px] top-[500px] w-[120px]',
  },
  {
    id: 'torus-white',
    src: '/assets/home/hero/torus-white.png',
    width: 900,
    height: 824,
    from: 'xl',
    className: 'left-[66px] top-[760px] w-[240px]',
  },
  {
    id: 'pyramid-white',
    src: '/assets/home/hero/pyramid-white.png',
    width: 818,
    height: 900,
    from: 'xl',
    className: 'left-[1130px] top-[486px] w-[130px]',
  },
  {
    id: 'cylinder-lime',
    src: '/assets/home/hero/cylinder-lime.png',
    width: 821,
    height: 900,
    from: 'lg',
    className:
      'right-[-60px] top-[560px] w-[150px] xl:right-[-107px] xl:top-[257px] xl:w-[270px]',
  },
  {
    id: 'spring-white',
    src: '/assets/home/hero/spring-alt-white.png',
    width: 686,
    height: 900,
    from: 'xl',
    className: 'left-[1210px] top-[708px] w-[190px]',
  },
]

// Hero visual canvas: origin (312, 496) in the 1440 hero frame, children in local px.
const HERO_CANVAS = { width: 816, height: 528 } as const

const HeroSection = ({ content }: HeroSectionProps) => {
  return (
    <section className="relative w-full overflow-hidden bg-brand-blue-800 xl:h-[1024px]">
      <Image
        src="/assets/home/hero/bg-grid.svg"
        alt=""
        fill
        className="pointer-events-none object-cover"
      />

      <div className="relative mx-auto flex h-full w-full max-w-[1440px] flex-col items-center gap-48 pt-[120px] md:gap-60 md:pt-[152px] xl:block xl:pt-0">
        <div className="relative z-10 flex w-full flex-col items-center gap-40 px-page-mobile md:gap-60 md:px-page-tablet lg:px-page-desktop xl:absolute xl:left-1/2 xl:top-[169px] xl:w-[1200px] xl:-translate-x-1/2 xl:px-0">
          <div className="flex w-full flex-col items-center gap-24 text-center md:gap-32">
            <h1 className="max-w-[935px] font-heading text-heading-l font-semibold text-neutral-white">
              {content.heroTitle}
            </h1>
            <p className="font-body text-body-l text-shuttle-gray-100">
              {content.heroBody}
            </p>
          </div>
          <HeroSearchForm
            placeholder={content.heroSearchPlaceholder}
            buttonLabel={content.heroSearchButton}
          />
        </div>

        <ScaledCanvas
          width={HERO_CANVAS.width}
          height={HERO_CANVAS.height}
          className="xl:absolute xl:left-[calc(50%-408px)] xl:top-[496px]"
        >
          <div
            className="pointer-events-none absolute left-[-166.5px] top-[86px] size-[1149px] rounded-full bg-brand-lime-500"
            aria-hidden
          />
          <div className="absolute left-[119px] top-[16px] z-[5] h-[541px] w-[578px]">
            <Image
              src="/assets/home/hero/person.png"
              alt="Learner with headphones holding a laptop"
              fill
              sizes="(min-width: 1280px) 578px, 71vw"
              loading="eager"
              fetchPriority="high"
              className="object-contain object-bottom [filter:drop-shadow(0.52px_0.74px_3.04px_rgba(0,0,0,0.04))_drop-shadow(10.21px_14.58px_16.09px_rgba(0,0,0,0.08))_drop-shadow(25.84px_36.91px_36px_rgba(0,0,0,0.1))]"
            />
          </div>
          <Card className="absolute left-[92px] top-[143px] z-10 gap-0 rounded-card bg-neutral-white p-16 ring-0 backdrop-blur-[10px]">
            <p className="font-body text-label-m font-medium text-shuttle-gray-950">
              UI/UX Design
            </p>
            <div className="flex items-start gap-8 font-body text-shuttle-gray-400">
              <span className="text-body-xs">200 Courses</span>
              <span className="text-[10px] leading-[1.5]">•</span>
              <span className="text-body-xs">1000+ Students</span>
            </div>
          </Card>
          <HappyStudentsCard className="absolute left-[16px] top-[341px] z-10" />
          <LearningProgressCard className="absolute left-[530px] top-[155px] z-10" />
        </ScaledCanvas>

        <Ornaments items={heroOrnaments} />
      </div>
    </section>
  )
}

export default HeroSection
