"use client";

import React from "react";

interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  error?: boolean;
}

export const Label: React.FC<LabelProps> = ({
  className = "",
  error = false,
  children,
  ...props
}) => {
  return (
    <label
      className={`text-sm font-medium ${
        error ? "text-red-600" : "text-gray-700"
      } ${className}`}
      {...props}
    >
      {children}
    </label>
  );
};