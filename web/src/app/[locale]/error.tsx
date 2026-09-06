"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { withBasePath } from "@/lib/basePath";
import { PageWrapper, Section } from "@/components/layout";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("ErrorPage");

  useEffect(() => {
    console.error("Runtime error:", error);
  }, [error]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50 to-purple-50 dark:from-[#0a0e27] dark:via-[#0f1435] dark:to-[#1a1a3e] text-slate-900 dark:text-slate-100 flex items-center justify-center px-4">
      <Section as="div" className="flex justify-center">
        <PageWrapper as="div" className="flex justify-center">
          <div className="bg-white/90 dark:bg-white/5 backdrop-blur-xl max-w-2xl w-full rounded-3xl shadow-2xl border border-slate-100 dark:border-white/10 text-center !px-16 !pt-12 !pb-14">
            <div className="flex justify-center mb-6">
              <Image
                src="/icon1.png"
                alt="UltimateHealth"
                width={64}
                height={64}
                className="rounded-2xl animate-bounce"
              />
            </div>

            <h1 className="text-4xl font-black text-slate-900 dark:text-slate-100 mb-4">
              {t("heading")}
            </h1>

            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">
              {t("title")}
            </h2>

            <p className="text-slate-500 dark:text-slate-400 leading-loose mb-10 text-base">
              {t("description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
              <button
                onClick={reset}
                className="text-sm font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:opacity-90 hover:scale-105 transition-all shadow-lg shadow-purple-500/30 !px-2 !py-[5px]"
              >
                {t("tryAgain")}
              </button>
              <Link
                href={withBasePath("/")}
                className="text-sm font-semibold text-[#667eea] dark:text-indigo-300 bg-white dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-full hover:bg-slate-50 dark:hover:bg-white/20 transition-colors !px-2 !py-[5px]"
              >
                {t("goHome")}
              </Link>
            </div>
          </div>
        </PageWrapper>
      </Section>
    </main>
  );
}
