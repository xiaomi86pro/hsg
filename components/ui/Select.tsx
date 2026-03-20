"use client";

import React from "react";

interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: boolean;
}

const baseStyles =
  "flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const normalStyles =
  "border-gray-300 focus:border-blue-500 focus:ring-blue-500";

const errorStyles =
  "border-red-500 focus:border-red-500 focus:ring-red-500";

export const Select = React.forwardRef<
  HTMLSelectElement,
  SelectProps
>(({ className = "", error = false, children, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={`${baseStyles} ${
        error ? errorStyles : normalStyles
      } ${className}`}
      {...props}
    >
      {children}
    </select>
  );
});

Select.displayName = "Select";