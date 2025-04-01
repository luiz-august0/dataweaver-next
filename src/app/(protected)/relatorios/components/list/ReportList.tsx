import HeaderPage from '@/components/HeaderPage/HeaderPage';
import useReportListQuery from '../hooks/useReportListQuery';
import { Button, Typography } from '@mui/material';
import { OpenInNew } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function ReportList() {
  const router = useRouter();
  const { getList, list, pagination, setPagination, loading, search } = useReportListQuery();

  return (
    <>
      <HeaderPage titlePage="Relatórios" search={search} />
      <div className="mt-10 px-3 gap-4 flex-row flex-wrap">
        {list?.content?.map((report, index) => (
          <Button
            sx={{ borderRadius: '8px', textTransform: 'none', minWidth: "50%", height: "60px" }}
            variant="contained"
            color="primary"
            onClick={() => router.push(`/relatorios/${report.key}`)}
            key={index}
          >
            <div className="flex flex-row items-center w-full justify-between">
              <div className="flex-1 items-center justify-center">
                <Typography fontSize={20} fontWeight={'bold'}>
                  {report.title}
                </Typography>
              </div>
              <OpenInNew fontSize="small" />
            </div>
          </Button>
        ))}
      </div>
    </>
  );
}
