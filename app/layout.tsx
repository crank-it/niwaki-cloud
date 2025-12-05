import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export const dynamic = 'force-dynamic'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: 'niwaki.cloud | Japanese Cloud Pruning Community',
    template: '%s | niwaki.cloud'
  },
  description: 'The definitive global resource for Japanese cloud pruning (niwaki). Visualise your garden, explore techniques, and join our community.',
  keywords: ['niwaki', 'cloud pruning', 'Japanese garden', 'topiary', 'cloud trees', 'garden design', 'bonsai', 'Japanese aesthetics'],
  authors: [{ name: 'niwaki.cloud' }],
  openGraph: {
    title: 'niwaki.cloud | Japanese Cloud Pruning Community',
    description: 'The definitive global resource for Japanese cloud pruning (niwaki). Visualise your garden, explore techniques, and join our community.',
    url: 'https://niwaki.cloud',
    siteName: 'niwaki.cloud',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'niwaki.cloud | Japanese Cloud Pruning Community',
    description: 'The definitive global resource for Japanese cloud pruning (niwaki).',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} min-h-screen bg-stone-100 ink-wash flex flex-col`}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}
