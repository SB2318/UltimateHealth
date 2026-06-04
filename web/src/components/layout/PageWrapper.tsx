import React, { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
  as?: React.ElementType;
  style?: React.CSSProperties;
}

/**
 * PageWrapper component standardizes global container width, centering,
 * and responsive horizontal padding across the portal.
 *
 * @param children - Inner page content
 * @param className - Optional additional classes or overrides
 * @param as - HTML tag/component to render as (defaults to 'div')
 * @param style - Optional inline styles
 */
export default function PageWrapper({
  children,
  className = "",
  as: Component = "div",
  style,
}: PageWrapperProps) {
  return (
    <Component
      className={`container ${className}`}
      style={style}
    >
      {children}
    </Component>
  );
}
