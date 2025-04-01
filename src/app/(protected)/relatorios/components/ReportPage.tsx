import HeaderPage from '@/components/HeaderPage/HeaderPage';
import { useReport } from '@/shared/report/hooks/useReport';
import { Report } from '@/shared/report/Report';

export const ReportPage = () => {
  const { report } = useReport();

  return (
    <>
      <HeaderPage titlePage={report ? report.title : 'Relatório'} />
      <div className="flex mt-10 px-3 gap-4">
        <Report />
      </div>
    </>
  );
};
