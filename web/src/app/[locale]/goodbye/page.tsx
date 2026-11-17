import type { Metadata } from "next";
import Link from "next/link";
import { PageWrapper, Section } from "@/components/layout";
import { ModeToggle } from "@/components/mode-toggle";

export const metadata: Metadata = {
  title: "Goodbye • Your Account Has Been Deleted | UltimateHealth",
  description: "Your UltimateHealth account has been successfully deleted.",
};

export default function GoodbyePage() {
  return (
    <Section as="div" className="relative flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 transition-colors duration-300 dark:bg-[#0b1120]">
      <div className="absolute top-4 right-4 z-50">
        <ModeToggle />
      </div>
      <PageWrapper as="div" className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg transition-colors duration-300 dark:border-white/10 dark:bg-slate-900">
        <div style={styles.smiley}>👋</div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">Your Account Has Been Deleted</h2>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 mb-6">
          We&apos;re sorry to see you go. Thank you for being a part of our journey.
          If you ever decide to return, we&apos;ll be here to welcome you back.
        </p>
        <Link href="/login" style={styles.link}>
          Return to Home
        </Link>
      </PageWrapper>
    </Section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  body: {
    fontFamily: '"Segoe UI", Arial, sans-serif',
    background: "#f5f6fa",
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    color: "#333",
  },
  card: {
    background: "white",
    width: 380,
    padding: 30,
    borderRadius: 12,
    textAlign: "center",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    animation: "fadeIn 0.8s ease",
    maxWidth: "90vw",
  },
  smiley: {
    fontSize: 46,
    marginBottom: 14,
  },
  heading: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: 600,
  },
  text: {
    fontSize: 15,
    lineHeight: 1.5,
    marginBottom: 18,
    color: "#555",
  },
  link: {
    display: "inline-block",
    marginTop: 8,
    padding: "10px 16px",
    background: "#4c8bf5",
    color: "white",
    borderRadius: 8,
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 600,
    transition: "background 0.2s ease",
  },
};
