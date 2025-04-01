import Chip from '@/components/Chip/Chip';
import DataGrid from '@/components/DataGrid/DataGrid';
import { UserPageResponseDTO } from '@/core/users/types/dtos';
import { EnumUserRole } from '@/core/users/types/enums';
import { User } from '@/core/users/types/models';
import { EnumDefaultStatus } from '@/shared/types/enums';
import { GridColDef, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { Dispatch } from 'react';

type Props = {
  list?: UserPageResponseDTO;
  pagination: GridPaginationModel;
  setPagination: Dispatch<React.SetStateAction<GridPaginationModel>>;
  loading: boolean;
  sort?: GridSortModel;
  setSort?: Dispatch<React.SetStateAction<GridSortModel | undefined>>;
  setUser: Dispatch<React.SetStateAction<User | undefined>>;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
};

export default function UsersTable({
  list,
  pagination,
  setPagination,
  loading,
  sort,
  setSort,
  setUser,
  setOpen,
}: Props) {
  const columns: GridColDef<User>[] = [
    {
      field: 'id',
      headerName: 'Cód.',
      flex: 1,
    },
    {
      field: 'login',
      headerName: 'Usuário',
      flex: 1
    },
    {
      field: 'role',
      headerName: 'Tipo',
      renderCell(params) {
        return <Chip enumParams={EnumUserRole[params.value]} />;
      },
      flex: 1,
    },
    {
      field: 'active',
      headerName: 'Ativo',
      renderCell(params) {
        return <Chip enumParams={EnumDefaultStatus[params.value]} />;
      },
      flex: 1,
    },
  ];

  return (
    <DataGrid
      loading={loading}
      rows={list?.content ?? []}
      columns={columns}
      paginationModel={pagination}
      onPaginationModelChange={setPagination}
      rowCount={list?.totalElements ?? 0}
      pageSizeOptions={(list?.totalElements ?? 0) > 10 ? [10, 25, 50] : [list?.totalElements ?? 0]}
      sortModel={sort}
      onSortModelChange={setSort}
      onRowClick={(params) => {
        setUser(params.row);
        setOpen(true);
      }}
      sortingMode="server"
    />
  );
}
