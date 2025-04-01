import { getReportTotalizers } from '@/core/reports/services/reports';
import { Report } from '@/core/reports/types/models';
import { useEffect, useState } from 'react';

export default function useReportTotalizersQuery(report?: Report, filters?: { [key: string]: any }) {
  const [list, setList] = useState<{ [key: string]: any }>();
  const [loading, setLoading] = useState<boolean>(false);

  const getList = async () => {
    if (!report?.id || !report?.hasTotalizers) return;

    setLoading(true);

    const data = await getReportTotalizers({
      id: report?.id,
      filters,
    });

    setList(data);
    setLoading(false);
  };

  useEffect(() => {
    getList();
  }, [report, filters]);

  return {
    getList,
    list,
    loading,
  };
}
