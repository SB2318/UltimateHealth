import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BadgeCheck, ExternalLink } from "lucide-react";
import type { HealthResource } from "@/types/health-resource";
import {
  SOURCE_TYPE_LABELS,
  buildExternalLinkProps,
} from "@/lib/health-resources-helpers.mjs";

interface HealthResourceCardProps {
  resource: HealthResource;
  locale?: string;
}

/**
 * Card for one public health resource. No fake data: every field comes
 * from the resource record, and optional fields render only when present.
 * Thumbnails use next/image with `unoptimized` because official sources
 * live on arbitrary government/NGO hosts outside next.config remotePatterns.
 */
export default function HealthResourceCard({
  resource,
  locale = "en",
}: HealthResourceCardProps) {
  const detailHref = `/${locale}/health-resources/${resource.slug}`;
  const externalProps = resource.officialUrl
    ? buildExternalLinkProps(resource.officialUrl)
    : null;

  return (
    <article
      aria-label={resource.title}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:shadow-none dark:hover:border-teal-500/40"
    >
      {resource.thumbnailUrl ? (
        <div className="relative h-44 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
          <Image
            src={resource.thumbnailUrl}
            alt={resource.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            unoptimized
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap items-center gap-2">
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

        <h3 className="text-lg font-bold leading-snug text-slate-900 dark:text-white">
          <Link
            href={detailHref}
            className="hover:text-teal-700 dark:hover:text-teal-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            {resource.title}
          </Link>
        </h3>

        {resource.description ? (
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
            {resource.description}
          </p>
        ) : null}

        <dl className="mt-auto flex flex-col gap-1 text-sm">
          {resource.provider ? (
            <div className="flex gap-2">
              <dt className="shrink-0 font-semibold text-slate-700 dark:text-slate-300">
                Provider:
              </dt>
              <dd className="text-slate-600 dark:text-slate-400">
                {resource.provider}
              </dd>
            </div>
          ) : null}
          {resource.region ? (
            <div className="flex gap-2">
              <dt className="shrink-0 font-semibold text-slate-700 dark:text-slate-300">
                Region:
              </dt>
              <dd className="text-slate-600 dark:text-slate-400">
                {resource.region}
              </dd>
            </div>
          ) : null}
          {resource.resourceType ? (
            <div className="flex gap-2">
              <dt className="shrink-0 font-semibold text-slate-700 dark:text-slate-300">
                Type:
              </dt>
              <dd className="text-slate-600 dark:text-slate-400">
                {resource.resourceType}
              </dd>
            </div>
          ) : null}
        </dl>

        {externalProps ? (
          <a
            {...externalProps}
            aria-label={`Visit official source for ${resource.title} (opens in a new tab, leaves UltimateHealth)`}
            className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-800 dark:text-teal-300 dark:hover:text-teal-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
          >
            Visit official source
            <ExternalLink size={14} aria-hidden="true" />
            <span className="sr-only">(opens in a new tab, leaves UltimateHealth)</span>
          </a>
        ) : null}

        <Link
          href={detailHref}
          aria-label={`View details for ${resource.title}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-teal-700 dark:text-slate-300 dark:hover:text-teal-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
        >
          View details
          <ArrowUpRight size={15} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
