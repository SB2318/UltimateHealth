"use client";

import React from "react";
import SiteHeader from "@/components/home/SiteHeader";

export const Navbar = (props: { tracking_id?: string[] }) => {
  return <SiteHeader tracking_id={props.tracking_id} />;
};
