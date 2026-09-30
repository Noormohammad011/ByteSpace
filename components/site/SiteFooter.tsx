import Image from 'next/image'
import Link from 'next/link'
import type { FooterColumn, HomeContent } from '@/data/types'
import Container from '@/components/layout/Container'
import NewsletterForm from './NewsletterForm'

type SiteFooterProps = {
  content: HomeContent
  columns: FooterColumn[]
}

const footerLinkClassName =
  'inline-flex min-h-[44px] min-w-[44px] items-center font-body text-shuttle-gray-950 lg:min-h-0 lg:min-w-0'

const SiteFooter = ({ content, columns }: SiteFooterProps) => {
  return (
    <footer className="w-full border-t border-shuttle-gray-200 bg-neutral-white pb-40 pt-60 md:pt-72">
      <Container className="flex flex-col gap-64 xl:gap-[120px]">
        <div className="flex flex-col gap-48 xl:flex-row xl:items-start xl:justify-between">
          <div className="flex max-w-[500px] flex-col gap-24">
            <Link
              href="/"
              className="flex min-h-[44px] items-center gap-8 self-start lg:min-h-0"
              aria-label="ByteSpace home"
            >
              <Image
                src="/assets/home/icons/logo.svg"
                alt=""
                width={29}
                height={32}
              />
              <span className="font-heading text-[24px] font-bold text-shuttle-gray-950">
                ByteSpace
              </span>
            </Link>
            <NewsletterForm
              title={content.newsletterTitle}
              placeholder={content.newsletterPlaceholder}
              buttonLabel={content.newsletterButton}
              disclaimer={content.newsletterDisclaimer}
            />
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-32 gap-y-24 sm:grid-cols-3 xl:w-[580px] xl:grid-cols-[207px_207px_166px] xl:gap-0 xl:pt-56"
          >
            {columns.map((column) => (
              <div key={column.id}>
                <h2 className="sr-only">{column.title}</h2>
                <ul className="flex list-none flex-col p-0 lg:gap-16">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className={`${footerLinkClassName} text-body-s`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-16 border-t border-shuttle-gray-200 pt-32 md:flex-row md:items-center md:justify-between">
          <p className="font-body text-body-xs text-shuttle-gray-950">
            {content.copyright}
          </p>
          <ul className="flex list-none flex-wrap gap-x-24 p-0">
            {content.legalLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`${footerLinkClassName} text-body-xs`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  )
}

export default SiteFooter
