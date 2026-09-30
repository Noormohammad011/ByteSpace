import type { FooterColumn } from './types'

// invented: column titles are not visible in Figma; they only label each link group for screen readers
export const footerColumns: FooterColumn[] = [
  {
    id: 'courses',
    title: 'Courses',
    links: [
      { label: 'Featured Courses', href: '/#' },
      { label: 'Featured Categories', href: '/#' },
      { label: 'Business', href: '/#' },
      { label: 'IT', href: '/#' },
      { label: 'Design', href: '/#' },
    ],
  },
  {
    id: 'categories',
    title: 'Categories',
    links: [
      { label: 'Development', href: '/#' },
      { label: 'Marketing', href: '/#' },
      { label: 'Photography', href: '/#' },
      { label: 'Finance', href: '/#' },
      { label: 'Sport', href: '/#' },
    ],
  },
  {
    id: 'company',
    title: 'Company',
    links: [
      { label: 'Become a Creator', href: '/#creator' },
      { label: 'Affiliate Program', href: '/#' },
      { label: 'Contact', href: '/#' },
      { label: 'Help', href: '/#' },
      { label: 'About', href: '/#' },
    ],
  },
]
