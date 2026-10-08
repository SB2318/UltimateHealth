import ViceHero from "@/components/home/ViceHero";
import ScrollToTop from "@/components/ScrollToTop";
import ContactSection from "@/components/home/ContactSection";
import DnaCursor from "@/components/home/DnaCursor";
import ProgramsSection from "@/components/home/ProgramsSection";
import ScreenshotGallery from "@/components/home/ScreenshotGallery";
import ScrollReveal from "@/components/home/ScrollReveal";
import SiteFooter from "@/components/home/SiteFooter";
import SiteHeader from "@/components/home/SiteHeader";
import PurposeSection from "@/components/home/PurposeSection";
import WhatWeDoSection from "@/components/home/WhatWeDoSection";
import ChainReactionStoryboard from "@/components/home/ChainReactionStoryboard";
import PortalSwitcherCTA from "@/components/home/PortalSwitcherCTA";

/**
 * Revamped Vice-Styled Creative Landing Page:
 * 1. Site Header & Nav
 * 2. Vice Hero (Cinematic Cyberpunk HUD, Orbitron Tagline, Start CTA, Live Stats)
 * 3. What Our Purpose Is (Respect Giver Manifesto & Core Pillars)
 * 4. What We Do (Knowledge Engine: Library, Glossary, AI Assistant, Doctor Suite)
 * 5. The Chain Reaction Storyboard (01 Discover -> 02 Engage -> 03 Contribute -> 04 Transform)
 * 6. Portal Dispatch Launchpads (Patient Hub, Doctor Suite, Open Squad)
 * 7. Screenshot Gallery & Showcase
 * 8. Open Source Programs & Hackathons
 * 9. Contact Section & Newsletter
 * 10. Site Footer
 * 11. Onboarding Tour Modal (2-Column Cyberpunk Modal)
 */
export default function Home() {
  return (
    <main className="bg-vice-dark min-h-screen text-white overflow-x-hidden selection:bg-vice-pink selection:text-white">
      <SiteHeader />
      <ViceHero />
      <PurposeSection />
      <WhatWeDoSection />
      <ChainReactionStoryboard />
      <PortalSwitcherCTA />
      <ScreenshotGallery />
      <ProgramsSection />
      <ContactSection />
      <SiteFooter />
      <ScrollToTop />
      <ScrollReveal />
      <DnaCursor />
    </main>
  );
}