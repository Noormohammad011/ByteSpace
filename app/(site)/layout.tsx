import SiteFooter from '@/components/site/SiteFooter'
import SiteHeaderBar from '@/components/site/SiteHeaderBar'
import { footerColumns } from '@/data/footerColumns'
import { home } from '@/data/home'

const SiteLayout = ({ children }: LayoutProps<'/'>) => {
  return (
    <main className="relative w-full overflow-x-hidden bg-neutral-white">
      <SiteHeaderBar />
      {children}
      <SiteFooter content={home} columns={footerColumns} />
    </main>
  )
}

export default SiteLayout
