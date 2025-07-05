'use client';
import React, { Children, cloneElement, ReactElement, ReactNode } from "react";

interface TableProps {
  headers: (string | { label: string; className?: string })[];
  children: ReactElement<TableRowProps & {
    showCheckbox?: boolean;
    showActions?: boolean;
    actionLabel?: string;
    onActionClick?: (rowData: any) => void;
  }> | ReactElement<TableRowProps & {
    showCheckbox?: boolean;
    showActions?: boolean;
    actionLabel?: string;
    onActionClick?: (rowData: any) => void;
  }>[];
  showCheckbox?: boolean;
  showActions?: boolean;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  actionLabel?: ReactNode;
  onActionClick?: (rowData: any) => void;
}

interface TableRowProps {
  children: ReactNode;
  rowData?: any;
  className?: string;
}

interface TableCellProps {
  children: ReactNode;
  className?: string;
}

const Table: React.FC<TableProps> & {
  Row: React.FC<TableRowProps>;
  Cell: React.FC<TableCellProps>;
} = ({
  headers,
  children,
  showCheckbox = true,
  showActions = true,
  size = "md",
  className = "",
  actionLabel = "Details",
  onActionClick,
}) => {
  const sizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }[size];

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className={`table ${sizeClasses}`}>
        {/* Table Header */}
        <thead>
          <tr>
            {showCheckbox && (
              <th className="w-12">
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
            )}
            
            {headers.map((header, index) => (
              <th 
                key={index} 
                className={typeof header === "object" ? header.className : ""}
              >
                {typeof header === "object" ? header.label : header}
              </th>
            ))}
            
            {showActions && <th className="w-24">Actions</th>}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return cloneElement(child as ReactElement<any>, {
                showCheckbox,
                showActions,
                actionLabel,
                onActionClick,
              });
            }
            return child;
          })}
        </tbody>
      </table>
    </div>
  );
};

// Table Row Component
const TableRow: React.FC<TableRowProps & {
  showCheckbox?: boolean;
  showActions?: boolean;
  actionLabel?: string;
  onActionClick?: (rowData: any) => void;
}> = ({
  children,
  rowData,
  className = "",
  showCheckbox,
  showActions,
  actionLabel,
  onActionClick,
}) => {
  return (
    <tr className={`${className} hover`}>
      {showCheckbox && (
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
      )}
      
      {Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return child;
        }
        return <td>{child}</td>;
      })}
      
      {showActions && (
        <th>
          <button
            className="btn btn-ghost btn-sm btn-circle"
            onClick={() => onActionClick?.(rowData)}
          >
            {actionLabel}
          </button>
        </th>
      )}
    </tr>
  );
};

// Table Cell Component
const TableCell: React.FC<TableCellProps> = ({ children, className = "" }) => {
  return <td className={className}>{children}</td>;
};

// Attach subcomponents to Table
Table.Row = TableRow;
Table.Cell = TableCell;

export default Table;