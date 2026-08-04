import type { Metadata } from 'next'
import { Inter, DM_Sans } from 'next/font/google'
import '../globals2.css'
import '../globals.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { cn } from '@/lib/utils'
import { TooltipProvider } from '@/components/ui/tooltip'
import { headers } from 'next/headers'
import { ThemeProvider } from '@/components/theme-provider'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'

const interHeading = Inter({ subsets: ['latin'], variable: '--font-heading' })
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' })
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const dynamic = 'force-dynamic'
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''

export const metadata: Metadata = {
  title: 'UltimateHealth - Empowering Wellness Through Global Community',
  description:
    'UltimateHealth is a platform that lets you publish health knowledge in your own language, review content, and share podcasts with the world.',
  keywords: 'health, wellness, community, articles, podcasts, multilingual',
  icons: {
    icon: [
      { url: `${BASE_PATH}/favicon.ico` },
      { url: `${BASE_PATH}/icon1.png`, type: 'image/png' },
    ],
    apple: `${BASE_PATH}/apple-icon.png`,
  },
  openGraph: {
    title: 'UltimateHealth',
    description: 'Empowering Wellness Through Global Community',
    type: 'website',
  },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound()
  }

  const nonce = (await headers()).get('x-nonce') ?? undefined
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      nonce={nonce}
      data-nonce={nonce}
      suppressHydrationWarning
      className={cn(
        'font-sans',
        dmSans.variable,
        inter.variable,
        interHeading.variable,
      )}
    >
      <body className={`${inter.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>{children}</TooltipProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
