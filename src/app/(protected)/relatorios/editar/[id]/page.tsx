'use client';

import { ReportForm } from '../../components/form/ReportForm';

export default function Page({ params: { id } }: { params: { id: string } }) {
  return <ReportForm id={Number(id)} />;
}
