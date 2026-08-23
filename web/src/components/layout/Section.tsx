import React, { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: React.ElementType;
  style?: React.CSSProperties;
}

/**
 * Section component provides consistent vertical spacing and responsive padding
 * for layout sections across all pages.
 *
 * @param children - Section content
 * @param className - Optional additional classes
 * @param id - Anchor link identifier
 * @param as - HTML tag/component to render as (defaults to 'section')
 * @param style - Optional inline styles
 */
export default function Section({
  children,
  className = "",
  id,
  as: Component = "section",
  style,
}: SectionProps) {
  return (
    <Component
      id={id}
      className={`py-12 md:py-16 lg:py-24 ${className}`}
      style={style}
    >
      {children}
    </Component>
  );
}
