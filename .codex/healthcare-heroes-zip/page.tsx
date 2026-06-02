import React, { useRef } from "react";
import HeroSection from "../../components/healthcare-heroes/HeroSection";
import FeaturedDoctors from "../../components/healthcare-heroes/FeaturedDoctors";
import TimelineSection from "../../components/healthcare-heroes/TimelineSection";
import QuoteSection from "../../components/healthcare-heroes/QuoteSection";
import FutureVisionSection from "../../components/healthcare-heroes/FutureVisionSection";
import ContributionSection from "../../components/healthcare-heroes/ContributionSection";

export const metadata = {
  title: "Healthcare Heroes of India | UltimateHealth",
  description:
    "Honoring doctors and healthcare contributors whose work transformed lives, improved accessibility, and strengthened medical awareness across India.",
};

export default function HealthcareHeroesPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <HeroSectionWrapper />
      <FeaturedDoctors />
      <TimelineSection />
      <QuoteSection />
      <FutureVisionSection />
      <ContributionSection />
    </main>
  );
}

// Client wrapper to handle the scroll-to-doctors CTA
// Separated because page.tsx itself must be a Server Component for metadata export
import HeroSectionClient from "./HeroSectionClient";
function HeroSectionWrapper() {
  return <HeroSectionClient />;
}
