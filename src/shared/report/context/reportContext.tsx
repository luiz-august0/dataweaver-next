"use client";

import { getReportByKey } from "@/core/reports/services/reports";
import { Report } from "@/core/reports/types/models";
import { createContext, useEffect, useState } from "react";

type ReportContextProps = {
  report?: Report;
  loading: boolean;
};

type ReportProvider = {
  children: React.ReactNode;
  reportKey?: string;
};

export const ReportContext = createContext({} as ReportContextProps);

export const ReportProvider = ({ children, reportKey }: ReportProvider) => {
  const [report, setReport] = useState<Report>();
  const [loading, setLoading] = useState<boolean>(false);

  const getReport = async () => {
    if (!reportKey) return;

    setLoading(true);

    const data = await getReportByKey({ key: reportKey });

    setReport(data);

    setLoading(false);
  };

  useEffect(() => {
    getReport();
  }, [reportKey]);

  return (
    <ReportContext.Provider value={{ report, loading }}>
      {children}
    </ReportContext.Provider>
  );
};
