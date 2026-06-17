import type { Metadata } from "next";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { withBasePath } from "@/lib/basePath";
import { articles } from "@/lib/article-data";
import type { Article } from "@/types/article";

export const metadata: Metadata = {
  title: "Health Articles | UltimateHealth",
  description:
    "Browse evidence-based health and wellness articles written by medical professionals on UltimateHealth.",
};

export default function ArticlesPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ── Header ── */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link
            href={withBasePath("/")}
            className="font-extrabold text-lg"
            style={{ background: "linear-gradient(135deg,#667eea,#764ba2)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            UltimateHealth
          </Link>
          <Link
            href={withBasePath("/medical-glossary")}
            className="text-sm font-semibold text-slate-600 hover:text-[#667eea] transition-colors"
          >
            Medical Glossary
          </Link>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="bg-gradient-to-br from-[#667eea] to-[#764ba2] py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-3">
            Health Knowledge Hub
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
            Health Articles
          </h1>
          <p className="text-lg text-white/85 max-w-xl mx-auto">
            Evidence-based articles written by medical professionals — covering
            cardiovascular health, nutrition, mental wellness, and more.
          </p>
        </div>
      </section>

      {/* ── Articles grid ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <p className="text-sm text-slate-500 mb-8">
          {articles.length} articles
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>

    
        {/* ── Footer ── */}
      <footer className="border-t border-gray-100 py-8 text-center">
        <Link
          href={withBasePath("/")}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#667eea] text-[#667eea] text-sm font-semibold hover:bg-[#667eea] hover:text-white transition-all duration-300"
        >
          ← Back to UltimateHealth
        </Link>
      </footer>
    </main>
  );
}

function ArticleCard({ article }: { article: Article }) {
  const date = format(parseISO(article.publishedAt), "MMM d, yyyy");

  return (
    <Link
      href={withBasePath(`/articles/${article.id}`)}
      className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
    >
      {/* Thumbnail / gradient */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-[#667eea]/20 to-[#764ba2]/30 flex items-center justify-center">
        <span className="text-5xl opacity-60" aria-hidden="true">
          {CATEGORY_ICONS[article.category] ?? "📋"}
        </span>
        <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-widest text-white bg-black/35 backdrop-blur-sm px-2.5 py-1 rounded-full">
          {article.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <h2 className="font-bold text-[#1a202c] leading-snug line-clamp-2 mb-2 group-hover:text-[#667eea] transition-colors text-base">
          {article.title}
        </h2>
        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed flex-1 mb-4">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-gray-50">
          <div className="flex items-center gap-2">
            <span
              className="w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-[10px]"
              style={{ background: article.author.avatarColor }}
            >
              {article.author.avatarInitials}
            </span>
            <span>{article.author.name}</span>
          </div>
          <div className="flex items-center gap-2">
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
