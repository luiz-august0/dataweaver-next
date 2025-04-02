export interface Report {
  id?: number;
  name: string;
  title: string;
  key: string;
  sql: string;
  sqlTotalizers?: string;
  active: boolean;
  columns?: ReportColumn[];
  filters?: ReportFilter[];
  hasTotalizers?: boolean;
}

export interface ReportColumn {
  id?: number;
  field: string;
  html: string;
  headerName: string;
  headerAlign: keyof typeof ReportColumnAlignEnum;
  align: keyof typeof ReportColumnAlignEnum;
  sort: number;
  format: keyof typeof ReportColumnFormatEnum;
}

export enum ReportColumnFormatEnum {
  'DEFAULT',
  'MONETARY',
  'PERCENTUAL',
  'DDMMYYYY',
  'DDMMYYYYHHMM',
}

export enum ReportColumnAlignEnum {
  'LEFT',
  'CENTER',
  'RIGHT',
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
  sql: string;
  type: keyof typeof ReportFilterEnum;
  standardValue?: string;
  sort: number;
}
