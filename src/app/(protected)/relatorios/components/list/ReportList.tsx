import { CustomizedButtonProps } from '@/shared/types/general';
import useReportListQuery from '../hooks/useReportListQuery';
import ReportTable from './ReportTable';
import { useRouter } from 'next/navigation';
import HeaderPage from '@/components/customized/HeaderPage/HeaderPage';

export default function ReportList() {
  const router = useRouter();
  const { list, setPagination, loading, search, sorting, setSorting } = useReportListQuery();

  const buttons: CustomizedButtonProps[] = [
    {
      label: 'Novo Relatório',
      startIcon: 'Plus',
      color: 'primary',
      onClick: () => router.push('/relatorios/novo'),
    },
  ];

  return (
    <>
      <HeaderPage titlePage="Relatórios" search={search} buttons={buttons} />
      <div>
        <ReportTable
          list={list}
          setPagination={setPagination}
          loading={loading}
          sorting={sorting}
          setSorting={setSorting}
        />
      </div>
    </>
  );
}
