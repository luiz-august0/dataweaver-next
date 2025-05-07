import { EnumParams } from '@/shared/types/enums';
import { Badge } from '@/components/ui/badge';

type Props = {
  enumParams: EnumParams;
};

export default function Chip({ enumParams }: Props) {
  return (
    <Badge
      style={{
        backgroundColor: enumParams.bgColor ?? 'auto',
        color: enumParams.color ?? 'auto',
        fontWeight: 'bold',
      }}
    >
      {enumParams.label}
    </Badge>
  );
}
