"use client";

import React from "react";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const baseStyles =
  "flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const normalStyles =
  "border-gray-300 focus:border-blue-500 focus:ring-blue-500";

const errorStyles =
  "border-red-500 focus:border-red-500 focus:ring-red-500";

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", error = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`${baseStyles} ${
          error ? errorStyles : normalStyles
        } ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";