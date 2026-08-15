import HeroAndDownload from "@/components/HeroAndDownload";
import ScrollToTop from "@/components/ScrollToTop";
import ContactSection from "@/components/home/ContactSection";
import DnaCursor from "@/components/home/DnaCursor";
import FeaturesSection from "@/components/home/FeaturesSection";
import ModeratorFeatures from "@/components/home/ModeratorFeatures";
import ProgramsSection from "@/components/home/ProgramsSection";
import ScreenshotGallery from "@/components/home/ScreenshotGallery";
import ScrollReveal from "@/components/home/ScrollReveal";
import SiteFooter from "@/components/home/SiteFooter";
import SiteHeader from "@/components/home/SiteHeader";

/**
 * Landing page. This is a server component: the hero, feature grids, programs
 * and footer are rendered to HTML on the server and ship no JavaScript. Only the
 * genuinely interactive parts — header, screenshot gallery, the two forms and the
 * TestFlight dialog — are client islands, so hydration no longer has to walk the
 * whole page before the content becomes interactive.
 */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <HeroAndDownload />
      <ScreenshotGallery />
      <FeaturesSection />
      <ModeratorFeatures />
      <ProgramsSection />
      <ContactSection />
      <SiteFooter />
      <ScrollToTop />
      <ScrollReveal />
      <DnaCursor />
    </>
  );
}