import Chip from '@/components/Chip/Chip';
import DataGrid from '@/components/DataGrid/DataGrid';
import { ReportListResponseDTO } from '@/core/reports/types/dtos';
import { Report } from '@/core/reports/types/models';
import { EnumDefaultStatus } from '@/shared/types/enums';
import * as Icon from '@mui/icons-material';
import { Button } from '@mui/material';
import { GridColDef, GridPaginationModel, GridSortModel } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { Dispatch } from 'react';

type Props = {
  list?: ReportListResponseDTO;
  pagination: GridPaginationModel;
  setPagination: Dispatch<React.SetStateAction<GridPaginationModel>>;
  loading: boolean;
  sort?: GridSortModel;
  setSort?: Dispatch<React.SetStateAction<GridSortModel | undefined>>;
};

export default function ReportTable({ list, pagination, setPagination, loading, sort, setSort }: Props) {
  const router = useRouter();

  const columns: GridColDef<Report>[] = [
    {
      field: 'id',
      headerName: 'Cód.',
      flex: 1,
    },
    {
      field: 'name',
      headerName: 'Nome',
      flex: 1,
    },
    {
      field: 'title',
      headerName: 'Título',
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
    {
      field: 'actions',
      headerName: '',
      renderCell: (params) => {
        return (
          <div className="flex flex-row gap-10 items-center justify-center p-2">
            <Button
              startIcon={<Icon.Edit />}
              color="primary"
              variant="text"
              onClick={() => router.push(`relatorios/editar/${params.row.id}`)}
            >
              Editar
            </Button>
            <Button
              startIcon={<Icon.OpenInNew />}
              color="primary"
              variant="contained"
              onClick={() => router.push(`relatorios/${params.row.key}`)}
            >
              Visualizar
            </Button>
          </div>
        );
      },
      sortable: false,
      minWidth: 350,
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
      sortingMode="server"
    />
  );
}
