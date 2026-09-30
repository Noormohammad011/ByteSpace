import Image from 'next/image'
import Link from 'next/link'
import type { NavLink } from '@/data/types'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import MobileNav from './MobileNav'

type SiteHeaderProps = {
  links: NavLink[]
  currentId: string
}

const BagIcon = () => (
  <Image src="/assets/home/icons/bag.svg" alt="" width={24} height={24} />
)

const SiteHeader = ({ links, currentId }: SiteHeaderProps) => {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="relative mx-auto flex h-[72px] w-full max-w-[1440px] items-center justify-between px-page-mobile md:px-page-tablet lg:h-[120px] lg:px-0">
        <Link
          href="/"
          className="flex min-h-[44px] items-center gap-8 lg:absolute lg:left-[122px] lg:top-[35px] lg:min-h-0"
          aria-label="ByteSpace home"
        >
          <Image
            src="/assets/home/icons/logo.svg"
            alt=""
            width={29}
            height={32}
            className="h-[31.5px] w-[28.875px]"
          />
          <span className="font-heading text-[24px] font-bold leading-none text-shuttle-gray-50">
            ByteSpace
          </span>
        </Link>

        <nav
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 gap-24 lg:flex"
          aria-label="Primary"
        >
          {links.map((link) => {
            const isCurrent = link.id === currentId
            return (
              <Link
                key={link.id}
                href={link.href}
                aria-current={isCurrent ? 'page' : undefined}
                className={cn(
                  'font-body text-body-m text-shuttle-gray-50',
                  isCurrent && 'text-label-m font-medium'
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="absolute right-[120px] top-[48px] hidden items-center gap-24 lg:flex">
          <Link
            href="/login"
            className="font-body text-body-m text-shuttle-gray-50"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="font-body text-body-m text-shuttle-gray-50"
          >
            Join Us
          </Link>
          <Button
            variant="ghostLight"
            className="size-24 rounded-none p-0 hover:bg-transparent"
            aria-label="Shopping bag"
          >
            <BagIcon />
          </Button>
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <Button
            variant="ghostLight"
            size="icon-touch"
            aria-label="Shopping bag"
          >
            <BagIcon />
          </Button>
          <MobileNav links={links} currentId={currentId} />
        </div>
      </div>
    </header>
  )
}

export default SiteHeader
