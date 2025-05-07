import { ReportFilters } from './components/ReportFilters';
import { ReportTotalizers } from './components/ReportTotalizers';
import { useReport } from './hooks/useReport';
import useReportResultQuery from './hooks/useReportResultQuery';
import useReportTotalizersQuery from './hooks/useReportTotalizersQuery';
import { useState } from 'react';
import { getReportPdf } from '@/core/reports/services/reports';
import { Download, Loader2 } from 'lucide-react';
import { convertSortingToSortRequest } from '@/helpers/converters';
import { Button } from '@/components/ui/button';
import { DataTable, SortableHeader } from '@/components/customized/DataTable/DataTable';
import { ColumnDef } from '@tanstack/react-table';

export const Report = () => {
  const { loading, report } = useReport();
  const [loadingPdf, setLoadingPdf] = useState<boolean>(false);

  const {
    list,
    loading: loadingResult,
    setPagination,
    sorting,
    setSorting,
    filters,
    setFilters,
  } = useReportResultQuery(report?.id);
  const { list: totalizers, loading: loadingTotalizers } = useReportTotalizersQuery(report, filters);

  if (loading) {
    return <Loader2 className="h-8 w-8 animate-spin text-primary" />;
  }

  if (!report || report == null) {
    return <h1>Relatório não encontrado</h1>;
  }

  const columns: ColumnDef<{ [key: string]: any }>[] =
    report?.columns?.map((reportColumn) => {
      return {
        accessorKey: reportColumn.field,
        header: ({ column }) => <SortableHeader column={column} header={reportColumn.headerName} />,
        // align: column.align,
        // headerAlign: column.headerAlign as GridAlignment,
        cel: ({ row }) => {
          const regex = /item\.[a-zA-Z0-9_]+/g;
          let html = reportColumn.html;
          let matches;

          while ((matches = regex.exec(html)) !== null) {
            html = html.replace(matches[0], row.getValue(matches[0].split('.')[1]));
          }

          return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
        },
      };
    }) ?? [];

  const handleExportPdf = async () => {
    setLoadingPdf(true);

    if (!list || list?.content?.length <= 0) {
      setLoadingPdf(false);
      return;
    }

    const data = await getReportPdf({
      id: report?.id ?? 0,
      sort: convertSortingToSortRequest(sorting),
      filters,
    });

    if (data) {
      const URL = window.URL || window.webkitURL;
      const fileURL = URL.createObjectURL(data);
      window.open(fileURL, '_blank');
    }

    setLoadingPdf(false);
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <ReportFilters setFilters={setFilters} />
      {report.hasTotalizers && <ReportTotalizers totalizers={totalizers} loading={loadingTotalizers} />}
      <Button className="self-end" onClick={handleExportPdf} disabled={loadingPdf}>
        <Download className="mr-2 h-4 w-4" />
        Exportar PDF
      </Button>
      <DataTable
        columns={columns}
        data={list?.content || []}
        pagination={list}
        setPagination={setPagination}
        loading={loadingResult}
        sorting={sorting}
        onSortingChange={setSorting}
      />
    </div>
  );
};
