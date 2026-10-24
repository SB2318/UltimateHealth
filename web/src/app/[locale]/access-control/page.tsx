import type { Metadata } from 'next';
import { headers } from 'next/headers';
import AccessControlClient from './AccessControlClient';
import {
  BRAND_NAME,
  FULL_SITE_URL,
  getCanonicalUrl,
  getHreflangAlternates,
  buildBreadcrumbJsonLd,
  MEDICAL_DISCLAIMER_TEXT,
  BRAND_DISAMBIGUATION,
} from '@/lib/seo';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const canonical = getCanonicalUrl(locale, '/access-control');
  const alternates = getHreflangAlternates('/access-control');

  return {
    title: 'Role-Based Access Control (RBAC) & Privileges Specification',
    description:
      'Role-based access control and privileges specification for UltimateHealth. Details access boundaries, content ownership rules, and administrative guardrails.',
    alternates: {
      canonical,
      languages: alternates,
    },
    openGraph: {
      title: `Role-Based Access Control (RBAC) & Privileges Specification | ${BRAND_NAME}`,
      description:
        'Role-based access control and privileges specification for UltimateHealth. Details access boundaries, content ownership rules, and administrative guardrails.',
      url: canonical,
      siteName: BRAND_NAME,
      locale: locale,
      type: 'article',
      images: [
        {
          url: `${FULL_SITE_URL}/icon1.png`,
          width: 512,
          height: 512,
          alt: `${BRAND_NAME} Access Control Architecture`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Role-Based Access Control (RBAC) & Privileges Specification | ${BRAND_NAME}`,
      description:
        'Role-based access control and privileges specification for UltimateHealth. Details access boundaries, content ownership rules, and administrative guardrails.',
      images: [`${FULL_SITE_URL}/icon1.png`],
    },
  };
}

export default async function AccessControlPage({ params }: PageProps) {
  const { locale } = await params;
  const nonce = (await headers()).get('x-nonce') ?? undefined;

  const breadcrumbsJsonLd = buildBreadcrumbJsonLd([
    { name: 'Home', url: getCanonicalUrl(locale) },
    { name: 'Access Control Specification', url: getCanonicalUrl(locale, '/access-control') },
  ]);

  const governanceArticleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    name: 'UltimateHealth Role-Based Access Control (RBAC) & Privileges Specification',
    headline: 'Access Control Architecture, Role Permissions & Content Ownership Rules',
    description:
      'Role-based access control and privileges specification for UltimateHealth. Details access boundaries, content ownership rules, and administrative guardrails.',
    inLanguage: locale,
    url: getCanonicalUrl(locale, '/access-control'),
    datePublished: '2026-10-24T00:00:00.000Z',
    dateModified: '2026-10-24T00:00:00.000Z',
    author: {
      '@type': 'Organization',
      name: 'UltimateHealth Security & Editorial Governance',
      url: FULL_SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: BRAND_NAME,
      alternateName: 'UltimateHealth Blog',
      disambiguatingDescription: BRAND_DISAMBIGUATION,
      url: FULL_SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${FULL_SITE_URL}/icon1.png`,
      },
    },
    about: [
      { '@type': 'Thing', name: 'Role-Based Access Control' },
      { '@type': 'Thing', name: 'Content Ownership & Author Rights' },
      { '@type': 'Thing', name: 'Editorial Peer Review' },
      { '@type': 'Thing', name: 'Data Security & Privacy' },
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(governanceArticleJsonLd) }}
      />
      <AccessControlClient />
    </>
  );
}
