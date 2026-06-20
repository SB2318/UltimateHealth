import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
// DO NOT remove the globals2.css import, it contains important global styles for the application
import "./globals2.css";
import "./globals.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { headers } from "next/headers";
import { ThemeProvider } from "@/components/theme-provider";

const interHeading = Inter({ subsets: ["latin"], variable: "--font-heading" });

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// force-dynamic ensures a unique CSP nonce is generated per request (not cached)
export const dynamic = "force-dynamic";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "UltimateHealth - Empowering Wellness Through Global Community",
  description:
    "UltimateHealth is a platform that lets you publish health knowledge in your own language, review content, and share podcasts with the world.",
  keywords: "health, wellness, community, articles, podcasts, multilingual",
  icons: {
    icon: [
      { url: `${BASE_PATH}/favicon.ico` },
      { url: `${BASE_PATH}/icon1.png`, type: "image/png" },
    ],
    apple: `${BASE_PATH}/apple-icon.png`,
  },
  openGraph: {
    title: "UltimateHealth",
    description: "Empowering Wellness Through Global Community",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Read the nonce injected by middleware so Next.js can use it for inline scripts
  const nonce = (await headers()).get("x-nonce") ?? undefined;

  return (
    <html
      lang="en"
      nonce={nonce}
      data-nonce={nonce}
      suppressHydrationWarning
      className={cn(
        "font-sans",
        dmSans.variable,
        inter.variable,
        interHeading.variable
      )}
    >
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
        
      </body>
    </html>
  );
}