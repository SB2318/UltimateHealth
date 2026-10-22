import type { Metadata } from 'next'
import { Inter, DM_Sans, DM_Serif_Display } from 'next/font/google'
import '../globals.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { cn } from '@/lib/utils'
import { TooltipProvider } from '@/components/ui/tooltip'
import { headers } from 'next/headers'
import { ThemeProvider } from '@/components/theme-provider'
import { AuthProvider } from '@/contexts/AuthContext'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import CookieConsent from "@/components/ui/cookie-consent";
import ExplorePlatformModal from "@/components/home/ExplorePlatformModal";
import ScrollToHash from "@/components/ScrollToHash";
import {
  SITE_URL,
  FULL_SITE_URL,
  BRAND_NAME,
  BRAND_MOTTO,
  BRAND_MISSION,
  getCanonicalUrl,
  getHreflangAlternates,
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
} from "@/lib/seo";

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-serif',
  display: 'swap',
})
// A single Inter instance backs both --font-inter and --font-heading; declaring it
// twice shipped two identical @font-face sets and duplicated the font files.
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const dynamic = 'force-dynamic'
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ''

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonicalUrl = getCanonicalUrl(locale);
  const alternates = getHreflangAlternates();

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${BRAND_NAME} — ${BRAND_MOTTO}`,
      template: `%s | ${BRAND_NAME}`,
    },
    description: `${BRAND_MISSION} Evidence-based clinical articles, multilingual medical glossary, and community health podcasts.`,
    keywords: [
      'health education',
      'cardiovascular wellness',
      'evidence-based medicine',
      'medical glossary',
      'health podcasts',
      'trustworthy health info',
      'UltimateHealth',
    ],
    authors: [{ name: 'UltimateHealth Community Contributors' }],
    creator: BRAND_NAME,
    publisher: BRAND_NAME,
    applicationName: BRAND_NAME,
    alternates: {
      canonical: canonicalUrl,
      languages: alternates,
    },
    icons: {
      icon: [
        { url: `${BASE_PATH}/favicon.ico` },
        { url: `${BASE_PATH}/icon1.png`, type: 'image/png' },
      ],
      apple: `${BASE_PATH}/apple-icon.png`,
    },
    openGraph: {
      title: `${BRAND_NAME} — ${BRAND_MOTTO}`,
      description: BRAND_MISSION,
      url: canonicalUrl,
      siteName: BRAND_NAME,
      locale: locale,
      type: 'website',
      images: [
        {
          url: `${FULL_SITE_URL}/icon1.png`,
          width: 512,
          height: 512,
          alt: `${BRAND_NAME} Brand Identity`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${BRAND_NAME} — ${BRAND_MOTTO}`,
      description: BRAND_MISSION,
      images: [`${FULL_SITE_URL}/icon1.png`],
      creator: '@SUSMITA2360',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
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

  const organizationJsonLd = buildOrganizationJsonLd();
  const websiteJsonLd = buildWebSiteJsonLd(locale);

  return (
    <html
      lang={locale}
      nonce={nonce}
      data-nonce={nonce}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={cn('font-sans', dmSans.variable, inter.variable, dmSerifDisplay.variable)}
    >
      <head>
        <script
          type="application/ld+json"
          nonce={nonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          nonce={nonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            storageKey="uh-theme-v2"
            disableTransitionOnChange
            nonce={nonce}
          >
            <TooltipProvider>
              {children}
              <ScrollToHash />
              <CookieConsent />
              <ExplorePlatformModal />
            </TooltipProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
