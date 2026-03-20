import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  actions,
}) => {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-gray-600">
            {description}
          </p>
        )}
      </div>

      {actions && <div>{actions}</div>}
    </div>
  );
};