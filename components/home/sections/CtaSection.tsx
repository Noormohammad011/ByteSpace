import Link from 'next/link'
import Image from 'next/image'
import type { HomeContent } from '@/data/types'
import Section from '@/components/layout/Section'
import { RevealItem } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/button'
import Ornaments, { type Ornament } from '../Ornaments'

type CtaSectionProps = {
  content: HomeContent
}

const ctaOrnaments: Ornament[] = [
  {
    id: 'spring-lime-top',
    src: '/assets/home/hero/spring-lime.png',
    width: 847,
    height: 900,
    from: 'lg',
    className: 'left-[-40px] top-[-30px] w-[150px] xl:w-[200px]',
  },
  {
    id: 'spring-white',
    src: '/assets/home/hero/spring-white.png',
    width: 847,
    height: 900,
    from: 'xl',
    className: 'left-[210px] top-[34px] w-[120px]',
  },
  {
    id: 'cone-white',
    src: '/assets/home/hero/cone-white.png',
    width: 757,
    height: 900,
    from: 'xl',
    className: 'left-[-20px] top-[246px] w-[130px]',
  },
  {
    id: 'torus-lime',
    src: '/assets/home/hero/torus-lime.png',
    width: 900,
    height: 824,
    from: 'xl',
    className: 'left-[75px] top-[366px] w-[245px]',
  },
  {
    id: 'pyramid-lime',
    src: '/assets/home/hero/pyramid-lime.png',
    width: 818,
    height: 900,
    from: 'xl',
    className: 'left-[1101px] top-[23px] w-[137px]',
  },
  {
    id: 'cylinder-white',
    src: '/assets/home/hero/cylinder-white.png',
    width: 821,
    height: 900,
    from: 'lg',
    className:
      'right-[-70px] top-[62px] w-[170px] xl:right-[-50px] xl:w-[221px]',
  },
  {
    id: 'spring-lime-bottom',
    src: '/assets/home/hero/spring-alt-lime.png',
    width: 686,
    height: 900,
    from: 'xl',
    className: 'left-[1206px] top-[330px] w-[190px]',
  },
]

const CtaSection = ({ content }: CtaSectionProps) => {
  return (
    <Section
      aria-labelledby="cta-heading"
      className="overflow-hidden bg-brand-blue-800 xl:h-[490px] xl:pb-0 xl:pt-[93px]"
      containerClassName="flex max-w-[960px] flex-col items-center gap-32 text-center lg:max-w-[720px] xl:max-w-[960px] xl:px-0"
    >
      <Image
        src="/assets/home/hero/bg-grid.svg"
        alt=""
        fill
        className="pointer-events-none object-cover"
      />
      <Ornaments items={ctaOrnaments} />

      <RevealItem
        as="h2"
        id="cta-heading"
        className="relative max-w-[620px] font-heading text-heading-m font-semibold text-neutral-white"
      >
        {content.ctaTitle}
      </RevealItem>
      <RevealItem
        as="p"
        order={1}
        className="relative font-body text-body-l text-shuttle-gray-100"
      >
        {content.ctaBody}
      </RevealItem>
      <RevealItem order={2} className="relative w-full sm:w-auto">
        <Button
          asChild
          variant="lime"
          size="touch"
          className="w-full sm:w-auto"
        >
          <Link href="/#creator">{content.ctaButtonLabel}</Link>
        </Button>
      </RevealItem>
    </Section>
  )
}

export default CtaSection
