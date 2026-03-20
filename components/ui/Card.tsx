import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <div
      className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className = "", ...props }) => {
  return (
    <div
      className={`flex items-center justify-between p-6 ${className}`}
      {...props}
    />
  );
};

export const CardTitle: React.FC<
  React.HTMLAttributes<HTMLHeadingElement>
> = ({ className = "", ...props }) => {
  return (
    <h3
      className={`text-lg font-semibold text-gray-900 ${className}`}
      {...props}
    />
  );
};

export const CardContent: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className = "", ...props }) => {
  return <div className={`p-6 pt-0 ${className}`} {...props} />;
};

export const CardFooter: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className = "", ...props }) => {
  return (
    <div
      className={`flex items-center p-6 pt-0 ${className}`}
      {...props}
    />
  );
};