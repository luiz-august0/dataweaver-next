import DataGrid from '@/components/DataGrid/DataGrid';
import { CircularProgress, Typography } from '@mui/material';
import { GridAlignment, GridColDef } from '@mui/x-data-grid';
import { ReportFilters } from './components/ReportFilters';
import { ReportTotalizers } from './components/ReportTotalizers';
import { useReport } from './hooks/useReport';
import useReportResultQuery from './hooks/useReportResultQuery';
import useReportTotalizersQuery from './hooks/useReportTotalizersQuery';

export const Report = () => {
  const { loading, report } = useReport();
  const {
    list,
    loading: loadingResult,
    pagination,
    setPagination,
    sort,
    setSort,
    filters,
    setFilters,
  } = useReportResultQuery(report?.id);

  const { list: totalizers, loading: loadingTotalizers } = useReportTotalizersQuery(report, filters);

  if (loading) {
    return <CircularProgress />;
  }

  if (!report || report == null) {
    return <Typography>Relatório não encontrado</Typography>;
  }

  const columns: GridColDef<{ [key: string]: any }>[] =
    report?.columns?.map((column) => {
      return {
        field: column.field,
        headerName: column.headerName,
        align: column.align as GridAlignment,
        headerAlign: column.headerAlign as GridAlignment,
        flex: 1,
        type: 'string',
        renderCell: (params) => {
          const regex = /item\.[a-zA-Z0-9_]+/g;
          let html = column.html;
          let matches;

          while ((matches = regex.exec(html)) !== null) {
            html = html.replace(matches[0], params.row?.[matches[0].split('.')[1]]);
          }

          return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
        },
      };
    }) ?? [];

  return (
    <div className="flex flex-col w-full gap-4">
      <ReportFilters setFilters={setFilters} />
      {report.hasTotalizers && <ReportTotalizers totalizers={totalizers} loading={loadingTotalizers} />}
      <DataGrid
        loading={loadingResult}
        rows={list?.content ?? []}
        columns={columns}
        paginationModel={pagination}
        onPaginationModelChange={setPagination}
        rowCount={list?.totalElements ?? 0}
        pageSizeOptions={(list?.totalElements ?? 0) > 10 ? [10, 25, 50] : [list?.totalElements ?? 0]}
        sortModel={sort}
        onSortModelChange={setSort}
        sortingMode="server"
        getRowId={() => crypto.randomUUID()}
      />
    </div>
  );
};
