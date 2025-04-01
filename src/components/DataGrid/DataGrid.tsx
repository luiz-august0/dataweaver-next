import { Search } from '@mui/icons-material';
import { Box, Skeleton, SxProps, Theme, Typography, useTheme } from '@mui/material';
import { DataGridProps, GridColDef, DataGrid as MUIDataGrid } from '@mui/x-data-grid';
import { ptBRDataGrid } from './ptBRLocale';

type Props = {
  loading?: boolean;
  clientPagination?: boolean;
  rows: any[];
  columns: GridColDef<any>[];
  sx?: SxProps<Theme>;
  paginationLess?: boolean;
} & DataGridProps;

function NoRowsOverlay() {
  const { palette } = useTheme();

  return (
    <div className="flex flex-col gap-2 justify-center items-center h-full">
      <Search fontSize="large" color="disabled" />
      <Typography sx={{ fontSize: '1rem !important', color: palette.grey[900] }}>Nenhum registro encontrado</Typography>
    </div>
  );
}

export default function DataGrid({
  onRowClick,
  loading,
  clientPagination,
  rows,
  columns,
  sx,
  paginationLess,
  ...rest
}: Props) {
  const { palette } = useTheme();

  return (
    <Box sx={{ width: '100%' }}>
      {loading ? (
        <Skeleton variant="rounded" sx={{ height: '350px' }} animation="wave" />
      ) : (
        <MUIDataGrid
          {...rest}
          sx={{
            '& .MuiDataGrid-columnHeader': {
              border: 'none',
              backgroundColor: palette.grey[50],
              fontSize: '1rem !important',
              color: palette.grey[600],
            },
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: palette.grey[50],
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-virtualScrollerContent': {
              overflowX: 'auto',
              overflowY: 'hidden',
              backgroundColor: 'white',
            },
            '& .MuiDataGrid-virtualScrollerRenderZone': {
              width: '100%',
              position: 'unset',
            },
            '& 	.MuiDataGrid-columnHeader:focus-within': {
              outline: 'none !important',
            },
            '& .MuiDataGrid-cell:focus-within': {
              outline: 'none !important',
            },
            '& .MuiDataGrid-cell': {
              fontSize: '1rem !important',
              color: palette.grey[900],
            },
            '& .MuiDataGrid-row': {
              cursor: onRowClick ? 'pointer' : 'default',
              '&:first-child': {
                borderTop: 'none',
              },
            },
            '& .MuiDataGrid-footerContainer': {
              backgroundColor: 'white',
              justifyContent: { xs: 'revert', md: 'space-between' },
              '& .MuiTablePagination-root': {
                position: { xs: 'sticky', sm: 'unset' },
                left: { xs: 0, sm: 'unset' },
              },
            },
            boxShadow: '0px 4px 8px rgba(16, 24, 40, 0.12), 0px 2px 4px rgba(16, 24, 40, 0.08)',
            ...sx,
          }}
          rows={rows}
          columns={columns}
          paginationMode={clientPagination ? 'client' : 'server'}
          slots={{
            noRowsOverlay: NoRowsOverlay,
          }}
          disableRowSelectionOnClick
          disableColumnFilter
          disableColumnMenu
          autoHeight
          onRowClick={onRowClick}
          hideFooter={paginationLess}
          localeText={ptBRDataGrid.components?.MuiDataGrid.defaultProps.localeText}
        />
      )}
    </Box>
  );
}
