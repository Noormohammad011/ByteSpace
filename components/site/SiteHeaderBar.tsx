'use client'

import { usePathname } from 'next/navigation'
import { navLinks } from '@/data/navLinks'
import SiteHeader from './SiteHeader'

const currentIdForPath = (pathname: string) => {
  const match = navLinks.find((link) => link.href === pathname)
  return match?.id ?? ''
}

const SiteHeaderBar = () => {
  const pathname = usePathname()

  return <SiteHeader links={navLinks} currentId={currentIdForPath(pathname)} />
}

export default SiteHeaderBar
