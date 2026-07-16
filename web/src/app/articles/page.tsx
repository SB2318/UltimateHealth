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
  let actualTotalPages = 1;
  
  try {
    const res = await fetch(`https://uhsocial.in/api/articles/?page=${page}&limit=${limit}`, {
      cache: 'no-store'
    });
    if (res.ok) {
      data = await res.json();
    }
    
    actualTotalPages = data.totalPages || 1;

    // Fallback for API bug where totalPages is missing on page > 1
    if (page > 1 && !data.totalPages) {
      const p1Res = await fetch(`https://uhsocial.in/api/articles/?page=1&limit=${limit}`, { cache: 'no-store' });
      if (p1Res.ok) {
        const p1Data = await p1Res.json();
        actualTotalPages = p1Data.totalPages || 1;
      }
    }
  } catch (error) {
    console.error("Failed to fetch articles:", error);
  }

  const articles = data.articles || (Array.isArray(data) ? data : []);
  const totalPages = actualTotalPages;
  const currentPage = page;

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 overflow-x-hidden">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#eef2ff] to-[#f8fafc] pt-36 pb-24 px-4 flex justify-center border-b border-slate-100">
        {/* Decorative background blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-60">
          <div className="absolute top-10 left-[10%] w-64 h-64 bg-indigo-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-40"></div>
          <div className="absolute top-10 right-[10%] w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-30"></div>
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-20"></div>
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center gap-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-indigo-100 shadow-sm backdrop-blur-md transition-transform hover:scale-105">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-indigo-700">
              Health Knowledge Hub
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
            Elevate Your <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#667eea] to-[#764ba2]">Health Literacy</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mt-2">
            Explore evidence-based articles crafted by leading medical professionals. 
            From cardiovascular wellness to mental resilience, discover insights that empower your life.
          </p>
        </div>
      </section>

      {/* ── Articles grid ── */}
      <Section className="bg-white border-t border-slate-100 flex justify-center">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12">
          <div className="mb-16 flex items-center justify-between border-b border-slate-200 pb-6">
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
            <div className="mt-32 pt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-2">
              {currentPage > 1 ? (
                <Link
                  href={withBasePath(`/articles?page=${currentPage - 1}`)}
                  className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-[#667eea] transition-colors"
                >
                  ← Previous
                </Link>
              ) : (
                <span className="px-5 py-2.5 text-sm font-semibold text-slate-400 bg-slate-50 border border-slate-100 rounded-lg cursor-not-allowed">
                  ← Previous
                </span>
              )}
              
              <div className="flex items-center justify-center gap-2 mx-4">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={withBasePath(`/articles?page=${p}`)}
                    className={`w-10 h-10 flex items-center justify-center text-sm font-bold rounded-lg transition-all ${
                      p === currentPage
                        ? "bg-[#667eea] text-white shadow-md scale-105"
                        : "text-slate-600 hover:bg-slate-100 hover:scale-105"
                    }`}
                  >
                    {p}
                  </Link>
                ))}
              </div>

              {currentPage < totalPages ? (
                <Link
                  href={withBasePath(`/articles?page=${currentPage + 1}`)}
                  className="px-5 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 hover:text-[#667eea] transition-colors"
                >
                  Next →
                </Link>
              ) : (
                <span className="px-5 py-2.5 text-sm font-semibold text-slate-400 bg-slate-50 border border-slate-100 rounded-lg cursor-not-allowed">
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
    ? (rawImg.startsWith("http") ? rawImg : withBasePath(`/api/proxy-image?url=${encodeURIComponent(`https://uhsocial.in/api/getFile/${rawImg}`)}`))
    : null;

  return (
    <a
      href={`https://uhsocial.in/api/share/blog/${article.pb_recordId}`}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1"
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
      <div className="flex flex-col flex-1 p-6 md:p-8 items-center text-center">
        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-5">
          {article.tags?.length > 0 ? (
            article.tags.map((tag) => (
              <span 
                key={tag._id} 
                className="inline-flex px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-[#667eea] bg-[#667eea]/10 rounded-full"
              >
                {tag.name}
              </span>
            ))
          ) : (
            <span className="inline-flex px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-slate-500 bg-slate-100 rounded-full">
              General
            </span>
          )}
        </div>

        <h2 className="font-extrabold text-[#1e293b] leading-snug tracking-wide line-clamp-2 mb-3 group-hover:text-[#667eea] transition-colors text-[17px] md:text-lg px-1">
          {article.title}
        </h2>
        
        <p className="text-[13px] md:text-sm text-slate-500 line-clamp-3 leading-[1.7] tracking-wide flex-1 mb-6 px-1">
          {article.description}
        </p>

        {/* Footer (Author & Meta) - Centered */}
        <div className="flex flex-col items-center justify-center pt-6 border-t border-slate-100 mt-auto w-full gap-3">
          <div className="flex items-center gap-3">
            {article.authorId?.Profile_image ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img 
                src={article.authorId.Profile_image} 
                alt={article.authorId.user_name || "Author"} 
                className="w-10 h-10 rounded-full object-cover shadow-sm"
              />
            ) : (
              <span className="w-10 h-10 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center text-white font-bold text-sm shadow-sm">
                {article.authorId?.user_name ? article.authorId.user_name.substring(0, 2).toUpperCase() : "U"}
              </span>
            )}
            <span className="font-bold text-[15px] text-slate-700">
              {article.authorId?.user_name || "Unknown Author"}
            </span>
          </div>
          
          <div className="flex items-center justify-center gap-3 text-xs text-slate-400 font-semibold tracking-wide">
            <time dateTime={article.publishedDate}>{date}</time>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              {article.viewCount || 0} views
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}
