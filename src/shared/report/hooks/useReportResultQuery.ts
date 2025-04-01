import { getReportResult } from '@/core/reports/services/reports';
import { ReportResultDTO } from '@/core/reports/types/dtos';
import { convertSortModelToString } from '@/helpers/converters';
import { GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';

export default function useReportResultQuery(id?: number) {
  const [filters, setFilters] = useState<{ [key: string]: any }>([]);
  const [list, setList] = useState<ReportResultDTO>();
  const [pagination, setPagination] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [sort, setSort] = useState<GridSortModel>();

  const getList = async () => {
    if (!id) return;

    setLoading(true);

    const data = await getReportResult({
      id,
      paginationDTO: { page: pagination.page, size: pagination.pageSize },
      sort: sort && convertSortModelToString(sort),
      filters,
    });

    setList(data);
    setLoading(false);
  };

  useEffect(() => {
    getList();
  }, [pagination, id, sort, filters]);

  return {
    getList,
    list,
    pagination,
    setPagination,
    loading,
    sort,
    setSort,
    filters,
    setFilters,
  };
}
