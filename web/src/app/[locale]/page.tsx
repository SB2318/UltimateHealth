import type { Metadata } from "next";
import { headers } from "next/headers";
import ViceHero from "@/components/home/ViceHero";
import ScrollToTop from "@/components/ScrollToTop";
import ContactSection from "@/components/home/ContactSection";
import DnaCursor from "@/components/home/DnaCursor";
import ProgramsSection from "@/components/home/ProgramsSection";
import FaqSection from "@/components/home/FaqSection";
import ScreenshotGallery from "@/components/home/ScreenshotGallery";
import ScrollReveal from "@/components/home/ScrollReveal";
import SiteFooter from "@/components/home/SiteFooter";
import SiteHeader from "@/components/home/SiteHeader";
import PurposeSection from "@/components/home/PurposeSection";
import WhatWeDoSection from "@/components/home/WhatWeDoSection";
import PortalSwitcherCTA from "@/components/home/PortalSwitcherCTA";
import HomeArticlesPreview from "@/components/home/HomeArticlesPreview";
import {
  BRAND_NAME,
  BRAND_MOTTO,
  BRAND_MISSION,
  FULL_SITE_URL,
  getCanonicalUrl,
  getHreflangAlternates,
  buildHomeFaqJsonLd,
} from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const canonical = getCanonicalUrl(locale);
  const alternates = getHreflangAlternates();

  return {
    title: `${BRAND_NAME} Blog — ${BRAND_MOTTO}`,
    description: `${BRAND_NAME} (ultimatehealth.blog): Trustworthy, accessible health information. Evidence-based medical guides, interactive glossary, and 9 languages.`,
    alternates: {
      canonical,
      languages: alternates,
    },
    openGraph: {
      title: `${BRAND_NAME} Blog — ${BRAND_MOTTO}`,
      description: `${BRAND_NAME} (ultimatehealth.blog): ${BRAND_MISSION}`,
      url: canonical,
      siteName: `${BRAND_NAME} Blog`,
      locale: locale,
      type: "website",
      images: [
        {
          url: `${FULL_SITE_URL}/icon1.png`,
          width: 512,
          height: 512,
          alt: "UltimateHealth Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${BRAND_NAME} Blog — ${BRAND_MOTTO}`,
      description: `${BRAND_NAME} (ultimatehealth.blog): ${BRAND_MISSION}`,
      images: [`${FULL_SITE_URL}/icon1.png`],
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const homeFaqJsonLd = buildHomeFaqJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        nonce={nonce}
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqJsonLd) }}
      />
      <main className="bg-vice-dark min-h-screen text-[var(--vice-text,#0f172a)] dark:text-white overflow-x-hidden selection:bg-vice-pink selection:text-white">
        <SiteHeader />
        <ViceHero />
        <PurposeSection />
        <WhatWeDoSection />
        <HomeArticlesPreview />
        <PortalSwitcherCTA />
        <ScreenshotGallery />
        <ProgramsSection />
        <FaqSection />
        <ContactSection />
        <SiteFooter locale={locale} />
        <ScrollToTop />
        <ScrollReveal />
        <DnaCursor />
      </main>
    </>
  );
}
