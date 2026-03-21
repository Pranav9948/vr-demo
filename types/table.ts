/**
 * Column configuration for responsive tables
 */
export interface ColumnConfig {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string; // e.g., "25%", "200px"
  render?: (value: any, row: any) => React.ReactNode;
  category?: string; // For grouping in mobile accordion
}

/**
 * Primary fields configuration for mobile display
 */
export interface PrimaryFieldsConfig {
  keys: string[];
  description?: (row: any) => React.ReactNode;
}

/**
 * Data row type
 */
export interface DataRow {
  id: string | number;
  [key: string]: any;
}

/**
 * Responsive table component props
 */
export interface ResponsiveTableProps<T extends DataRow> {
  columns: ColumnConfig[];
  data: T[];
  primaryFields?: PrimaryFieldsConfig;
  onRowClick?: (row: T) => void;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
}

/**
 * Table card component props (mobile)
 */
export interface TableCardProps<T extends DataRow> {
  row: T;
  columns: ColumnConfig[];
  primaryFields?: PrimaryFieldsConfig;
  onRowClick?: (row: T) => void;
}
