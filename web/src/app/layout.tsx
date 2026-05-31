import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UltimateHealth - Empowering Wellness Through Global Community",
  description:
    "UltimateHealth is a platform that lets you publish health knowledge in your own language, review content, and share podcasts with the world.",
  keywords: "health, wellness, community, articles, podcasts, multilingual",
  openGraph: {
    title: "UltimateHealth",
    description: "Empowering Wellness Through Global Community",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}