import React from "react";
import { agreementStyles as css } from "../styles";

export default function AgreementHeader() {
  return (
    <div style={css.header}>
      <div style={css.logo}>⚕️</div>
      <h1 style={css.h1}>Admin &amp; Moderator Agreement</h1>
      <p style={css.subtitle}>UltimateHealth Platform</p>
    </div>
  );
}
