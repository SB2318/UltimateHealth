import type { Metadata } from "next";
import Link from "next/link";
import { PageWrapper, Section } from "@/components/layout";

export const metadata: Metadata = {
  title: "Goodbye • Your Account Has Been Deleted | UltimateHealth",
  description: "Your UltimateHealth account has been successfully deleted.",
};

export default function GoodbyePage() {
  return (
    <Section as="div" style={styles.body}>
      <PageWrapper as="div" style={styles.card}>
        <div style={styles.smiley}>👋</div>
        <h2 style={styles.heading}>Your Account Has Been Deleted</h2>
        <p style={styles.text}>
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
