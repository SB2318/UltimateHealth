import type { Metadata } from "next";
import SiteHeader from "@/components/home/SiteHeader";
import { Footer } from "@/components/ui/footer";
import { fetchHealthResources } from "@/lib/health-resources";
import { HEALTH_RESOURCES_DISCLAIMER } from "@/lib/health-resources-helpers.mjs";
import {
  BRAND_NAME,
  FULL_SITE_URL,
  getCanonicalUrl,
  getHreflangAlternates,
  buildBreadcrumbJsonLd,
} from "@/lib/seo";
import HealthResourcesExplorer from "@/components/health-resources/HealthResourcesExplorer";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const canonical = getCanonicalUrl(locale, "/health-resources");
  const alternates = getHreflangAlternates("/health-resources");

  return {
    title: "Public Health Resources",
    description:
      "Browse government and verified public health resources — helplines, official guidance, and support services — curated by UltimateHealth.",
    alternates: {
      canonical,
      languages: alternates,
    },
    openGraph: {
      title: `Public Health Resources | ${BRAND_NAME} Blog`,
      description:
        "Government and verified public health resources: helplines, official guidance, and support services.",
      url: canonical,
      siteName: `${BRAND_NAME} Blog`,
      locale: locale,
      type: "website",
      images: [
        {
          url: `${FULL_SITE_URL}/icon1.png`,
          width: 512,
          height: 512,
          alt: `${BRAND_NAME} Public Health Resources`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Public Health Resources | ${BRAND_NAME} Blog`,
      description:
        "Government and verified public health resources: helplines, official guidance, and support services.",
      images: [`${FULL_SITE_URL}/icon1.png`],
    },
  };
}

export default async function HealthResourcesPage({ params }: PageProps) {
  const { locale } = await params;
  const resources = await fetchHealthResources();

  const breadcrumbsJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: getCanonicalUrl(locale) },
    { name: "Public Health Resources", url: getCanonicalUrl(locale, "/health-resources") },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <SiteHeader />
      <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
        <section className="border-b border-slate-200 bg-white px-4 pb-10 pt-28 text-center dark:border-slate-800 dark:bg-slate-900 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 inline-flex items-center rounded-full bg-teal-600/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-teal-700 dark:bg-teal-400/10 dark:text-teal-300">
              Public Health Resources
            </p>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Public Health Resources
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
              Government and verified public health resources — helplines,
              official guidance, and support services — in one place.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div
            role="note"
            aria-label="Disclaimer"
            className="mb-8 rounded-2xl border-l-4 border-teal-600 bg-teal-600/5 p-5 text-sm leading-relaxed text-slate-700 dark:border-teal-400 dark:bg-teal-400/5 dark:text-slate-300"
          >
            <strong className="mb-1 block font-bold text-slate-900 dark:text-white">
              Disclaimer
            </strong>
            {HEALTH_RESOURCES_DISCLAIMER}
          </div>

          <HealthResourcesExplorer resources={resources} locale={locale} />
        </section>

        <Footer />
      </main>
    </>
  );
}
