import { getMainDashboard } from '@/core/dashboards/services/dashboards';
import { Dashboard } from '@/core/dashboards/types/models';
import { useEffect, useState } from 'react';

export default function useMainDashboardQuery() {
  const [dashboard, setDashboard] = useState<Dashboard>();
  const [loading, setLoading] = useState<boolean>(true);

  const getDashboard = async () => {
    setLoading(true);

    const data = await getMainDashboard();

    setDashboard(data);

    setLoading(false);
  };

  useEffect(() => {
    getDashboard();
  }, []);

  return { dashboard, loading };
}
