import type { Metadata } from "next";
import { Inter, DM_Sans } from "next/font/google";
import "./globals2.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";

const interHeading = Inter({ subsets: ["latin"], variable: "--font-heading" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  title: "UltimateHealth - Empowering Wellness Through Global Community",
  description: "UltimateHealth platform description.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", dmSans.variable, inter.variable, interHeading.variable)}>
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
