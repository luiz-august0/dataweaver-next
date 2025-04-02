import { Report } from '@/core/reports/types/models';

export interface Dashboard {
  id?: number;
  name: string;
  title: string;
  reports?: DashboardReport[];
  links?: DashboardLink[];
}

export interface DashboardReport {
  id?: number;
  report: Report;
  sort: number;
}

export interface DashboardLink {
  id?: number;
  title: string;
  link: string;
  sort: number;
}
