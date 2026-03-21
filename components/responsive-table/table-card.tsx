'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import type { TableCardProps, DataRow, ColumnConfig, PrimaryFieldsConfig } from '@/types/table';

export function TableCard<T extends DataRow>({
  row,
  columns,
  primaryFields,
  onRowClick,
}: TableCardProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  // Get primary and secondary fields
  const primaryKeys = primaryFields?.keys || columns.slice(0, 3).map((c) => c.key);
  const secondaryKeys = columns
    .map((c) => c.key)
    .filter((k) => !primaryKeys.includes(k));

  // Group secondary fields by category
  const groupedSecondary: Record<string, ColumnConfig[]> = {};
  secondaryKeys.forEach((key) => {
    const column = columns.find((c) => c.key === key);
    if (column) {
      const category = column.category || 'Details';
      if (!groupedSecondary[category]) {
        groupedSecondary[category] = [];
      }
      groupedSecondary[category].push(column);
    }
  });

  const renderValue = (column: ColumnConfig, value: unknown, row?: T): React.ReactNode => {
    if (column.render) {
      // Pass row if available, otherwise pass undefined
      return column.render(value, row as T);
    }

    // Convert unknown to valid ReactNode
    if (value == null) return '—';
    if (typeof value === 'object') return JSON.stringify(value);
    return String(value);
  };

  const statusStyles: Record<string, string> = {
    active: 'border-l-4 border-green-500',
    pending: 'border-l-4 border-yellow-500',
    inactive: 'border-l-4 border-gray-400',
    expired: 'border-l-4 border-red-500',
  };

  const headerStyles: Record<string, string> = {
    active: 'bg-green-50 dark:bg-green-900/20',
    pending: 'bg-yellow-50 dark:bg-yellow-900/20',
    inactive: 'bg-gray-50 dark:bg-gray-800',
    expired: 'bg-red-50 dark:bg-red-900/20',
  };

  return (
    <Card
      className={cn(
        'w-full transition-all hover:shadow-md ',
        onRowClick && 'cursor-pointer',
        statusStyles[row.status] || 'border-l-2 border-border'
      )}
      onClick={() => onRowClick?.(row)}
    >
      <CardHeader className={cn(
        'pb-3',
        headerStyles[row.status]
      )}>
        {/* Primary Fields */}
        <div className="space-y-2">
          {primaryKeys.map((key) => {
            const column = columns.find((c) => c.key === key);
            if (!column) return null;
            const value = row[key];

            return (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  {column.label}
                </span>
                <span className="text-sm font-semibold text-foreground">
                  {renderValue(column, value)}
                </span>
              </div>
            );
          })}
        </div>

        {/* Custom Description */}
        {primaryFields?.description && (
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground">
              {primaryFields.description(row)}
            </p>
          </div>
        )}
      </CardHeader>

      {/* Expandable Section */}
      {secondaryKeys.length > 0 && (
        <CardContent className="pt-0">
          <Accordion type="single" collapsible className="w-full">
            {Object.entries(groupedSecondary).map(([category, categoryColumns]) => (
              <AccordionItem key={category} value={category} className="border-0">
                <AccordionTrigger className="py-2 hover:no-underline">
                  <span className="text-sm font-medium">{category}</span>
                </AccordionTrigger>
                <AccordionContent className="pb-0">
                  <div className="space-y-3 pt-3">
                    {categoryColumns.map((column) => {
                      const value = row[column.key];
                      return (
                        <div
                          key={column.key}
                          className="flex items-start justify-between gap-2"
                        >
                          <span className="text-sm font-medium text-muted-foreground">
                            {column.label}
                          </span>
                          <span className="text-right text-sm text-foreground">
                            {renderValue(column, value)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      )}
    </Card>
  );
}
