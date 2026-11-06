import type { Metadata } from "next";
import SiteHeader from "@/components/home/SiteHeader";
import { Footer } from "@/components/ui/footer";
import TributeHubClient from "@/components/tribute/TributeHubClient";
import {
  BRAND_NAME,
  getCanonicalUrl,
  getHreflangAlternates,
  buildBreadcrumbJsonLd,
} from "@/lib/seo";
import { TRIBUTE_PROFILES } from "@/data/tribute-profiles";

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const canonical = getCanonicalUrl(locale, "/tribute");
  const alternates = getHreflangAlternates("/tribute");

  return {
    title: `Lives Beyond the Headlines: 30 Profiles Tribute & Living Memorial Series | ${BRAND_NAME}`,
    description:
      "An international human-stories tribute celebrating 30 lives for their contributions, courage, and lost possibilities — starting with Dr. Moumita Debnath — alongside our 30 living memorial clinical and community guides.",
    alternates: {
      canonical,
      languages: alternates,
    },
    openGraph: {
      title: `Lives Beyond the Headlines — 30 Human Stories Tribute | ${BRAND_NAME}`,
      description:
        "A person's life must be remembered for what they contributed to the world, not only for the tragedy that ended or changed their life.",
      url: canonical,
      siteName: `${BRAND_NAME} Editorial`,
      locale: locale,
      type: "website",
      images: [
        {
          url: "https://images.openai.com/static-rsc-4/ERFLGiok6oasJHEMp3Yp6o2VKqafsUj-FPQeEYQVBikv-WsOwE5pXE1bqNI-Fby_VmCS1XVDvEn5a1eEekUaerVa1EbGz6xCVfRcsQzaWS2tFSFoLV4bcUYetNcVkenLUbjb87nn3XEwl6ctIPIKzEBKwhlZu-B7ll228b_kQ_I?purpose=inline",
          width: 1200,
          height: 630,
          alt: "Lives Beyond the Headlines - UltimateHealth Tribute",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Lives Beyond the Headlines | ${BRAND_NAME} Tribute`,
      description:
        "Remembering 30 lives for their contributions, courage, and lost possibilities. What society must learn and build.",
      images: [
        "https://images.openai.com/static-rsc-4/ERFLGiok6oasJHEMp3Yp6o2VKqafsUj-FPQeEYQVBikv-WsOwE5pXE1bqNI-Fby_VmCS1XVDvEn5a1eEekUaerVa1EbGz6xCVfRcsQzaWS2tFSFoLV4bcUYetNcVkenLUbjb87nn3XEwl6ctIPIKzEBKwhlZu-B7ll228b_kQ_I?purpose=inline",
      ],
    },
  };
}

export default async function TributePage({ params }: PageProps) {
  const { locale } = await params;

  const breadcrumbsJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: getCanonicalUrl(locale) },
    { name: "Lives Beyond the Headlines Tribute", url: getCanonicalUrl(locale, "/tribute") },
  ]);

  const tributeJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Lives Beyond the Headlines: 30 Profiles Tribute",
    description:
      "An international human-stories tribute celebrating 30 individuals for their contributions, courage, and what society can learn, starting with Dr. Moumita Debnath.",
    url: getCanonicalUrl(locale, "/tribute"),
    about: {
      "@type": "Thing",
      name: "Human Rights, Medical Safety and Social Dignity",
    },
    hasPart: TRIBUTE_PROFILES.map((p) => ({
      "@type": "CreativeWork",
      name: `${p.name} - Profile & Living Memorial`,
      headline: p.memorialPublication.title,
      description: p.contributions,
      author: {
        "@type": "Person",
        name: p.name,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tributeJsonLd) }}
      />

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          background: "var(--explorer-bg, #f8fafc)",
          color: "var(--explorer-text-primary, #0f172a)",
          overflowX: "hidden",
          width: "100%",
        }}
      >
        <SiteHeader />
        <main
          style={{
            flex: 1,
            width: "100%",
            paddingTop: "90px", // Exact clearance for fixed header
            boxSizing: "border-box",
          }}
        >
          <TributeHubClient />
        </main>
        <Footer />
      </div>
    </>
  );
}
