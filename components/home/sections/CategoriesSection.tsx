import Image from 'next/image'
import type { CategoryPath, HomeContent } from '@/data/types'
import Section from '@/components/layout/Section'
import SectionHeader from '@/components/layout/SectionHeader'
import { Card } from '@/components/ui/card'

type CategoriesSectionProps = {
  content: HomeContent
  paths: CategoryPath[]
}

const CategoriesSection = ({ content, paths }: CategoriesSectionProps) => {
  return (
    <Section
      aria-labelledby="categories-heading"
      className="bg-neutral-white pt-0 md:pt-0 xl:pb-120"
      containerClassName="flex flex-col gap-40"
    >
      <SectionHeader
        id="categories-heading"
        title={content.categoriesTitle}
        body={content.categoriesBody}
        bodyClassName="max-w-[930px]"
      />
      <ul className="grid list-none grid-cols-2 gap-16 p-0 sm:grid-cols-3 md:gap-24 lg:grid-cols-6 lg:gap-40">
        {paths.map((path) => (
          <li key={path.id}>
            <Card className="aspect-square items-center justify-center gap-12 rounded-[24px] border border-shuttle-gray-200 bg-neutral-white p-0 ring-0">
              <div className="flex items-center justify-center rounded-[40px] bg-brand-lime-400 p-12">
                <Image src={path.icon} alt="" width={36} height={36} />
              </div>
              <p className="text-center font-body text-label-xl font-medium text-shuttle-gray-950">
                {path.name}
              </p>
            </Card>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export default CategoriesSection
