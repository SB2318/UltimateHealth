import type { Metadata } from 'next';
import { headers } from 'next/headers';
import OurContributorsClient from './OurContributorsClient';
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
  const canonical = getCanonicalUrl(locale, '/our-contributors');
  const alternates = getHreflangAlternates('/our-contributors');

  return {
    title: 'Open Source Contributors & Health Education Community',
    description:
      'Meet the global open-source developers, student researchers, and technical writers who build and maintain the UltimateHealth platform.',
    alternates: {
      canonical,
      languages: alternates,
    },
    openGraph: {
      title: `Open Source Contributors | ${BRAND_NAME}`,
      description:
        'Meet the developers, student researchers, and contributors maintaining UltimateHealth.',
      url: canonical,
      siteName: BRAND_NAME,
      locale: locale,
      type: 'website',
      images: [
        {
          url: `${FULL_SITE_URL}/icon1.png`,
          width: 512,
          height: 512,
          alt: `${BRAND_NAME} Contributors Directory`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Meet Our Contributors | ${BRAND_NAME}`,
      description:
        'Global open-source community building accessible, trustworthy health knowledge.',
      images: [`${FULL_SITE_URL}/icon1.png`],
    },
  };
}

export default async function OurContributorsPage({ params }: PageProps) {
  const { locale } = await params;
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  const breadcrumbsJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', url: getCanonicalUrl(locale) },
    { name: 'Our Contributors', url: getCanonicalUrl(locale, '/our-contributors') },
  ]);

  const contributorsPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'UltimateHealth Contributors Directory',
    description:
      'A directory of open-source software developers, students, and community reviewers contributing to UltimateHealth.',
    url: getCanonicalUrl(locale, '/our-contributors'),
    isPartOf: {
      '@type': 'WebSite',
      name: BRAND_NAME,
      url: `${FULL_SITE_URL}/${locale}`,
    },
    acknowledgment:
      'Inspired by the clinical dedication and patient dignity ethos of Dr. Moumita Debnath, Postgraduate Resident Doctor in Pulmonary & Chest Medicine.',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contributorsPageJsonLd) }}
      />
      <OurContributorsClient />
    </>
  );
}
