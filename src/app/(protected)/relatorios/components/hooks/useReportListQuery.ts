import { getReportList } from '@/core/reports/services/reports';
import { ReportListResponseDTO } from '@/core/reports/types/dtos';
import { convertSortingToSortRequest } from '@/helpers/converters';
import { FilterBuilder } from '@/shared/FilterBuilder';
import { PaginationRequestDTO } from '@/shared/types/dtos';
import { SortingState } from '@tanstack/react-table';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';

export default function useReportListQuery() {
  const [list, setList] = useState<ReportListResponseDTO>();
  const [pagination, setPagination] = useState<PaginationRequestDTO>({
    page: 0,
    size: 10,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [query, setQuery] = useState<string>();
  const [sorting, setSorting] = useState<SortingState>([]);

  const getList = async () => {
    setLoading(true);

    const filterBuilder = new FilterBuilder();

    if (query) {
      filterBuilder.like('title', query);
    }

    const data = await getReportList({
      paginationDTO: pagination,
      filterRequestDTO: filterBuilder.dto,
      sort: sorting ? convertSortingToSortRequest(sorting) : 'id,desc',
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
    setPagination,
    loading,
    search,
    sorting,
    setSorting,
  };
}
