import type { Metadata } from 'next';
import { headers } from 'next/headers';
import MedicalGlossaryClient from './MedicalGlossaryClient';
import {
  BRAND_NAME,
  FULL_SITE_URL,
  getCanonicalUrl,
  getHreflangAlternates,
  buildBreadcrumbJsonLd,
  MEDICAL_DISCLAIMER_TEXT,
} from '@/lib/seo';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const canonical = getCanonicalUrl(locale, '/medical-glossary');
  const alternates = getHreflangAlternates('/medical-glossary');

  return {
    title: 'Medical Glossary & Health Terminology Dictionary',
    description:
      'Search 380+ verified, plain-language medical definitions across 18 clinical categories. Accessible health terms in English, Hindi, and Bengali.',
    alternates: {
      canonical,
      languages: alternates,
    },
    openGraph: {
      title: `Medical Glossary & Health Terminology Dictionary | ${BRAND_NAME}`,
      description:
        'Search verified, plain-language medical definitions across cardiovascular, respiratory, oncology, and neurology categories.',
      url: canonical,
      siteName: BRAND_NAME,
      locale: locale,
      type: 'website',
      images: [
        {
          url: `${FULL_SITE_URL}/icon1.png`,
          width: 512,
          height: 512,
          alt: `${BRAND_NAME} Medical Glossary`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Medical Glossary & Health Dictionary | ${BRAND_NAME}`,
      description:
        'Search verified plain-language medical terms and clinical definitions.',
      images: [`${FULL_SITE_URL}/icon1.png`],
    },
  };
}

export default async function MedicalGlossaryPage({ params }: PageProps) {
  const { locale } = await params;
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  const breadcrumbsJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', url: getCanonicalUrl(locale) },
    { name: 'Medical Glossary', url: getCanonicalUrl(locale, '/medical-glossary') },
  ]);

  const glossaryPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: 'UltimateHealth Medical Glossary & Terminology Dictionary',
    description:
      'Search 380+ verified, plain-language medical definitions across 18 clinical categories.',
    url: getCanonicalUrl(locale, '/medical-glossary'),
    inLanguage: locale,
    isPartOf: {
      '@type': 'WebSite',
      name: BRAND_NAME,
      url: `${FULL_SITE_URL}/${locale}`,
    },
    citation: MEDICAL_DISCLAIMER_TEXT,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(glossaryPageJsonLd) }}
      />
      <MedicalGlossaryClient />
    </>
  );
}
