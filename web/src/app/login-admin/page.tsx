"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [msgColor, setMsgColor] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("Processing...");
    setMsgColor("#718096");
    setLoading(true);

    try {
      const res = await fetch("https://uhsocial.in/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password, fcmToken: "web-client-login" }),
      });

      const data = await res.json();

      if (res.ok) {
        setMsg("Login successful. Redirecting...");
        setMsgColor("green");
        if (data.accessToken) localStorage.setItem("accessToken", data.accessToken);
        if (data.refreshToken) localStorage.setItem("refreshToken", data.refreshToken);
        setTimeout(() => router.push("/delete-account-admin"), 1000);
      } else {
        setMsg(data.error || "Login failed");
        setMsgColor("red");
      }
    } catch (err: unknown) {
      setMsg("Server error: " + (err instanceof Error ? err.message : "Unknown error"));
      setMsgColor("red");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.body}>
      <div style={styles.container}>
        <Image
          src="https://raw.githubusercontent.com/SB2318/UltimateHealth/refs/heads/main/frontend/src/assets/images/adaptive-icon.png"
          style={styles.icon}
          width={55}
          height={55}
          alt="Ultimate Health Logo"
          priority
        />
        <h2 style={styles.heading}>Admin Login Required</h2>
        <p style={styles.subtext}>Please log in to continue to account deletion.</p>

        <form id="loginForm" onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email</label>
            <input
              id="email"
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = "#4da3ff")}
              onBlur={(e) => (e.target.style.borderColor = "#d9d9d9")}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              id="password"
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              onFocus={(e) => (e.target.style.borderColor = "#4da3ff")}
              onBlur={(e) => (e.target.style.borderColor = "#d9d9d9")}
            />
          </div>

          <button
            type="submit"
            id="login-btn"
            disabled={loading}
            style={{
              ...styles.loginBtn,
              background: loading ? "#a0aec0" : "#4d7cff",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {msg && (
          <div id="msg" style={{ marginTop: 15, fontSize: 14, color: msgColor }}>
            {msg}
          </div>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  body: {
    fontFamily: '"Inter", Arial, sans-serif',
    background: "#f4f7fc",
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  },
  container: {
    background: "#fff",
    width: 420,
    padding: "40px 30px",
    borderRadius: 20,
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
    textAlign: "center",
    maxWidth: "90vw",
  },
  icon: {
    marginBottom: 15,
    borderRadius: 12,
  },
  heading: {
    marginBottom: 15,
    fontWeight: 600,
    fontSize: "1.4rem",
    color: "#1a202c",
  },
  subtext: {
    color: "#555",
    fontSize: 14,
    marginBottom: 25,
  },
  inputGroup: {
    marginBottom: 18,
    textAlign: "left",
  },
  label: {
    fontSize: 14,
    fontWeight: 500,
    display: "block",
    marginBottom: 6,
    color: "#1a202c",
  },
  input: {
    width: "100%",
    padding: 12,
    border: "1px solid #d9d9d9",
    borderRadius: 10,
    fontSize: 15,
    outline: "none",
    transition: "border-color 0.2s ease",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  loginBtn: {
    width: "100%",
    color: "white",
    padding: 14,
    border: "none",
    borderRadius: 25,
    fontSize: 16,
    fontWeight: 600,
    marginTop: 10,
    transition: "background 0.2s ease",
    fontFamily: "inherit",
  },
};
