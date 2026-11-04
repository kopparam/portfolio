import { type Metadata } from 'next'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  // Lets the favicons and the share card resolve to absolute URLs.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    template: '%s - Kashyap Kopparam',
    default:
      'Kashyap Kopparam - Solution Architect, love everything tech',
  },
  description:
    'I\'m Kashyap, a Solution Architect, with Product Owner, Engineering Manager and Software Engineering background, based in Singapore. I\'m working with Audax to supercharge banks\' growth with plug-and-play digital solutions, fueling digital banking and embedded finance solutions.',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="kl-page flex min-h-full flex-col">
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  )
}
