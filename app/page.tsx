'use client';

import React, { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ResponsiveTable } from '@/components/responsive-table/responsive-table';
import { mockPolicies, type InsurancePolicy } from '@/data/mock-policies';
import type { ColumnConfig, PrimaryFieldsConfig } from '@/types/table';

const columns: ColumnConfig[] = [
  {
    key: 'code',
    label: 'Code',
    sortable: true,
    width: '100px',
  },
  {
    key: 'name',
    label: 'Name',
    sortable: true,
    width: '150px',
  },
  {
    key: 'designation',
    label: 'Designation',
    sortable: true,
    width: '150px',
  },
  {
    key: 'email',
    label: 'Email',
    sortable: true,
    width: '200px',
  },
  {
    key: 'address',
    label: 'Address',
    sortable: false,
    width: '200px',
  },
  {
    key: 'district',
    label: 'District',
    sortable: true,
    width: '120px',
  },
  {
    key: 'panNumber',
    label: 'PAN Number',
    sortable: true,
    width: '120px',
  },
  {
    key: 'aadharNumber',
    label: 'Aadhar Number',
    sortable: true,
    width: '150px',
  },
];

const primaryFields: PrimaryFieldsConfig = {
  keys: ['code', 'name', 'designation'],
  description: (row: InsurancePolicy) =>
    `${row.district} • ${row.email}`,
};

export default function DemoPage() {
  const [selectedRow, setSelectedRow] = useState<InsurancePolicy | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleRowClick = (row: InsurancePolicy) => {
    setSelectedRow(row);
  };

  // Filter data based on selected status
  const filteredData = useMemo(() => {
    if (statusFilter === 'all') return mockPolicies;
    return mockPolicies.filter((policy) => policy.status === statusFilter);
  }, [statusFilter]);

  const statusColorMap: Record<string, string> = {
    active: 'border-green-500',
    pending: 'border-yellow-500',
    inactive: 'border-gray-400',
    expired: 'border-red-500',
  };



  return (
    <div className="min-h-screen bg-background">

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* Table with Filters */}
        <div className="rounded-lg border border-border bg-card p-6">
          <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <h2 className="text-lg font-semibold text-foreground">
              Policy Details
            </h2>
            <div className="w-full sm:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Policies</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredData.length > 0 ? (
            <>
              <p className="mb-4 text-sm text-muted-foreground">
                Showing {filteredData.length} of {mockPolicies.length} policies
              </p>
              <ResponsiveTable<InsurancePolicy>
                columns={columns}
                data={filteredData}
                primaryFields={primaryFields}
                onRowClick={handleRowClick}
              />
            </>
          ) : (
            <div className="py-12 text-center">
              <p className="text-muted-foreground">
                No policies found with the selected status.
              </p>
            </div>
          )}
        </div>

        {/* Selected Row Details */}
        {selectedRow && (
          <div className="mt-8 rounded-lg border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Selected Policy Details
              </h2>
              <button
                onClick={() => setSelectedRow(null)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Close
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {columns.map((column) => (
                <div key={column.key} className="rounded bg-muted/50 p-3">
                  <p className="text-xs font-medium text-muted-foreground">
                    {column.label}
                  </p>
                  <p className="mt-1 font-semibold text-foreground">
                    {column.render
                      ? column.render(selectedRow[column.key as keyof InsurancePolicy], selectedRow)
                      : selectedRow[column.key as keyof InsurancePolicy]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
