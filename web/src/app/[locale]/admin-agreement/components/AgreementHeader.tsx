import React from "react";
import { agreementStyles as css } from "../styles";
import { ModeToggle } from "@/components/mode-toggle";

export default function AgreementHeader() {
  return (
    <div style={{ ...css.header, position: "relative" }}>
      <div style={{ position: "absolute", top: 12, right: 12 }}>
        <ModeToggle />
      </div>
      <div style={css.logo}>⚕️</div>
      <h1 style={css.h1}>Admin &amp; Moderator Agreement</h1>
      <p style={css.subtitle}>UltimateHealth Platform</p>
    </div>
  );
}
