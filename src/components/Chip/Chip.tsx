import { EnumParams } from '@/shared/types/enums';
import { Chip as MUIChip } from '@mui/material';

type Props = {
  enumParams: EnumParams;
};

export default function Chip({ enumParams }: Props) {
  return (
    <MUIChip
      label={enumParams.label}
      sx={{ backgroundColor: enumParams.bgColor ?? 'auto', color: enumParams.color ?? 'auto', fontWeight: 'bold' }}
    />
  );
}
