import type { Metadata } from 'next';
import { headers } from 'next/headers';
import PodcastsClient from './PodcastsClient';
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const canonical = getCanonicalUrl(locale, '/podcasts');
  const alternates = getHreflangAlternates('/podcasts');

  return {
    title: 'Health Podcasts & Audio Experiences',
    description:
      'Listen to insightful medical guides, wellness discussions, and health podcasts created by the UltimateHealth community.',
    alternates: {
      canonical,
      languages: alternates,
    },
    openGraph: {
      title: `Health Podcasts & Audio Experiences | ${BRAND_NAME}`,
      description:
        'Listen to health discussions, medical insights, and community podcasts.',
      url: canonical,
      siteName: BRAND_NAME,
      locale: locale,
      type: 'website',
      images: [
        {
          url: `${FULL_SITE_URL}/icon1.png`,
          width: 512,
          height: 512,
          alt: `${BRAND_NAME} Podcasts Hub`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Health Podcasts & Audio Experiences | ${BRAND_NAME}`,
      description: 'Community health podcasts and evidence-based audio guides.',
      images: [`${FULL_SITE_URL}/icon1.png`],
    },
  };
}

export default async function PodcastsPage({ params }: PageProps) {
  const { locale } = await params;
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  const breadcrumbsJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', url: getCanonicalUrl(locale) },
    { name: 'Podcasts', url: getCanonicalUrl(locale, '/podcasts') },
  ]);

  const podcastSeriesJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'PodcastSeries',
    name: 'UltimateHealth Community Podcasts',
    description:
      'Insightful medical discussions, wellness guides, and health conversations.',
    url: getCanonicalUrl(locale, '/podcasts'),
    inLanguage: locale,
    webFeed: `${FULL_SITE_URL}/${locale}/podcasts`,
    publisher: {
      '@type': 'Organization',
      name: BRAND_NAME,
      url: FULL_SITE_URL,
    },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(podcastSeriesJsonLd) }}
      />
      <PodcastsClient />
    </>
  );
}
