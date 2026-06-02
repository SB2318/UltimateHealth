"use client";

import React from "react";
import HeroSection from "../../components/healthcare-heroes/HeroSection";

export default function HeroSectionClient() {
  const handleExplore = () => {
    document.getElementById("doctors")?.scrollIntoView({ behavior: "smooth" });
  };
  return <HeroSection onExploreClick={handleExplore} />;
}
