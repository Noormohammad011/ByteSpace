'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MenuIcon } from 'lucide-react'
import type { NavLink } from '@/data/types'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

type MobileNavProps = {
  links: NavLink[]
  currentId: string
}

const MENU_TITLE = 'Menu'
const OPEN_MENU_LABEL = 'Open menu'
// Matches the `lg` breakpoint, where the inline header nav replaces this menu.
const DESKTOP_NAV_QUERY = '(min-width: 1024px)'

const MobileNav = ({ links, currentId }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const desktopNav = window.matchMedia(DESKTOP_NAV_QUERY)
    const handleDesktopNavChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false)
    }
    desktopNav.addEventListener('change', handleDesktopNavChange)
    return () =>
      desktopNav.removeEventListener('change', handleDesktopNavChange)
  }, [])

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghostLight"
          size="icon-touch"
          aria-label={OPEN_MENU_LABEL}
        >
          <MenuIcon className="size-24" aria-hidden />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        aria-describedby={undefined}
        className="gap-0 overflow-y-auto bg-neutral-white px-24 pb-32 pt-8 data-[side=right]:w-4/5 data-[side=right]:max-w-[320px] data-[side=right]:sm:max-w-[320px]"
      >
        <SheetTitle className="sr-only">{MENU_TITLE}</SheetTitle>
        <SheetClose asChild>
          <Link
            href="/"
            className="flex min-h-[44px] items-center gap-8 self-start"
            aria-label="ByteSpace home"
          >
            <Image
              src="/assets/home/icons/logo.svg"
              alt=""
              width={29}
              height={32}
            />
            <span className="font-heading text-[24px] font-bold leading-none text-shuttle-gray-950">
              ByteSpace
            </span>
          </Link>
        </SheetClose>
        <nav aria-label="Mobile" className="mt-24">
          <ul className="flex list-none flex-col p-0">
            {links.map((link) => {
              const isCurrent = link.id === currentId
              return (
                <li key={link.id}>
                  <SheetClose asChild>
                    <Link
                      href={link.href}
                      aria-current={isCurrent ? 'page' : undefined}
                      className={cn(
                        'flex min-h-[44px] items-center font-body text-body-m text-shuttle-gray-950',
                        isCurrent && 'font-medium text-brand-blue-800'
                      )}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="mt-24 flex flex-col gap-12 border-t border-shuttle-gray-100 pt-24">
          <SheetClose asChild>
            <Link
              href="/login"
              className="flex min-h-[44px] items-center font-body text-body-m text-shuttle-gray-950"
            >
              Sign In
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Button asChild variant="lime" size="touch">
              <Link href="/register">Join Us</Link>
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav
