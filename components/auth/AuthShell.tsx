import Image from 'next/image'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { authCollageCourses } from '@/data'
import AuthCollage from './AuthCollage'

type AuthShellProps = {
  promoTitle: string
  promoBody: string
  children: ReactNode
}

// Figma grid: 2px white lines at 12% every 120px, aligned to the centered 1440 frame.
const gridBackground =
  'bg-[linear-gradient(to_right,rgb(255_255_255/0.12)_2px,transparent_2px),linear-gradient(to_bottom,rgb(255_255_255/0.12)_2px,transparent_2px)] bg-size-[120px_120px] bg-position-[calc(50%-720px)_-2px]'

const AuthShell = ({ promoTitle, promoBody, children }: AuthShellProps) => {
  return (
    <main
      className={`relative w-full flex-1 overflow-x-hidden bg-brand-blue-800 ${gridBackground}`}
    >
      <div className="relative mx-auto flex w-full max-w-[628px] flex-col gap-32 px-page-mobile pb-48 pt-16 md:px-page-tablet md:pb-64 lg:max-w-[1440px] lg:flex-row lg:items-start lg:justify-between lg:gap-48 lg:px-page-desktop lg:pb-120 lg:pt-[116px] xl:min-h-[1024px] xl:pl-[122px] xl:pr-120">
        <Link
          href="/"
          className="flex min-h-[44px] min-w-[44px] items-center self-start lg:absolute lg:left-page-desktop lg:top-[35px] lg:min-h-0 lg:min-w-0 xl:left-[122px]"
          aria-label="ByteSpace home"
        >
          <Image
            src="/assets/home/icons/logo.svg"
            alt=""
            width={29}
            height={32}
            className="h-[31.5px] w-[28.875px]"
          />
        </Link>

        <section className="flex flex-col lg:min-w-0 lg:flex-1 xl:max-w-[500px]">
          <div className="flex flex-col gap-16 xl:h-[184px]">
            <h2 className="font-heading text-heading-xs font-semibold tracking-normal text-shuttle-gray-50">
              {promoTitle}
            </h2>
            <p className="font-body text-body-l text-shuttle-gray-50 xl:max-w-[480px]">
              {promoBody}
            </p>
          </div>
          <AuthCollage
            backCourse={authCollageCourses.back}
            frontCourse={authCollageCourses.front}
            className="hidden lg:mt-48 lg:block xl:mt-0"
          />
        </section>

        <div className="w-full lg:w-[440px] lg:shrink-0 xl:mt-4 xl:w-[580px]">
          {children}
        </div>
      </div>
    </main>
  )
}

export default AuthShell
