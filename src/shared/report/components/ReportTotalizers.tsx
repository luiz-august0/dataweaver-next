import { Loader2 } from 'lucide-react';

type Props = {
  totalizers: { [key: string]: any } | undefined;
  loading: boolean;
};

export const ReportTotalizers = ({ totalizers, loading }: Props) => {
  return (
    <div className="flex flex-row justify-between items-center p-4 rounded-md bg-accent min-h-24">
      <h1 className="text-xl font-bold">Valores totais</h1>
      <div className="flex flex-row gap-10 items-start">
        {totalizers && !loading && (
          <>
            {Object.entries(totalizers).map(([key, value], index) => (
              <div className="items-start" key={index}>
                <h1 className="text-lg">{key}</h1>
                <h1 className="text-lg font-bold">{value}</h1>
              </div>
            ))}
          </>
        )}
      </div>
      {loading && <Loader2 className="h-8 w-8 animate-spin text-foreground" />}
    </div>
  );
};
