import HeaderPage from '@/components/customized/HeaderPage/HeaderPage';
import { useReport } from '@/shared/report/hooks/useReport';
import { Report } from '@/shared/report/Report';

export const ReportPage = () => {
  const { report } = useReport();

  return (
    <>
      <HeaderPage titlePage={report ? report.title : 'Relatório'} back/>
      <div className="flex gap-4">
        <Report />
      </div>
    </>
  );
};
