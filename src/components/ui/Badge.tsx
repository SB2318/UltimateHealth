import React from "react";

type BadgeVariant = "default" | "success" | "warning" | "error" | "info";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
}

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

const Badge = ({ label, variant = "default", size = "md", icon }: BadgeProps) => {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium transition-all duration-200 ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {label}
    </span>
  );
};

export default Badge;
