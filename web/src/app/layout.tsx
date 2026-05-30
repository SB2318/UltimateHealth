import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip"

const interHeading = Inter({subsets:['latin'],variable:'--font-heading'});

const dmSans = DM_Sans({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ultimate Health - Empowering Wellness Through Global Community",
  description:
    "Ultimate Health is a platform that lets you publish health knowledge in your own language, review content, and share podcasts with the world.",
  keywords: "health, wellness, community, articles, podcasts, multilingual",
  openGraph: {
    title: "Ultimate Health",
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
    <html lang="en" className={cn("font-sans", dmSans.variable, interHeading.variable)}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </head>
      <body className={`${inter.className} antialiased`}><TooltipProvider>{children}</TooltipProvider></body>
    </html>
  );
}
