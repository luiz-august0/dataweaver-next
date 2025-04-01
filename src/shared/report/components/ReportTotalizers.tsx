import { CircularProgress, Stack, Typography, useTheme } from '@mui/material';

type Props = {
  totalizers: { [key: string]: any } | undefined;
  loading: boolean;
};

export const ReportTotalizers = ({ totalizers, loading }: Props) => {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px',
        borderRadius: '0.375rem',
        backgroundColor: theme.palette.primary['main'],
        minHeight: 90,
      }}
    >
      <Typography fontSize={20} fontWeight={'bold'} color={'white'}>
        Valores totais
      </Typography>
      <div className="flex flex-row gap-10 items-start">
        {totalizers && !loading && (
          <>
            {Object.entries(totalizers).map(([key, value], index) => (
              <div className="items-start" key={index}>
                <Typography fontSize={16} color={'white'}>
                  {key}
                </Typography>
                <Typography fontSize={16} color={'white'} fontWeight={'bold'}>
                  {value}
                </Typography>
              </div>
            ))}
          </>
        )}
      </div>
      {loading && <CircularProgress size={32} sx={{ color: 'white' }} />}
    </Stack>
  );
};
