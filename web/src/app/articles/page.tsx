import type { Metadata } from "next";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { withBasePath } from "@/lib/basePath";
import type { ApiArticle, ApiArticlesResponse } from "@/types/api-article";

import { Navbar, PageWrapper, Section } from "@/components/layout";

export const metadata: Metadata = {
  title: "Health Articles | UltimateHealth",
  description:
    "Browse evidence-based health and wellness articles written by medical professionals on UltimateHealth.",
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ArticlesPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = typeof params.page === "string" ? parseInt(params.page, 10) : 1;
  const limit = 9;
  
  let data: ApiArticlesResponse = { articles: [], totalPages: 1, currentPage: 1 };
  
  try {
    const res = await fetch(`https://uhsocial.in/api/articles/?page=${page}&limit=${limit}`, {
      cache: 'no-store'
    });
    if (res.ok) {
      data = await res.json();
    }
  } catch (error) {
    console.error("Failed to fetch articles:", error);
  }

  const articles = data.articles || [];
  const totalPages = data.totalPages || 1;
  const currentPage = page;

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 overflow-x-hidden">
      <Navbar />

      {/* ── Hero ── */}
      <section className="w-full bg-[#f8fafc] pt-32 pb-14 px-4">
        <div className="flex flex-col items-center justify-center text-center gap-y-3 max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-widest text-[#667eea]">
            Health Knowledge Hub
          </p>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
            Health Articles
          </h1>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            Evidence-based articles written by medical professionals —
            covering cardiovascular health, nutrition, mental wellness, and more.
          </p>
        </div>
      </section>

      {/* ── Articles grid ── */}
      <Section className="bg-white border-t border-slate-100">
        <div className="w-full max-w-screen-xl mx-auto px-4 md:px-8 lg:px-12 overflow-hidden">
          <div className="mb-10 flex items-center justify-between border-b border-slate-100 pb-5">
            <h2 className="text-2xl font-black text-slate-900 m-0 leading-none">
              All Articles
            </h2>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              Page {currentPage} of {totalPages}
            </span>
          </div>

          {articles.length === 0 ? (
            <div className="py-20 text-center text-slate-500">
              No articles found.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {articles.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          )}

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div className="mt-16 flex items-center justify-center gap-2">
              {currentPage > 1 ? (
                <Link
                  href={withBasePath(`/articles?page=${currentPage - 1}`)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-[#667eea] transition-colors"
                >
                  ← Previous
                </Link>
              ) : (
                <span className="px-4 py-2 text-sm font-semibold text-slate-400 bg-slate-50 border border-slate-100 rounded-lg cursor-not-allowed">
                  ← Previous
                </span>
              )}
              
              <div className="flex items-center gap-1 mx-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={withBasePath(`/articles?page=${p}`)}
                    className={`w-9 h-9 flex items-center justify-center text-sm font-semibold rounded-lg transition-colors ${
                      p === currentPage
                        ? "bg-[#667eea] text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {p}
                  </Link>
                ))}
              </div>

              {currentPage < totalPages ? (
                <Link
                  href={withBasePath(`/articles?page=${currentPage + 1}`)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-[#667eea] transition-colors"
                >
                  Next →
                </Link>
              ) : (
                <span className="px-4 py-2 text-sm font-semibold text-slate-400 bg-slate-50 border border-slate-100 rounded-lg cursor-not-allowed">
                  Next →
                </span>
              )}
            </div>
          )}
        </div>
      </Section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-100 bg-[#f8fafc] py-8 text-center text-sm text-slate-400">
        <PageWrapper>
          <Link href={withBasePath("/")} className="hover:text-[#667eea] transition-colors font-semibold">
            ← Back to UltimateHealth
          </Link>
        </PageWrapper>
      </footer>
    </main>
  );
}

function ArticleCard({ article }: { article: ApiArticle }) {
  const date = article.publishedDate ? format(parseISO(article.publishedDate), "MMM d, yyyy") : "Unknown date";
  
  // Try to use a cover image if available, else fallback to a nice gradient
  const rawImg = article.imageUtils && article.imageUtils.length > 0 ? article.imageUtils[0] : null;
  const imageUrl = rawImg 
    ? (rawImg.startsWith("http") ? rawImg : `https://uhsocial.in/api/getFile/${rawImg}`)
    : null;

  return (
    <Link
      href={withBasePath(`/articles/${article.pb_recordId}`)}
      className="group flex flex-col bg-white rounded-[20px] border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 w-full"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] overflow-hidden bg-slate-100 flex items-center justify-center">
        {imageUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img 
            src={imageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#eef2ff] to-[#e0e7ff] flex items-center justify-center">
            <span className="text-4xl" aria-hidden="true">📋</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 md:p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {article.tags?.length > 0 ? (
            article.tags.map((tag) => (
              <span 
                key={tag._id} 
                className="inline-flex px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#667eea] bg-[#667eea]/10 rounded-md"
              >
                {tag.name}
              </span>
            ))
          ) : (
            <span className="inline-flex px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 rounded-md">
              General
            </span>
          )}
        </div>

        <h2 className="font-extrabold text-[#1e293b] leading-tight line-clamp-2 mb-3 group-hover:text-[#667eea] transition-colors text-lg md:text-xl">
          {article.title}
        </h2>
        
        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed flex-1 mb-5">
          {article.description}
        </p>

        {/* Footer (Author & Meta) */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
          <div className="flex items-center gap-2.5 min-w-0 mr-3">
            {article.authorId?.Profile_image ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img 
                src={article.authorId.Profile_image} 
                alt={article.authorId.user_name || "Author"} 
                className="w-8 h-8 rounded-full object-cover shadow-sm shrink-0"
              />
            ) : (
              <span className="w-8 h-8 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm">
                {article.authorId?.user_name ? article.authorId.user_name.substring(0, 2).toUpperCase() : "U"}
              </span>
            )}
            <span className="font-semibold text-sm text-slate-700 truncate">
              {article.authorId?.user_name || "Unknown Author"}
            </span>
          </div>
          
          <div className="flex flex-col items-end shrink-0 gap-1 text-[11px] text-slate-400 font-medium">
            <time dateTime={article.publishedDate}>{date}</time>
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {article.viewCount || 0} views
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
