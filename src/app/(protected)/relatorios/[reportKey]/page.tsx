"use client";

import { ReportProvider } from "@/shared/report/context/reportContext";
import { ReportPage } from "../components/ReportPage";

export default function Page({ params: { reportKey } }: { params: { reportKey: string } }) {
  return (
    <ReportProvider reportKey={reportKey}>
      <ReportPage/>
    </ReportProvider>
  );
}
