import { getReportList } from '@/core/reports/services/reports';
import { ReportListResponseDTO } from '@/core/reports/types/dtos';
import { FilterBuilder } from '@/shared/FilterBuilder';
import { debounce } from '@mui/material';
import { GridPaginationModel } from '@mui/x-data-grid';
import { useCallback, useEffect, useState } from 'react';

export default function useReportListQuery() {
  const [list, setList] = useState<ReportListResponseDTO>();
  const [pagination, setPagination] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>();

  const getList = async () => {
    setLoading(true);

    const filterBuilder = new FilterBuilder();

    if (query) {
      filterBuilder.like('title', query);
    }

    const data = await getReportList({
      paginationDTO: { page: pagination.page, size: pagination.pageSize },
      filterRequestDTO: filterBuilder.dto,
    });

    setList(data);
    setLoading(false);
  };

  const search = useCallback(debounce(setQuery, 500), []);

  useEffect(() => {
    getList();
  }, [pagination, query]);

  return {
    getList,
    list,
    pagination,
    setPagination,
    loading,
    search,
  };
}
