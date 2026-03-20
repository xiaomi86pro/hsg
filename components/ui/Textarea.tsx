"use client";

import React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

const baseStyles =
  "flex w-full rounded-md border bg-white px-3 py-2 text-sm transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

const normalStyles =
  "border-gray-300 focus:border-blue-500 focus:ring-blue-500";

const errorStyles =
  "border-red-500 focus:border-red-500 focus:ring-red-500";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ className = "", error = false, rows = 4, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={`${baseStyles} ${
        error ? errorStyles : normalStyles
      } ${className}`}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";