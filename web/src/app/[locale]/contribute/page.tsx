import type { Metadata } from 'next';
import { headers } from 'next/headers';
import ContributeClient from './ContributeClient';
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
  const canonical = getCanonicalUrl(locale, '/contribute');
  const alternates = getHreflangAlternates('/contribute');

  return {
    title: 'Contribute to Open Health Knowledge',
    description:
      'Join UltimateHealth as an open-source contributor. Write accessible health guides, review clinical articles, translate content, or contribute code on GitHub.',
    alternates: {
      canonical,
      languages: alternates,
    },
    openGraph: {
      title: `Contribute to Open Health Knowledge | ${BRAND_NAME}`,
      description:
        'Contribute code, clinical reviews, translations, or technical writing to UltimateHealth on GitHub.',
      url: canonical,
      siteName: BRAND_NAME,
      locale: locale,
      type: 'website',
      images: [
        {
          url: `${FULL_SITE_URL}/icon1.png`,
          width: 512,
          height: 512,
          alt: `${BRAND_NAME} Contribute Portal`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Contribute to Open Health Knowledge | ${BRAND_NAME}`,
      description:
        'Help make trustworthy health information accessible to everyone.',
      images: [`${FULL_SITE_URL}/icon1.png`],
    },
  };
}

export default async function ContributePage({ params }: PageProps) {
  const { locale } = await params;
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  const breadcrumbsJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', url: getCanonicalUrl(locale) },
    { name: 'Contribute', url: getCanonicalUrl(locale, '/contribute') },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        nonce={nonce}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <ContributeClient />
    </>
  );
}
