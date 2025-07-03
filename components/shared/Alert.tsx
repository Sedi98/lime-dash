import React, { ReactNode } from "react";

interface AlertProps {
  variant?: "solid" | "soft" | "outlined" | "dashed";
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "info"
    | "success"
    | "warning"
    | "error"
    | "neutral";

  description?: ReactNode;
  icon?: ReactNode;
  actions?: ReactNode;
  onClose?: () => void;
  className?: string;
  children?: ReactNode;
}

const Alert: React.FC<AlertProps> = ({
  variant = "solid",
  color = "info",

  description,
  icon,
  actions,
  onClose,
  className = "",
  children,
}) => {
  // Variant and color mapping
  const variantClasses = {
    solid: `alert-${color}`,
    soft: `alert-${color} alert-soft`,
    outlined: `alert-outline alert-${color}`,
    dashed: `alert-dash alert-${color} `,
  };

  // Base classes
  const baseClasses =
    "alert  flex flex-col text-base-content sm:flex-row sm:items-center p-2 rounded";

  // Combined classes
  const alertClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <div role="alert" className={alertClasses}>
      {/* Icon */}
      {icon && <div className="">{icon}</div>}

      {/* Content */}
      <div className="flex-1">
        {description && (
          <p className="">{description}</p>
        )}
        {children && <div className="mt-2">{children}</div>}
      </div>

      {/* Actions and Close */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-3 sm:mt-0 sm:ml-4">
        {actions && <div className="flex gap-2">{actions}</div>}
        {onClose && (
          <button
            onClick={onClose}
            className="btn btn-ghost btn-sm btn-circle border-0 text-current hover:bg-current/10"
            aria-label="Close alert"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
