import { handlerHttpError } from '@/helpers/toast';
import { httpInstance } from '@/lib/axios/httpInstance';
import { AsyncResponse } from '@/shared/types/models';
import { DefaultRequestParams } from '@/shared/types/props';
import { ReportListResponseDTO } from '../types/dtos';
import { Report } from '../types/models';

export async function getReportByKey({ key }: { key: string }) {
  try {
    const { data } = await httpInstance.get(`/report/key/${key}`);

    return data;
  } catch (error) {
    handlerHttpError(error);
  }
}

export async function getReportById({ id }: { id: number }): Promise<AsyncResponse<Report>> {
  try {
    const { data } = await httpInstance.get(`/report/${id}`);

    return data;
  } catch (error) {
    handlerHttpError(error);
  }
}

export async function getReportResult({
  id,
  paginationDTO,
  sort,
  filters,
}: { id: number; filters?: { [key: string]: any } } & DefaultRequestParams) {
  try {
    const { data } = await httpInstance.get(`/report/${id}/result`, {
      params: { ...paginationDTO, ...filters, sort },
    });

    return data;
  } catch (error) {
    handlerHttpError(error);
  }
}

export async function getReportTotalizers({ id, filters }: { id: number; filters?: { [key: string]: any } }) {
  try {
    const { data } = await httpInstance.get(`/report/${id}/totalizers`, {
      params: { ...filters },
    });

    return data;
  } catch (error) {
    handlerHttpError(error);
  }
}

export async function getReportList({
  paginationDTO,
  filterRequestDTO,
  sort,
}: DefaultRequestParams): Promise<AsyncResponse<ReportListResponseDTO>> {
  try {
    const { data } = await httpInstance.get('/report/filter/page', {
      params: { ...paginationDTO, ...filterRequestDTO, sort },
    });

    return data;
  } catch (error) {
    handlerHttpError(error);
  }
}

export async function mutateReport(report: Report): Promise<AsyncResponse<Report>> {
  try {
    const { data } = !report.id
      ? await httpInstance.post('/report', report)
      : await httpInstance.put(`/report/${report.id}`, report);

    return data;
  } catch (error) {
    handlerHttpError(error);
    throw error;
  }
}
