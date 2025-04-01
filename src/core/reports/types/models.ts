export interface Report {
  id?: number;
  name: string;
  title: string;
  key: string;
  active: boolean;
  columns: ReportColumn[];
  filters?: ReportFilter[];
  hasTotalizers: boolean;
}

export interface ReportColumn {
  id?: number;
  field: string;
  html: string;
  headerName: string;
  headerAlign: string;
  align: string;
  order: number;
}

export enum ReportFilterEnum {
  'DATE',
  'TEXT',
  'NUMBER',
  'BOOLEAN',
}

export interface ReportFilter {
  id?: number;
  label: string;
  parameter: string;
  type: keyof typeof ReportFilterEnum;
  standardValue: string;
  order: number;
}
