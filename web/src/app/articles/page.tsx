import type { Metadata } from "next";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { withBasePath } from "@/lib/basePath";
import { articles } from "@/lib/article-data";
import type { Article } from "@/types/article";
// import Navbar from "@/components/layout/Navbar";

import { Navbar, PageWrapper, Section } from "@/components/layout";

export const metadata: Metadata = {
  title: "Health Articles | UltimateHealth",
  description:
    "Browse evidence-based health and wellness articles written by medical professionals on UltimateHealth.",
};

export default function ArticlesPage() {
  return (
    /* overflow-x-hidden on <main> prevents any child from causing horizontal scroll */
    <main className="min-h-screen bg-[#f8fafc] text-slate-900 overflow-x-hidden">
      <Navbar />

      {/* ── Hero ──
          pt-32 (128 px) clears the fixed navbar (~80 px) with comfortable breathing room.
          The section is a flex column so the three text nodes (eyebrow, h1, description)
          are guaranteed to stack vertically instead of collapsing into a single line. */}
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

      {/* ── Articles grid ──
          max-w-screen-xl caps the grid so it never exceeds the viewport on wide monitors.
          overflow-hidden on the inner wrapper prevents individual cards from escaping. */}
      <Section className="bg-white border-t border-slate-100">
        <div className="w-full max-w-screen-xl mx-auto px-4 md:px-8 lg:px-12 overflow-hidden">
          <div className="mb-10 flex items-center justify-between border-b border-slate-100 pb-5">
            <h2 className="text-2xl font-black text-slate-900 m-0 leading-none">
              All Articles
            </h2>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
              {articles.length} articles
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
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

function ArticleCard({ article }: { article: Article }) {
  const date = format(parseISO(article.publishedAt), "MMM d, yyyy");

  return (
    <Link
      href={withBasePath(`/articles/${article.id}`)}
      className="group flex flex-col bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 w-full"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-[#eef2ff] flex items-center justify-center">
        <span className="text-5xl transform group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
          {CATEGORY_ICONS[article.category] ?? "📋"}
        </span>
        <span className="absolute top-4 left-4 text-[9px] font-bold uppercase tracking-widest text-slate-500 bg-white/95 px-3 py-1.5 rounded-full border border-slate-100/60 shadow-sm">
          {article.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-6 md:p-8">
        <h2 className="font-extrabold text-[#3c3b88] leading-snug line-clamp-2 mb-3 group-hover:text-[#667eea] transition-colors text-xl">
          {article.title}
        </h2>
        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed flex-1 mb-5">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2.5">
            <span
              className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-[10px]"
              style={{ background: article.author.avatarColor }}
            >
              {article.author.avatarInitials}
            </span>
            <span className="font-semibold text-slate-600">{article.author.name}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400 font-medium">
            <time dateTime={article.publishedAt}>{date}</time>
            <span>·</span>
            <span>{article.readingTime}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

const CATEGORY_ICONS: Record<string, string> = {
  "Cardiovascular Health": "❤️",
  "Diabetes Management": "🩺",
  "Mental Health": "🧠",
  Nutrition: "🥗",
  "Sleep Health": "😴",
  Fitness: "🏃",
  Wellness: "✨",
};
