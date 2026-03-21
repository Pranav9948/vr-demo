'use client';

import React, { useMemo } from 'react';
import { useMediaQuery } from '@/hooks/use-mobile';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Spinner } from '@/components/ui/spinner';
import { Empty } from '@/components/ui/empty';
import { TableCard } from './table-card';
import { cn } from '@/lib/utils';
import type { ResponsiveTableProps, DataRow, ColumnConfig } from '@/types/table';

/**
 * Responsive Table Component
 * Desktop: Standard HTML table with all columns
 * Mobile/Tablet: Card-based layout with expandable sections
 */
export function ResponsiveTable<T extends DataRow>({
  columns,
  data,
  primaryFields,
  onRowClick,
  loading = false,
  emptyMessage = 'No data available',
  className,
}: ResponsiveTableProps<T>) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  const renderValue = (column: ColumnConfig, value: unknown, row: T): React.ReactNode => {
    if (column.render) {
      return column.render(value, row) as React.ReactNode;
    }

    if (value == null) return '—';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Spinner />
      </div>
    );
  }

  if (data.length === 0) {
    return <Empty description={emptyMessage} />;
  }

  // Mobile: Card-based layout
  if (isMobile) {
    return (
      <div className={cn('space-y-3 w-full', className)}>
        {data.map((row) => (
          <TableCard
            key={row.id}
            row={row}
            columns={columns}
            primaryFields={primaryFields}
            onRowClick={onRowClick}
          />
        ))}
      </div>
    );
  }

  const rowStatusStyles: Record<string, string> = {
    active: 'border-l-4 border-green-500',
    pending: 'border-l-4 border-yellow-500',
    inactive: 'border-l-4 border-gray-400',
    expired: 'border-l-4 border-red-500',
  };


  // Desktop: Table layout
  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.key}
                className={cn(
                  'font-semibold',
                  column.width && `w-[${column.width}]`
                )}
              >
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              className={cn(
                'transition-colors hover:bg-muted/50',
                onRowClick && 'cursor-pointer'
              )}
              onClick={() => onRowClick?.(row)}
            >
              {columns.map((column) => (
                <TableCell key={`${row.id}-${column.key}`}>
                  {renderValue(column, row[column.key], row)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export { TableCard };
