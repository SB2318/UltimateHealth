import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
// DO NOT remove the globals2.css import, it contains important global styles for the application
import "./globals2.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { headers } from "next/headers";

const interHeading = Inter({ subsets: ["latin"], variable: "--font-heading" });

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// force-dynamic ensures a unique CSP nonce is generated per request (not cached)
// Trade-off: this disables static optimization and caching for the layout,
// but is required because CSP nonces must be generated dynamically per request.
export const dynamic = "force-dynamic";

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
      className={cn(
        "font-sans",
        dmSans.variable,
        inter.variable,
        interHeading.variable
      )}
    >
      <body className={`${inter.className} antialiased`}>
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
