import HeaderPage from '@/components/HeaderPage/HeaderPage';
import { CustomizedButtonProps } from '@/shared/types/general';
import * as Icon from '@mui/icons-material';
import useReportListQuery from '../hooks/useReportListQuery';
import ReportTable from './ReportTable';
import { useRouter } from 'next/navigation';

export default function ReportList() {
  const router = useRouter();
  const { list, pagination, setPagination, loading, search, sort, setSort } = useReportListQuery();

  const buttons: CustomizedButtonProps[] = [
    {
      label: 'Novo Relatório',
      startIcon: <Icon.Add />,
      color: 'primary',
      variant: 'contained',
      size: 'small',
      onClick: () => router.push('/relatorios/novo'),
    },
  ];

  return (
    <>
      <HeaderPage titlePage="Relatórios" search={search} buttons={buttons} />
      <div className="mt-10 px-3">
        <ReportTable
          list={list}
          pagination={pagination}
          setPagination={setPagination}
          loading={loading}
          sort={sort}
          setSort={setSort}
        />
      </div>
    </>
  );
}
