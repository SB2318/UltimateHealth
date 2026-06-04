import React from "react";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info";
type BadgeSize = "sm" | "md";

interface BadgeBaseProps {
  label?: string;
  children?: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  className?: string;
}

type BadgeSpanProps = BadgeBaseProps &
  Omit<React.ComponentPropsWithoutRef<"span">, keyof BadgeBaseProps> & {
    as?: "span";
  };

type BadgeButtonProps = BadgeBaseProps &
  Omit<React.ComponentPropsWithoutRef<"button">, keyof BadgeBaseProps | "type"> & {
    as: "button";
    type?: "button" | "submit" | "reset";
  };

type BadgeAnchorProps = BadgeBaseProps &
  Omit<React.ComponentPropsWithoutRef<"a">, keyof BadgeBaseProps> & {
    as: "a";
  };

type BadgeProps = BadgeSpanProps | BadgeButtonProps | BadgeAnchorProps;

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200",
  success: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400",
  warning: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400",
  error:   "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400",
  info:    "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400",
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: "px-2.5 py-0.5 text-xs",
  md: "px-3.5 py-1 text-sm",
};

const interactiveClasses =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-current disabled:cursor-not-allowed disabled:opacity-60";

const getBadgeClasses = (
  variant: BadgeVariant,
  size: BadgeSize,
  isInteractive: boolean,
  className = ""
) =>
  [
    "inline-flex items-center gap-1.5 rounded-full font-medium transition-all duration-200",
    variantClasses[variant],
    sizeClasses[size],
    isInteractive ? interactiveClasses : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

const renderBadgeContent = (
  icon: React.ReactNode,
  children: React.ReactNode,
  label?: string
) => {
  const content = children ?? label;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium transition-colors ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {content}
    </>
  );
};

const Badge = (props: BadgeProps) => {
  if (props.as === "button") {
    const {
      as: Component,
      label,
      children,
      variant = "default",
      size = "md",
      icon,
      className,
      type = "button",
      ...buttonProps
    } = props;

    return (
      <Component
        type={type}
        className={getBadgeClasses(variant, size, true, className)}
        {...buttonProps}
      >
        {renderBadgeContent(icon, children, label)}
      </Component>
    );
  }

  if (props.as === "a") {
    const {
      as: Component,
      label,
      children,
      variant = "default",
      size = "md",
      icon,
      className,
      ...anchorProps
    } = props;

    return (
      <Component
        className={getBadgeClasses(variant, size, true, className)}
        {...anchorProps}
      >
        {renderBadgeContent(icon, children, label)}
      </Component>
    );
  }

  const {
    as: Component = "span",
    label,
    children,
    variant = "default",
    size = "md",
    icon,
    className,
    ...spanProps
  } = props;

  return (
    <Component
      className={getBadgeClasses(variant, size, false, className)}
      {...spanProps}
    >
      {renderBadgeContent(icon, children, label)}
    </Component>
  );
};

export default Badge;
