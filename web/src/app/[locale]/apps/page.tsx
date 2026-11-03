import type { Metadata } from 'next';
import { headers } from 'next/headers';
import AppsPageClient from './AppsPageClient';
import {
  BRAND_NAME,
  FULL_SITE_URL,
  getCanonicalUrl,
  getHreflangAlternates,
  buildBreadcrumbJsonLd,
} from '@/lib/seo';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export const revalidate = 3600;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const canonical = getCanonicalUrl(locale, '/apps');
  const alternates = getHreflangAlternates('/apps');

  return {
    title: 'Explore Our Apps — Open Source Health Ecosystem',
    description:
      'Explore the open-source mobile and web applications of the UltimateHealth ecosystem: community health guides, audio podcasts, and clinical review workstations.',
    alternates: {
      canonical,
      languages: alternates,
    },
    openGraph: {
      title: `Explore Our Apps — Open Source Health Ecosystem | ${BRAND_NAME}`,
      description:
        'Different tools, one shared purpose: making health information easier to access, understand, and improve together.',
      url: canonical,
      siteName: `${BRAND_NAME} Blog`,
      locale: locale,
      type: 'website',
      images: [
        {
          url: `${FULL_SITE_URL}/icon1.png`,
          width: 512,
          height: 512,
          alt: `${BRAND_NAME} Apps Directory`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Explore Our Apps — Open Source Health Ecosystem | ${BRAND_NAME}`,
      description:
        'Explore community health guides, audio podcasts, and clinical review tools across the UltimateHealth ecosystem.',
      images: [`${FULL_SITE_URL}/icon1.png`],
    },
  };
}

export default async function AppsPage({ params }: PageProps) {
  const { locale } = await params;
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  const breadcrumbsJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', url: getCanonicalUrl(locale) },
    { name: 'Apps', url: getCanonicalUrl(locale, '/apps') },
  ]);

  const appsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'UltimateHealth Ecosystem Applications',
    description:
      'Different tools, one shared purpose: making health information easier to access, understand, and improve together.',
    url: getCanonicalUrl(locale, '/apps'),
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@type': 'SoftwareApplication',
          name: 'UltimateHealth',
          applicationCategory: 'HealthApplication',
          operatingSystem: 'Android',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          url: 'https://play.google.com/store/apps/details?id=com.anonymous.UltimateHealth',
          description:
            'Accessible, open-source mobile companion for exploring evidence-based health guides, audio wellness podcasts, and plain-language medical terms.',
        },
      },
      {
        '@type': 'ListItem',
        position: 2,
        item: {
          '@type': 'SoftwareApplication',
          name: 'UltimateHealth Admin',
          applicationCategory: 'HealthApplication',
          operatingSystem: 'Android',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
          },
          url: 'https://play.google.com/store/apps/details?id=com.ultimatehealth.admin',
          description:
            'Dedicated review workstation for certified medical moderators and resident doctors to audit health content, verify citations, and protect clinical dignity.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        nonce={nonce}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        nonce={nonce}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appsJsonLd) }}
      />
      <AppsPageClient />
    </>
  );
}
