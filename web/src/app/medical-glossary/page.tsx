import type { Metadata } from "next";
import Link from "next/link";
import { withBasePath } from "@/lib/basePath";
import { MedicalGlossaryExplorer } from "./MedicalGlossaryExplorer";
import { Navbar, PageWrapper, Section } from "@/components/layout";

export const metadata: Metadata = {
  title: "Medical Glossary | UltimateHealth",
  description:
    "Browse and search clear medical terminology definitions from the UltimateHealth glossary.",
};

export default function MedicalGlossaryPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#ecfdf5_55%,#f8fafc_100%)] text-slate-950 pt-20">
      <Navbar />

      <section className="pt-32 pb-8 text-center">
        <PageWrapper className="flex flex-col items-center justify-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#667eea]">
            MEDICAL GLOSSARY
          </p>
          <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl text-center">
            A clearer way to explore health terms
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600 text-center">
            Browse concise definitions, scan related concepts, and search by medical term,
            category, or keyword without opening an article first.
          </p>
        </PageWrapper>
      </section>

      <div className="pb-20 bg-transparent">
        <div className="w-full px-4 md:px-8 lg:px-12">
          <MedicalGlossaryExplorer />
        </div>
      </div>
    </main>
  );
}
