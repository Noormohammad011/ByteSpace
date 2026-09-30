'use client'

import {
  startTransition,
  useState,
  ViewTransition,
  type FocusEvent,
  type ReactNode,
} from 'react'
import type { CategoryTab } from '@/data/types'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

type CourseTabsProps = {
  tabs: CategoryTab[]
  defaultValue: string
  moreLink: ReactNode
  children: ReactNode
}

const handleTriggerFocus = (event: FocusEvent<HTMLButtonElement>) => {
  event.currentTarget.scrollIntoView({ block: 'nearest', inline: 'nearest' })
}

const CourseTabs = ({
  tabs,
  defaultValue,
  moreLink,
  children,
}: CourseTabsProps) => {
  const [value, setValue] = useState(defaultValue)

  const handleValueChange = (nextValue: string) => {
    startTransition(() => setValue(nextValue))
  }

  return (
    <Tabs
      value={value}
      onValueChange={handleValueChange}
      className="w-full items-center gap-48 xl:gap-80"
    >
      <div className="flex w-full flex-col items-center gap-16 lg:max-w-[1100px] lg:flex-row lg:flex-wrap lg:justify-center lg:gap-x-16 lg:gap-y-20">
        <TabsList
          variant="pill"
          aria-label="Course categories"
          className="w-full snap-x justify-start overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_24px,black_calc(100%-24px),transparent)] [scrollbar-width:none] lg:contents"
        >
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              onFocus={handleTriggerFocus}
              className="snap-start"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {moreLink}
      </div>
      <ViewTransition
        key={value}
        name="course-grid"
        share="course-grid"
        default="none"
      >
        {children}
      </ViewTransition>
    </Tabs>
  )
}

export default CourseTabs
