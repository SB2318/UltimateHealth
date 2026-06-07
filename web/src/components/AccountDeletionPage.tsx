"use client";

import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageWrapper, Section } from "@/components/layout";

type AccountDeletionPageProps = {
  apiUrl: string;
  loginPath: string;
  title: string;
  description: string;
  confirmLabel: string;
};

type ApiErrorBody = {
  error?: string;
  message?: string;
};

const TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

export default function AccountDeletionPage({
  apiUrl,
  loginPath,
  title,
  description,
  confirmLabel,
}: AccountDeletionPageProps) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("#4a5568");

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);

    if (!storedToken) {
      router.replace(loginPath);
    }
  }, [loginPath, router]);

  const clearAuthData = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  };

  const readErrorMessage = async (response: Response) => {
    const fallback = "Unable to delete account. Please try again.";

    try {
      const contentType = response.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        const body = (await response.json()) as ApiErrorBody;
        return body.error || body.message || fallback;
      }

      const text = await response.text();
      return text || fallback;
    } catch {
      return fallback;
    }
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      router.replace(loginPath);
      return;
    }

    const confirmed = window.confirm(
      "This action permanently deletes your account. Do you want to continue?"
    );

    if (!confirmed) return;

    setDeleting(true);
    setMessage("Deleting your account...");
    setMessageColor("#4a5568");

    try {
      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          clearAuthData();
          router.replace(loginPath);
          return;
        }

        const errorMessage = await readErrorMessage(response);
        setMessage(errorMessage);
        setMessageColor("#e53e3e");
        return;
      }

      clearAuthData();
      setMessage("Account deleted successfully. Redirecting...");
      setMessageColor("#2f855a");
      router.replace("/goodbye");
    } catch (error: unknown) {
      setMessage(
        "Server error: " + (error instanceof Error ? error.message : "Unknown error")
      );
      setMessageColor("#e53e3e");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Section as="div" style={styles.body}>
      <PageWrapper as="div" style={styles.card}>
        <Image
          src="https://raw.githubusercontent.com/SB2318/UltimateHealth/refs/heads/main/frontend/src/assets/images/adaptive-icon.png"
          style={styles.icon}
          width={58}
          height={58}
          alt="Ultimate Health Logo"
          priority
        />
        <h1 style={styles.heading}>{title}</h1>
        <p style={styles.text}>{description}</p>
        <p style={styles.warning}>
          This action cannot be undone. Your saved authentication data will be cleared
          after a successful deletion.
        </p>

        <button
          type="button"
          onClick={handleDeleteAccount}
          disabled={deleting}
          style={{
            ...styles.deleteButton,
            background: deleting ? "#a0aec0" : "#e53e3e",
            cursor: deleting ? "not-allowed" : "pointer",
          }}
        >
          {deleting ? "Deleting..." : confirmLabel}
        </button>

        <Link href={loginPath} style={styles.cancelLink}>
          Cancel and go back
        </Link>

        {message && (
          <div role="status" style={{ ...styles.message, color: messageColor }}>
            {message}
          </div>
        )}
      </PageWrapper>
    </Section>
  );
}

const styles: Record<string, CSSProperties> = {
  body: {
    fontFamily: '"Inter", Arial, sans-serif',
    background: "#f4f7fc",
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  card: {
    background: "#fff",
    width: 440,
    padding: "40px 32px",
    borderRadius: 20,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    textAlign: "center",
    maxWidth: "90vw",
  },
  icon: {
    marginBottom: 16,
    borderRadius: 12,
  },
  heading: {
    marginBottom: 12,
    fontWeight: 700,
    fontSize: "1.5rem",
    color: "#1a202c",
  },
  text: {
    color: "#555",
    fontSize: 15,
    lineHeight: 1.6,
    marginBottom: 16,
  },
  warning: {
    color: "#742a2a",
    background: "#fff5f5",
    border: "1px solid #fed7d7",
    borderRadius: 10,
    fontSize: 14,
    lineHeight: 1.5,
    padding: 12,
    marginBottom: 22,
  },
  deleteButton: {
    width: "100%",
    color: "white",
    padding: 14,
    border: "none",
    borderRadius: 25,
    fontSize: 16,
    fontWeight: 700,
    transition: "background 0.2s ease",
    fontFamily: "inherit",
  },
  cancelLink: {
    display: "inline-block",
    marginTop: 16,
    color: "#4d7cff",
    fontSize: 14,
    fontWeight: 600,
    textDecoration: "none",
  },
  message: {
    marginTop: 16,
    fontSize: 14,
    lineHeight: 1.5,
  },
};
