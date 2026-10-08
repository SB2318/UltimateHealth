"use client";

import React from "react";
import SiteHeader from "@/components/home/SiteHeader";

interface NavbarProps {
  activeSection?: string;
  tracking_id?: string[];
}

export default function Navbar({ tracking_id }: NavbarProps) {
  return <SiteHeader tracking_id={tracking_id} />;
}
