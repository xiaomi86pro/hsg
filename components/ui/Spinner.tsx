import React from "react";

type SpinnerSize = "sm" | "md" | "lg";

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: SpinnerSize;
}

const sizeStyles: Record<SpinnerSize, string> = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-10 w-10 border-4",
};

export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  className = "",
  ...props
}) => {
  return (
    <div
      className={`animate-spin rounded-full border-gray-300 border-t-blue-600 ${sizeStyles[size]} ${className}`}
      {...props}
    />
  );
};