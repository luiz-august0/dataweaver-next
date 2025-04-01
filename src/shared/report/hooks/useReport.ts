import { useContext } from "react";
import { ReportContext } from "../context/reportContext";

export const useReport = () => {
  const { loading, report } = useContext(ReportContext);

  return { loading, report };
};
