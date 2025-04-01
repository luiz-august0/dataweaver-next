import { PagedList } from '@/shared/types/models';
import { Report } from './models';

export type ReportResultDTO = PagedList<{ [key: string]: any }>;

export type ReportListResponseDTO = PagedList<Report>;