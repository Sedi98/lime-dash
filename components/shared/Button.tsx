"use client";
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "accent" | "ghost" | "link" | "outline";
  shape?: "circle" | "square";
  loading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  responsive?: boolean;
  clickAction?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  size = "md",
  variant = "primary",
  shape,
  loading = false,
  startIcon,
  endIcon,
  responsive = false,
  className = "",

  ...props
}) => {
  // Size classes
  const sizeClasses = {
    xs: "btn-xs",
    sm: "btn-sm",
    md: "btn-md",
    lg: "btn-lg",
  };

  // Variant classes
  const variantClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    accent: "btn-accent",
    ghost: "btn-ghost",
    link: "btn-link",
    outline: "btn-outline",
  };

  // Shape classes
  const shapeClasses = {
    circle: "btn-circle",
    square: "btn-square",
  };

  return (
    <button
      className={`
                btn
                ${sizeClasses[size]} 
                ${variantClasses[variant]}
                ${shape ? shapeClasses[shape] : ""}
                ${loading ? " text-center mx-auto loading" : ""}
                ${responsive ? "btn-block" : ""}
                ${className}
            `}
      disabled={loading || props.disabled}
      type="button"
      {...props}
    >
      {startIcon && !loading && <span className="mr-2">{startIcon}</span>}
      {!loading && children}
      {endIcon && !loading && <span className="ml-2">{endIcon}</span>}
    </button>
  );
};

export default Button;
