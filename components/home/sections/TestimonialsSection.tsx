import Image from 'next/image'
import type { HomeContent, Testimonial } from '@/data/types'
import Section from '@/components/layout/Section'
import { RevealItem } from '@/components/motion/Reveal'
import { Avatar } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'

type TestimonialsSectionProps = {
  content: HomeContent
  testimonials: Testimonial[]
}

const TestimonialsSection = ({
  content,
  testimonials,
}: TestimonialsSectionProps) => {
  return (
    <Section
      aria-labelledby="testimonials-heading"
      className="overflow-hidden bg-shuttle-gray-50 xl:pb-56 xl:pt-[88px]"
      containerClassName="flex flex-col gap-48 xl:gap-72"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-[34%] top-[-200px] size-[520px] rounded-full bg-brand-lime-400/40 blur-[120px]" />
        <div className="absolute right-[-200px] top-[80px] size-[480px] rounded-full bg-brand-lime-400/30 blur-[120px]" />
        <div className="absolute bottom-[-220px] left-[-160px] size-[480px] rounded-full bg-brand-blue-800/15 blur-[120px]" />
      </div>

      <RevealItem className="relative flex flex-col gap-24 md:flex-row md:items-center md:justify-between md:gap-40">
        <h2
          id="testimonials-heading"
          className="max-w-[480px] font-heading text-heading-m font-semibold text-shuttle-gray-950"
        >
          {content.testimonialsTitle}
        </h2>
        <p className="max-w-[580px] font-body text-body-l text-shuttle-gray-700">
          {content.testimonialsBody}
        </p>
      </RevealItem>

      <ul className="relative grid list-none grid-cols-1 items-start gap-24 p-0 lg:grid-cols-3 xl:gap-40">
        {testimonials.map((item, index) => (
          <RevealItem as="li" key={item.id} order={index + 1}>
            <Card className="w-full gap-32 rounded-[24px] bg-neutral-white p-24 ring-0">
              <div className="flex flex-col gap-24">
                <Avatar className="size-80 after:hidden">
                  <Image
                    src={item.avatar}
                    alt=""
                    width={80}
                    height={80}
                    className="size-full rounded-full object-cover"
                  />
                </Avatar>
                <div>
                  <p className="font-heading text-[20px] font-semibold leading-[1.2] text-shuttle-gray-950">
                    {item.name}
                  </p>
                  <p className="mt-4 font-body text-body-m text-brand-blue-800">
                    {item.role}
                  </p>
                </div>
              </div>
              <p className="font-body text-body-l text-shuttle-gray-700">
                {item.quote}
              </p>
            </Card>
          </RevealItem>
        ))}
      </ul>
    </Section>
  )
}

export default TestimonialsSection
