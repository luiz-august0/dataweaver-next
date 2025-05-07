import Chip from '@/components/customized/Chip/Chip';
import { DataTable, SortableHeader } from '@/components/customized/DataTable/DataTable';
import { UserPageResponseDTO } from '@/core/users/types/dtos';
import { EnumUserRole } from '@/core/users/types/enums';
import { User } from '@/core/users/types/models';
import { PaginationRequestDTO } from '@/shared/types/dtos';
import { EnumDefaultStatus } from '@/shared/types/enums';
import { ColumnDef, SortingState } from '@tanstack/react-table';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  list?: UserPageResponseDTO;
  setPagination: Dispatch<SetStateAction<PaginationRequestDTO>>;
  loading: boolean;
  setUser: Dispatch<React.SetStateAction<User | undefined>>;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  sorting: SortingState;
  setSorting: Dispatch<SetStateAction<SortingState>>;
};

export default function UsersTable({ list, setPagination, loading, setUser, setOpen, sorting, setSorting }: Props) {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'id',
      header: ({ column }) => <SortableHeader column={column} header="Cód" />,
    },
    {
      accessorKey: 'login',
      header: ({ column }) => <SortableHeader column={column} header="Usuário" />,
    },
    {
      accessorKey: 'role',
      header: 'Tipo',
      cell: ({ row }) => {
        return <Chip enumParams={EnumUserRole[row.getValue('role') as keyof typeof EnumUserRole]} />;
      },
    },
    {
      accessorKey: 'active',
      header: 'Ativo',
      cell: ({ row }) => {
        return <Chip enumParams={EnumDefaultStatus[row.getValue('active') as keyof typeof EnumDefaultStatus]} />;
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={list?.content || []}
      pagination={list}
      setPagination={setPagination}
      loading={loading}
      onRowClick={(user) => {
        setUser(user);
        setOpen(true);
      }}
      sorting={sorting}
      onSortingChange={setSorting}
    />
  );
}
