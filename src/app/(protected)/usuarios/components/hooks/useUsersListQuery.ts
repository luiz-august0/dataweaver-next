import { getUsersList } from '@/core/users/services/users';
import { UserPageResponseDTO } from '@/core/users/types/dtos';
import { convertSortingToSortRequest } from '@/helpers/converters';
import { FilterBuilder } from '@/shared/FilterBuilder';
import { PaginationRequestDTO } from '@/shared/types/dtos';
import { EnumDefaultStatus } from '@/shared/types/enums';
import { SortingState } from '@tanstack/react-table';
import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';

export default function useUsersListQuery() {
  const [list, setList] = useState<UserPageResponseDTO>();
  const [pagination, setPagination] = useState<PaginationRequestDTO>({
    page: 0,
    size: 10,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<keyof typeof EnumDefaultStatus>('all');
  const [query, setQuery] = useState<string>();
  const [sorting, setSorting] = useState<SortingState>([]);

  const getList = async () => {
    setLoading(true);

    const filterBuilder = new FilterBuilder();

    if (status !== 'all') {
      filterBuilder.equals('active', status == 'true');
    }

    if (query) {
      filterBuilder.like('login', query);
    }

    const data = await getUsersList({
      paginationDTO: pagination,
      filterRequestDTO: filterBuilder.dto,
      sort: convertSortingToSortRequest(sorting),
    });

    setList(data);
    setLoading(false);
  };

  const search = useCallback(debounce(setQuery, 500), []);

  useEffect(() => {
    getList();
  }, [pagination, status, query, sorting]);

  return {
    getList,
    list,
    setPagination,
    loading,
    status,
    setStatus,
    search,
    sorting,
    setSorting,
  };
}
