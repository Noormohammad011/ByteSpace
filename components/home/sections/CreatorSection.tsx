import Image from 'next/image'
import type { HomeContent } from '@/data/types'
import Section from '@/components/layout/Section'
import SectionHeader from '@/components/layout/SectionHeader'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import HappyStudentsCard from '../cards/HappyStudentsCard'
import ScaledCanvas from '../ScaledCanvas'

type CreatorSectionProps = {
  content: HomeContent
}

// Creator cluster: origin (0, 17) in the 1200 content box; tall enough for the full 719px portrait.
const CREATOR_CANVAS = { width: 602, height: 720 } as const

const CheckIcon = () => (
  <svg viewBox="0 0 20 20" className="size-20 shrink-0" aria-hidden>
    <circle cx="10" cy="10" r="10" className="fill-brand-blue-800" />
    <path
      d="M6 10.4 8.6 13 14 7.6"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="stroke-neutral-white"
    />
  </svg>
)

const statCardClassName =
  'absolute gap-0 rounded-card bg-brand-blue-800 p-16 text-neutral-white ring-0'

const CreatorSection = ({ content }: CreatorSectionProps) => {
  return (
    <Section
      id="creator"
      aria-labelledby="creator-heading"
      className="xl:py-0"
      containerClassName="flex flex-col gap-48 xl:relative xl:block xl:h-[738px]"
    >
      <div className="xl:absolute xl:left-32 xl:top-[17px]">
        <ScaledCanvas
          width={CREATOR_CANVAS.width}
          height={CREATOR_CANVAS.height}
          className="overflow-visible *:overflow-visible"
        >
          <Card
            className={cn(statCardClassName, 'left-0 top-[48px] w-[222px]')}
          >
            <p className="font-body text-label-m font-medium">Total Revenue</p>
            <p className="font-body text-[10px] leading-[1.5] opacity-80">
              July 1-28
            </p>
            <p className="mt-8 font-heading text-[24px] font-semibold leading-[1.3333]">
              $120.29
            </p>
            <div className="mt-8 h-8 w-full rounded-pill bg-neutral-white/30">
              <div className="h-8 w-3/4 rounded-pill bg-brand-lime-400" />
            </div>
          </Card>

          <Image
            src={content.creatorImage}
            alt="Creator with headphones holding a tablet"
            width={579}
            height={719}
            sizes="(min-width: 1280px) 579px, 90vw"
            className="pointer-events-none absolute left-[7px] top-0 z-10 h-[719px] w-[579px] max-w-none"
          />

          <Card
            className={cn(
              statCardClassName,
              'left-0 top-[198px] z-20 w-[135px] items-start'
            )}
          >
            <p className="font-body text-label-m font-medium">Year to Date</p>
            <p className="font-body text-[10px] leading-[1.5] opacity-80">
              2023
            </p>
            <p className="mt-8 font-heading text-[20px] font-semibold leading-[1.2]">
              $1,200.38
            </p>
            <span className="mt-8 rounded-pill bg-brand-lime-400 px-8 py-4 font-body text-[10px] font-medium leading-none text-shuttle-gray-950">
              +12$
            </span>
          </Card>

          <Image
            src="/assets/home/hero/spring-alt-lime.png"
            alt=""
            width={686}
            height={900}
            className="pointer-events-none absolute left-[337px] top-[149px] z-20 h-auto w-[130px] rotate-[35deg]"
          />
          <HappyStudentsCard className="absolute left-[283px] top-[416px] z-20 shadow-elevation-a" />
        </ScaledCanvas>
      </div>

      <div className="flex flex-col gap-40 xl:absolute xl:left-[652px] xl:top-[127px] xl:w-[551px]">
        <SectionHeader
          id="creator-heading"
          title={content.creatorTitle}
          body={
            <>
              <span className="font-medium text-shuttle-gray-950">
                {content.creatorBodyBrand}
              </span>
              {content.creatorBody}
            </>
          }
          align="start"
          className="gap-40"
          titleClassName="xl:w-[420px]"
        />
        <ul className="flex list-none flex-col gap-12 p-0">
          {content.creatorBullets.map((bullet) => (
            <li key={bullet} className="flex min-h-[28px] items-center gap-12">
              <CheckIcon />
              <span className="font-body text-body-l text-shuttle-gray-950">
                {bullet}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

export default CreatorSection
