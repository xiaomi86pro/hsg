import React from "react";

interface TableProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Table: React.FC<TableProps> = ({
  className = "",
  children,
  ...props
}) => {
  return (
    <div
      className={`w-full overflow-x-auto rounded-lg border border-gray-200 bg-white ${className}`}
      {...props}
    >
      <table className="w-full text-sm text-left text-gray-700">
        {children}
      </table>
    </div>
  );
};

export const TableHeader: React.FC<
  React.HTMLAttributes<HTMLTableSectionElement>
> = ({ className = "", ...props }) => {
  return (
    <thead
      className={`bg-gray-50 text-xs uppercase tracking-wide text-gray-500 ${className}`}
      {...props}
    />
  );
};

export const TableBody: React.FC<
  React.HTMLAttributes<HTMLTableSectionElement>
> = ({ className = "", ...props }) => {
  return <tbody className={className} {...props} />;
};

export const TableRow: React.FC<
  React.HTMLAttributes<HTMLTableRowElement>
> = ({ className = "", ...props }) => {
  return (
    <tr
      className={`border-b last:border-0 hover:bg-gray-50 ${className}`}
      {...props}
    />
  );
};

export const TableHead: React.FC<
  React.ThHTMLAttributes<HTMLTableCellElement>
> = ({ className = "", ...props }) => {
  return (
    <th
      className={`px-6 py-3 font-medium ${className}`}
      {...props}
    />
  );
};

export const TableCell: React.FC<
  React.TdHTMLAttributes<HTMLTableCellElement>
> = ({ className = "", ...props }) => {
  return (
    <td
      className={`px-6 py-4 align-middle ${className}`}
      {...props}
    />
  );
};

interface TableEmptyProps {
  colSpan: number;
  message?: string;
}

export const TableEmpty: React.FC<TableEmptyProps> = ({
  colSpan,
  message = "No data available.",
}) => {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="px-6 py-10 text-center text-sm text-gray-500"
      >
        {message}
      </td>
    </tr>
  );
};