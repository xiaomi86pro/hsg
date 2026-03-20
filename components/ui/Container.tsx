import React from "react";

interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const Container: React.FC<ContainerProps> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <div
      className={`mx-auto w-full max-w-6xl px-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};