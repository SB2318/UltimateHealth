import type { Metadata } from 'next';
import { headers } from 'next/headers';
import HipaaClient from './HipaaClient';
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
  const canonical = getCanonicalUrl(locale, '/hipaa');
  const alternates = getHreflangAlternates('/hipaa');

  return {
    title: 'HIPAA Compliance & Notice of Privacy Practices',
    description:
      'Learn how UltimateHealth safeguards your Personal Health Logs and Care Team doctor interactions with HIPAA-compliant encryption, access controls, and patient rights.',
    alternates: {
      canonical,
      languages: alternates,
    },
    openGraph: {
      title: `HIPAA Compliance & Notice of Privacy Practices | ${BRAND_NAME}`,
      description:
        'Technical safeguards, Care Team privacy, and patient rights governing personal health logs and doctor interactions on UltimateHealth.',
      url: canonical,
      siteName: BRAND_NAME,
      locale: locale,
      type: 'website',
      images: [
        {
          url: `${FULL_SITE_URL}/icon1.png`,
          width: 512,
          height: 512,
          alt: `${BRAND_NAME} HIPAA Compliance`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `HIPAA Compliance & Notice of Privacy Practices | ${BRAND_NAME}`,
      description:
        'Safeguarding patient personal logs and Care Team clinician interactions under HIPAA security and privacy rules.',
      images: [`${FULL_SITE_URL}/icon1.png`],
    },
  };
}

export default async function HipaaPage({ params }: PageProps) {
  const { locale } = await params;
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  const breadcrumbs = [
    { name: 'Home', url: `${FULL_SITE_URL}/${locale}` },
    { name: 'HIPAA Compliance', url: `${FULL_SITE_URL}/${locale}/hipaa` },
  ];

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(breadcrumbs);

  return (
    <>
      <script
        type="application/ld+json"
        nonce={nonce}
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <HipaaClient />
    </>
  );
}
