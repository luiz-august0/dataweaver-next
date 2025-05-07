import { getReportResult } from '@/core/reports/services/reports';
import { ReportResultDTO } from '@/core/reports/types/dtos';
import { convertSortingToSortRequest } from '@/helpers/converters';
import { PaginationRequestDTO } from '@/shared/types/dtos';
import { SortingState } from '@tanstack/react-table';
import { useEffect, useState } from 'react';

export default function useReportResultQuery(id?: number) {
  const [filters, setFilters] = useState<{ [key: string]: any }>([]);
  const [list, setList] = useState<ReportResultDTO>();
  const [pagination, setPagination] = useState<PaginationRequestDTO>({
    page: 0,
    size: 10,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [sorting, setSorting] = useState<SortingState>([]);

  const getList = async () => {
    if (!id) return;

    setLoading(true);

    const data = await getReportResult({
      id,
      paginationDTO: pagination,
      sort: convertSortingToSortRequest(sorting),
      filters,
    });

    setList(data);
    setLoading(false);
  };

  useEffect(() => {
    getList();
  }, [pagination, id, sorting, filters]);

  return {
    getList,
    list,
    setPagination,
    loading,
    sorting,
    setSorting,
    filters,
    setFilters,
  };
}
