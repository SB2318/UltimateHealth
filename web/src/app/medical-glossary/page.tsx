import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { withBasePath } from "@/lib/basePath";
import { MedicalGlossaryExplorer } from "./MedicalGlossaryExplorer";

export const metadata: Metadata = {
  title: "Medical Glossary | UltimateHealth",
  description:
    "Browse and search clear medical terminology definitions from the UltimateHealth glossary.",
};

export default function MedicalGlossaryPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fafc_0%,#ecfdf5_55%,#f8fafc_100%)] text-slate-950 pt-20">
      <Navbar />

      <section className="mx-auto w-full max-w-6xl px-4 pb-8 pt-8 text-center sm:px-6 lg:px-8 lg:pt-14">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-emerald-700">
          Medical glossary
        </p>
        <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
          A clearer way to explore health terms
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
          Browse concise definitions, scan related concepts, and search by medical term,
          category, or keyword without opening an article first.
        </p>
      </section>

      <MedicalGlossaryExplorer />
    </main>
  );
}
