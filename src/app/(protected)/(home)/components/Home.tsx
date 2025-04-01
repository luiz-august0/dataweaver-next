import HeaderPage from '@/components/HeaderPage/HeaderPage';
import { ReportProvider } from '@/shared/report/context/reportContext';
import { useReport } from '@/shared/report/hooks/useReport';
import { Report } from '@/shared/report/Report';
import { OpenInNew } from '@mui/icons-material';
import { Button, CircularProgress, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import useMainDashboardQuery from './hooks/useMainDashboardQuery';

const MainReport = () => {
  const { report } = useReport();

  return (
    <div className="flex flex-col p-4 rounded-md bg-gray-100 gap-4">
      <Typography fontSize={28}>{report?.title}</Typography>
      <Report />
    </div>
  );
};

export default function Home() {
  const { dashboard, loading } = useMainDashboardQuery();
  const router = useRouter();

  const hasReportsOrLinks =
    !loading &&
    ((dashboard?.links && dashboard.links.length > 0) || (dashboard?.reports && dashboard.reports.length > 0));

  const renderContent = () => {
    if (loading) return <CircularProgress />;

    return (
      <>
        {hasReportsOrLinks && (
          <div className="grid grid-cols-2 gap-4 w-full h-full max-md:grid-cols-1">
            <div className="flex flex-col gap-4 w-full">
              {dashboard?.reports?.map((report, index) => (
                <ReportProvider reportKey={report.report.key} key={index}>
                  <MainReport />
                </ReportProvider>
              ))}
            </div>
            <div className="flex flex-col gap-4 w-full">
              {dashboard?.links?.map((link, index) => (
                <Button
                  sx={{ borderRadius: '8px', textTransform: 'none' }}
                  variant="outlined"
                  color="primary"
                  onClick={() => router.push(link.link)}
                  key={index}
                >
                  <div className="flex flex-row items-center w-full justify-between">
                    <div className="flex-1 items-center justify-center">
                      <Typography fontSize={20} fontWeight={'bold'}>
                        {link.title}
                      </Typography>
                    </div>
                    <OpenInNew fontSize="small" />
                  </div>
                </Button>
              ))}
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <HeaderPage titlePage="Dashboard" />
      <div className="flex flex-row mt-10 px-3 gap-4 justify-between max-md:flex-col max-md:items-center">
        {renderContent()}
      </div>
    </>
  );
}
