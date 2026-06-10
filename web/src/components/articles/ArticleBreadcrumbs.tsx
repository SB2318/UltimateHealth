import Link from "next/link";
import { withBasePath } from "@/lib/basePath";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface ArticleBreadcrumbsProps {
  category: string;
  title: string;
  /** Optional direct link to category listing page */
  categoryHref?: string;
}

/**
 * Renders accessible breadcrumb navigation and a "Back to Articles" link.
 * Uses the existing Breadcrumb UI component system for consistency.
 *
 * Navigation path: Home > Articles > Category > Article Title
 */
export default function ArticleBreadcrumbs({
  category,
  title,
  categoryHref,
}: ArticleBreadcrumbsProps) {
  return (
    <nav aria-label="Page navigation" className="space-y-2">
      {/* Back link */}
      <Link
        href={withBasePath("/articles")}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-[#667eea] hover:text-[#5568d3] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#667eea] rounded"
      >
        <i className="fas fa-arrow-left text-xs" aria-hidden="true" />
        Back to Articles
      </Link>

      {/* Breadcrumb trail */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={withBasePath("/")}>Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={withBasePath("/articles")}>Articles</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={categoryHref ?? withBasePath("/articles")}>
                {category}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator />

          <BreadcrumbItem>
            <BreadcrumbPage
              className="max-w-[160px] sm:max-w-[260px] truncate"
              title={title}
            >
              {title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
}
