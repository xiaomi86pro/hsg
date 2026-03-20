"use client";

import React from "react";

type AlertVariant = "success" | "error" | "warning" | "info";

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
}

const variantStyles: Record<AlertVariant, string> = {
  success:
    "bg-green-50 border-green-200 text-green-800",
  error:
    "bg-red-50 border-red-200 text-red-800",
  warning:
    "bg-yellow-50 border-yellow-200 text-yellow-800",
  info:
    "bg-blue-50 border-blue-200 text-blue-800",
};

export const Alert: React.FC<AlertProps> = ({
  variant = "info",
  className = "",
  children,
  ...props
}) => {
  return (
    <div
      className={`w-full rounded-md border px-4 py-3 text-sm ${variantStyles[variant]} ${className}`}
      role="alert"
      {...props}
    >
      {children}
    </div>
  );
};