import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import localFont from 'next/font/local'

import './globals.css'

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const satoshi = localFont({
  src: [
    {
      path: './fonts/Satoshi-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Satoshi-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-satoshi',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ByteSpace',
  description: 'ByteSpace course marketplace',
}

const RootLayout = ({ children }: LayoutProps<'/'>) => {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${satoshi.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="flex min-h-full flex-col font-body"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}

export default RootLayout
