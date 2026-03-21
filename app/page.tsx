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
    key: 'name',
    label: 'Name',
    width: '15%',
  },
  {
    key: 'email',
    label: 'Email',
    width: '20%',
  },
  {
    key: 'phone',
    label: 'Phone',
    width: '15%',
    category: 'Contact Information',
  },
  {
    key: 'address',
    label: 'Address',
    width: '20%',
    category: 'Location Details',
  },
  {
    key: 'district',
    label: 'District',
    width: '12%',
    category: 'Location Details',
  },
  {
    key: 'pan',
    label: 'PAN',
    width: '12%',
    category: 'Identification',
  },
  {
    key: 'aadhaar',
    label: 'Aadhaar',
    width: '12%',
    category: 'Identification',
  },
  {
    key: 'policyId',
    label: 'Policy ID',
    width: '15%',
    category: 'Policy Information',
  },
  {
    key: 'policyType',
    label: 'Policy Type',
    width: '15%',
    category: 'Policy Information',
  },
  {
    key: 'status',
    label: 'Status',
    width: '12%',
    category: 'Policy Information',
    render: (value) => {
      const statusStyles: Record<string, string> = {
        active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        inactive:
          'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200',
        expired: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
        pending:
          'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      };
      return (
        <Badge className={statusStyles[value] || statusStyles.inactive}>
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Badge>
      );
    },
  },
  {
    key: 'premium',
    label: 'Premium',
    width: '12%',
    category: 'Payment Information',
    render: (value) => `₹${value.toLocaleString()}`,
  },
  {
    key: 'startDate',
    label: 'Start Date',
    width: '12%',
    category: 'Dates',
    render: (value) => new Date(value).toLocaleDateString('en-IN'),
  },
  {
    key: 'expiryDate',
    label: 'Expiry Date',
    width: '12%',
    category: 'Dates',
    render: (value) => new Date(value).toLocaleDateString('en-IN'),
  },
  {
    key: 'claimStatus',
    label: 'Claim Status',
    width: '15%',
    category: 'Claim Information',
    render: (value) => {
      const statusColors: Record<string, string> = {
        'No Claims':
          'text-green-600 dark:text-green-400 font-medium',
        'Pending Approval':
          'text-yellow-600 dark:text-yellow-400 font-medium',
        'Claim Under Review':
          'text-blue-600 dark:text-blue-400 font-medium',
        'Claim Processed':
          'text-purple-600 dark:text-purple-400 font-medium',
        'Policy Lapsed':
          'text-red-600 dark:text-red-400 font-medium',
      };
      return (
        <span className={statusColors[value] || 'text-gray-600 dark:text-gray-400'}>
          {value}
        </span>
      );
    },
  },
];

const primaryFields: PrimaryFieldsConfig = {
  keys: ['name', 'email', 'district'],
  description: (row: InsurancePolicy) =>
    `${row.policyType} • ${row.policyId}`,
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
