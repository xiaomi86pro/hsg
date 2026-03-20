import React from "react";
import { Container } from "./Container";

interface PageWrapperProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const PageWrapper: React.FC<PageWrapperProps> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <Container>
      <div className={`py-8 ${className}`} {...props}>
        {children}
      </div>
    </Container>
  );
};