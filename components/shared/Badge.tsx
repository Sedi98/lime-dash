import React, { ReactNode } from "react";

type BadgeSize = "xs" | "sm" | "md" | "lg" | "xl";
type BadgeColor =
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "neutral";
type BadgeVariant =
  | "solid"
  | "soft"
  | "outline"
  | "dash"
  | "ghost"
  | "empty"
  | "neutral";

interface BadgeProps {
  children: ReactNode;
  size?: BadgeSize;
  color?: BadgeColor;
  variant?: BadgeVariant;
  className?: string;
  isDot?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  size = "md",
  color = "primary",
  variant = "solid",
  className = "",
}) => {
  // Base classes
  const baseClasses = "badge font-semibold flex gap-0.5 items-center rounded";

  // Size classes
  const sizeClasses = {
    xs: "badge-xs",
    sm: "badge-sm",
    md: "badge-md",
    lg: "badge-lg",
    xl: "badge-xl",
  };

  const colorClasses = {
    primary: "badge-primary",
    secondary: "badge-secondary",
    accent: "badge-accent",
    info: "badge-info",
    success: "badge-success",
    warning: "badge-warning",
    error: "badge-error",
    neutral: "badge-neutral",
  };

  const textClasses = {
    primary: "text-primary-content",
    secondary: "text-secondary-content",
    accent: "text-accent-content",
    info: "text-info-content",
    success: "text-success-content",
    warning: "text-warning-content",
    error: "text-error-content",
    neutral: "text-neutral-content",
  };

  // Variant classes
  const getVariantClasses = () => {
    switch (variant) {
      case "soft":
        return `badge-soft ${colorClasses[color]} ${textClasses[color]}`;
      case "outline":
        return `badge-outline ${colorClasses[color]} ${textClasses[color]}`;
      case "dash":
        return `badge-dash border-dashed border-2 border-${color} ${textClasses[color]} bg-transparent `;
      case "ghost":
        return "badge-ghost";
      case "empty":
        return "bg-transparent border-none text-current";
      case "neutral":
        return "badge-neutral";
      default: // solid
        return `${colorClasses[color]} ${textClasses[color]}`;
    }
  };

  // Combine all classes
  const allClasses = `${baseClasses} ${
    sizeClasses[size]
  } ${getVariantClasses()} ${className}`;

  return <span className={allClasses}>{children}</span>;
};

export default Badge;
