import type { Metadata } from 'next'
import { ViewTransition } from 'react'
import CategoriesSection from '@/components/home/sections/CategoriesSection'
import CoursesSection from '@/components/home/sections/CoursesSection'
import CreatorSection from '@/components/home/sections/CreatorSection'
import CtaSection from '@/components/home/sections/CtaSection'
import GrowthSection from '@/components/home/sections/GrowthSection'
import HeroSection from '@/components/home/sections/HeroSection'
import PartnersSection from '@/components/home/sections/PartnersSection'
import TestimonialsSection from '@/components/home/sections/TestimonialsSection'
import { categoryPaths } from '@/data/categoryPaths'
import { categoryTabs } from '@/data/categoryTabs'
import { courses } from '@/data/courses'
import { home } from '@/data/home'
import { partners } from '@/data/partners'
import { stats } from '@/data/stats'
import { testimonials } from '@/data/testimonials'

export const metadata: Metadata = {
  title: 'ByteSpace | Courses for creators and learners',
  description: home.heroBody,
  openGraph: {
    title: 'ByteSpace | Courses for creators and learners',
    description: home.heroBody,
    images: [{ url: '/assets/exports/home.png' }],
  },
}

const Page = () => {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      <HeroSection content={home} />
      <PartnersSection partners={partners} />
      <CoursesSection content={home} tabs={categoryTabs} courses={courses} />
      <CategoriesSection content={home} paths={categoryPaths} />
      <div className="relative overflow-hidden bg-shuttle-gray-50">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute left-[10%] top-[-280px] size-[640px] rounded-full bg-brand-lime-400/40 blur-[120px]" />
          <div className="absolute right-[-240px] top-[-160px] size-[520px] rounded-full bg-brand-blue-800/10 blur-[120px]" />
          <div className="absolute left-[-280px] top-[440px] size-[520px] rounded-full bg-brand-blue-800/15 blur-[120px]" />
          <div className="absolute bottom-[-300px] left-[-240px] size-[600px] rounded-full bg-brand-lime-400/40 blur-[120px]" />
          <div className="absolute bottom-[-280px] right-[-160px] size-[600px] rounded-full bg-brand-blue-800/15 blur-[120px]" />
        </div>
        <GrowthSection
          content={home}
          stats={stats}
          featuredCourse={courses[0]}
        />
        <CreatorSection content={home} />
      </div>
      <CtaSection content={home} />
      <TestimonialsSection content={home} testimonials={testimonials} />
    </ViewTransition>
  )
}

export default Page
