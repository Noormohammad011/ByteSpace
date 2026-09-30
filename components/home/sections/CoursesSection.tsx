import Link from 'next/link'
import type { CategoryTab, Course, HomeContent } from '@/data/types'
import Section from '@/components/layout/Section'
import SectionHeader from '@/components/layout/SectionHeader'
import { RevealItem } from '@/components/motion/Reveal'
import { TabsContent } from '@/components/ui/tabs'
import CourseCard from '../cards/CourseCard'
import CourseTabs from '../CourseTabs'
import EmptyList from '../EmptyList'

type CoursesSectionProps = {
  content: HomeContent
  tabs: CategoryTab[]
  courses: Course[]
}

const DEFAULT_TAB_ID = 'featured'

const CoursesSection = ({ content, tabs, courses }: CoursesSectionProps) => {
  return (
    <Section
      id="courses"
      aria-labelledby="courses-heading"
      className="bg-neutral-white xl:pb-80 xl:pt-72"
      containerClassName="flex flex-col items-center gap-40"
    >
      <SectionHeader
        id="courses-heading"
        title={content.coursesTitle}
        body={content.coursesBody}
        titleClassName="max-w-[560px]"
        bodyClassName="max-w-[930px]"
      />

      <RevealItem order={1} className="w-full">
        <CourseTabs
          tabs={tabs}
          defaultValue={DEFAULT_TAB_ID}
          moreLink={
            <Link
              href="/#courses"
              className="inline-flex min-h-[44px] items-center px-8 font-body text-label-m font-medium text-brand-blue-800"
            >
              {content.coursesMoreLabel}
            </Link>
          }
        >
          {tabs.map((tab) => {
            const tabCourses = courses.filter(
              (course) => course.categoryTabId === tab.id
            )
            return (
              <TabsContent key={tab.id} value={tab.id} className="w-full">
                {tabCourses.length === 0 ? (
                  <EmptyList
                    title="No courses in this category"
                    description="Try another tab to browse available courses."
                  />
                ) : (
                  <div className="grid w-full grid-cols-1 justify-center gap-24 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[repeat(3,373px)] xl:gap-40">
                    {tabCourses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                )}
              </TabsContent>
            )
          })}
        </CourseTabs>
      </RevealItem>
    </Section>
  )
}

export default CoursesSection
