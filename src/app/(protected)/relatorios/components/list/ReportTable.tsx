import Chip from '@/components/customized/Chip/Chip';
import { DataTable } from '@/components/customized/DataTable/DataTable';
import { Button } from '@/components/ui/button';
import { ReportListResponseDTO } from '@/core/reports/types/dtos';
import { Report } from '@/core/reports/types/models';
import { PaginationRequestDTO } from '@/shared/types/dtos';
import { EnumDefaultStatus } from '@/shared/types/enums';
import { ColumnDef, SortingState } from '@tanstack/react-table';
import { Edit, Link } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  list?: ReportListResponseDTO;
  setPagination: Dispatch<SetStateAction<PaginationRequestDTO>>;
  loading: boolean;
  sorting: SortingState;
  setSorting: Dispatch<SetStateAction<SortingState>>;
};

export default function ReportTable({ list, setPagination, loading, sorting, setSorting }: Props) {
  const router = useRouter();

  const columns: ColumnDef<Report>[] = [
    {
      accessorKey: 'id',
      header: 'Cód.',
    },
    {
      accessorKey: 'name',
      header: 'Nome',
    },
    {
      accessorKey: 'title',
      header: 'Título',
    },
    {
      accessorKey: 'active',
      header: 'Ativo',
      cell: ({ row }) => {
        return <Chip enumParams={EnumDefaultStatus[row.getValue('active') as keyof typeof EnumDefaultStatus]} />;
      },
    },
    {
      accessorKey: 'id',
      header: '',
      cell: ({ row }) => {
        return (
          <div className="flex flex-row gap-10 items-center justify-end p-2">
            <Button
              color="primary"
              variant="ghost"
              onClick={() => router.push(`relatorios/editar/${row.getValue('id')}`)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Editar
            </Button>
            <Button onClick={() => router.push(`relatorios/${row.original.key}`)}>
              <Link className="mr-2 h-4 w-4" />
              Visualizar
            </Button>
          </div>
        );
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
      sorting={sorting}
      onSortingChange={setSorting}
    />
  );
}
