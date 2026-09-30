import Image from 'next/image'
import type { Partner } from '@/data/types'
import Section from '@/components/layout/Section'

type PartnersSectionProps = {
  partners: Partner[]
}

const PartnersSection = ({ partners }: PartnersSectionProps) => {
  return (
    <Section
      aria-label="Partners"
      className="bg-shuttle-gray-50 xl:flex xl:h-[200px] xl:items-end xl:pb-80 xl:pt-0"
    >
      <ul className="grid list-none grid-cols-2 justify-items-center gap-x-24 gap-y-32 p-0 sm:grid-cols-3 lg:flex lg:items-end lg:justify-center lg:gap-72">
        {partners.map((partner) => (
          <li
            key={partner.id}
            className="relative h-[41px] w-[168px] max-w-full"
          >
            <Image
              src={partner.logo}
              alt={partner.name}
              fill
              sizes="168px"
              className="object-contain object-center lg:object-left"
            />
          </li>
        ))}
      </ul>
    </Section>
  )
}

export default PartnersSection
