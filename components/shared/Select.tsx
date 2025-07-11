import React, { SelectHTMLAttributes } from "react";

type SelectSize = "xs" | "sm" | "md" | "lg";
type SelectColor =
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "ghost";
type SelectVariant = "bordered" | "ghost";

interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  size?: SelectSize;
  color?: SelectColor;
  variant?: SelectVariant;
  options: { value: string; label: string; disabled?: boolean }[];
  placeholder?: string;
  fullWidth?: boolean;
}

const Select: React.FC<SelectProps> = ({
  size = "md",
  color = "primary",
  variant = "bordered",
  options,
  placeholder = "Select an option",
  fullWidth = false,
  className = "",
  value,
  onChange,
  ...props
}) => {
  // DaisyUI classes mapping
  const sizeClasses = {
    xs: "select-xs",
    sm: "select-sm",
    md: "select-md",
    lg: "select-lg",
  };

  const variantClasses = {
    bordered: "select-bordered",
    ghost: "select-ghost",
  };

  return (
    <select
      className={`select ${sizeClasses[size]} ${variantClasses[variant]} ${
        color !== "ghost" ? `select-${color}` : ""
      } ${fullWidth ? "w-full" : ""} ${className}`}
      // value={isControlled ? value : undefined}
      value={value}
      onChange={onChange}
      {...props}
    >
      <option disabled value="">
        {placeholder}
      </option>
      {options.map((option, index: number) => (
        <option key={index} value={option.value} disabled={option.disabled}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
