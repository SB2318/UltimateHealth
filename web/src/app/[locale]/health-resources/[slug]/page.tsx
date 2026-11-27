import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BadgeCheck, ExternalLink } from "lucide-react";
import SiteHeader from "@/components/home/SiteHeader";
import { Footer } from "@/components/ui/footer";
import { fetchHealthResourceBySlug } from "@/lib/health-resources";
import {
  HEALTH_RESOURCES_DISCLAIMER,
  SOURCE_TYPE_LABELS,
  buildExternalLinkProps,
} from "@/lib/health-resources-helpers.mjs";
import {
  BRAND_NAME,
  FULL_SITE_URL,
  getCanonicalUrl,
  getHreflangAlternates,
  getRobotsNoIndex,
  buildBreadcrumbJsonLd,
} from "@/lib/seo";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const resource = await fetchHealthResourceBySlug(slug);

  if (!resource) {
    return {
      title: "Resource Not Found",
      description: "The requested public health resource could not be found.",
      robots: getRobotsNoIndex(),
    };
  }

  const canonical = getCanonicalUrl(locale, `/health-resources/${slug}`);
  const alternates = getHreflangAlternates(`/health-resources/${slug}`);

  return {
    title: resource.title,
    description: resource.description || resource.title,
    alternates: {
      canonical,
      languages: alternates,
    },
    openGraph: {
      title: `${resource.title} | ${BRAND_NAME} Blog`,
      description: resource.description || resource.title,
      url: canonical,
      siteName: `${BRAND_NAME} Blog`,
      locale: locale,
      type: "website",
      images: [
        {
          url: `${FULL_SITE_URL}/icon1.png`,
          width: 512,
          height: 512,
          alt: resource.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${resource.title} | ${BRAND_NAME} Blog`,
      description: resource.description || resource.title,
      images: [`${FULL_SITE_URL}/icon1.png`],
    },
  };
}

export default async function HealthResourceDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;
  const resource = await fetchHealthResourceBySlug(slug);

  if (!resource) {
    notFound();
  }

  const externalProps = resource.officialUrl
    ? buildExternalLinkProps(resource.officialUrl)
    : null;
  const directoryUrl = `/${locale}/health-resources`;

  const breadcrumbsJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", url: getCanonicalUrl(locale) },
    { name: "Public Health Resources", url: getCanonicalUrl(locale, "/health-resources") },
    { name: resource.title, url: getCanonicalUrl(locale, `/health-resources/${slug}`) },
  ]);

  const details: Array<{ label: string; value: string }> = [];
  if (resource.provider) details.push({ label: "Provider", value: resource.provider });
  if (resource.category) details.push({ label: "Category", value: resource.category });
  if (resource.region) details.push({ label: "Region", value: resource.region });
  if (resource.resourceType) details.push({ label: "Type", value: resource.resourceType });
  if (resource.eligibility) details.push({ label: "Eligibility", value: resource.eligibility });
  if (resource.lastVerifiedAt) {
    details.push({ label: "Last verified", value: resource.lastVerifiedAt });
  }

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <SiteHeader />
      <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
        <section className="mx-auto max-w-3xl px-4 pb-16 pt-28 sm:px-6">
          <Link
            href={directoryUrl}
            aria-label="Back to all public health resources"
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 hover:text-teal-800 dark:text-teal-300 dark:hover:text-teal-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            All public health resources
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-teal-600/10 px-2.5 py-1 text-xs font-semibold text-teal-700 dark:bg-teal-400/10 dark:text-teal-300">
              {resource.category}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <BadgeCheck size={13} aria-hidden="true" />
              {SOURCE_TYPE_LABELS[resource.sourceType]}
            </span>
            {resource.freeAccess ? (
              <span className="inline-flex items-center rounded-full bg-emerald-600/10 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                Free access
              </span>
            ) : null}
          </div>

          <h1 className="mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            {resource.title}
          </h1>

          {resource.description ? (
            <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg">
              {resource.description}
            </p>
          ) : null}

          {details.length > 0 ? (
            <dl className="mt-8 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
              {details.map((detail) => (
                <div
                  key={detail.label}
                  className="flex flex-col gap-1 px-5 py-4 sm:flex-row sm:gap-4"
                >
                  <dt className="w-32 shrink-0 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {detail.label}
                  </dt>
                  <dd className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {detail.value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}

          {resource.tags.length > 0 ? (
            <ul
              aria-label="Tags"
              className="mt-6 flex flex-wrap gap-2"
            >
              {resource.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}

          {externalProps ? (
            <a
              {...externalProps}
              aria-label={`Visit official source for ${resource.title} (opens in a new tab, leaves UltimateHealth)`}
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:bg-teal-500 dark:hover:bg-teal-600"
            >
              Visit official source
              <ExternalLink size={16} aria-hidden="true" />
              <span className="sr-only">(opens in a new tab, leaves UltimateHealth)</span>
            </a>
          ) : null}

          <div
            role="note"
            aria-label="Disclaimer"
            className="mt-10 rounded-2xl border-l-4 border-teal-600 bg-teal-600/5 p-5 text-sm leading-relaxed text-slate-700 dark:border-teal-400 dark:bg-teal-400/5 dark:text-slate-300"
          >
            <strong className="mb-1 block font-bold text-slate-900 dark:text-white">
              Disclaimer
            </strong>
            {HEALTH_RESOURCES_DISCLAIMER}
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
