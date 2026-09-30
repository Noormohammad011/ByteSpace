export type NavLink = {
  id: string
  label: string
  href: string
}

export type CategoryTab = {
  id: string
  label: string
}

export type Course = {
  id: string
  title: string
  thumbnail: string
  rating: number
  priceLabel: string
  priceSuffix: string
  badge?: string
  instructorName: string
  instructorAvatar: string
  categoryTabId: string
  lessonsLabel: string
  durationLabel: string
  commentsLabel: string
  levelLabel: string
  studentsPlusLabel: string
  studentAvatars: string[]
}

export type CategoryPath = {
  id: string
  name: string
  icon: string
}

export type Partner = {
  id: string
  name: string
  logo: string
}

export type Stat = {
  id: string
  label: string
  value: string
}

export type Testimonial = {
  id: string
  name: string
  role: string
  quote: string
  avatar: string
}

export type FooterLink = {
  label: string
  href: string
}

export type FooterColumn = {
  id: string
  title: string
  links: FooterLink[]
}

export type AuthPageContent = {
  promoTitle: string
  promoBody: string
  eyebrow: string
  title: string
  submitLabel: string
  switchPrompt: string
  switchLabel: string
  switchHref: string
}

export type HomeContent = {
  heroTitle: string
  heroBody: string
  heroSearchPlaceholder: string
  heroSearchButton: string
  coursesTitle: string
  coursesBody: string
  coursesMoreLabel: string
  categoriesTitle: string
  categoriesBody: string
  growthTitle: string
  growthBody: string
  creatorTitle: string
  creatorBodyBrand: string
  creatorBody: string
  creatorImage: string
  creatorBullets: string[]
  ctaTitle: string
  ctaBody: string
  ctaButtonLabel: string
  testimonialsTitle: string
  testimonialsBody: string
  newsletterTitle: string
  newsletterPlaceholder: string
  newsletterButton: string
  newsletterDisclaimer: string
  copyright: string
  legalLinks: FooterLink[]
}
