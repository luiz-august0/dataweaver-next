import { ReportFilterEnum } from '@/core/reports/types/models';
import dayjs from 'dayjs';

export const parseStandardFilterToInput = (type: keyof typeof ReportFilterEnum, value: string) => {
  if (value && value !== '') {
    switch (type) {
      case 'DATE':
        return parseDateFilterToInput(value);
      case 'NUMBER':
        return Number(value);
      default:
        return value;
    }
  }
};

export const parseInputToFilter = (type: keyof typeof ReportFilterEnum, value: any) => {
  if (value && value !== '') {
    switch (type) {
      case 'DATE':
        return dayjs(value).format('YYYY-MM-DDT00:00:00');
      case 'BOOLEAN':
        return value == 'true' || value == 'false' ? value == 'true' : undefined;
      case 'NUMBER':
        return Number(value);
      case 'TEXT':
        return value.toString();
    }
  }
};

const parseDateFilterToInput = (value: string) => {
  const date = new Date();

  switch (value) {
    case 'START_MONTH':
      return dayjs(new Date(date.getFullYear(), date.getMonth(), 1)).format('YYYY-MM-DD');
    case 'END_MONTH':
      return dayjs(new Date(date.getFullYear(), date.getMonth() + 1, 0)).format('YYYY-MM-DD');
    default: {
      if (value.startsWith('+') || value.startsWith('-')) {
        return (
          value.startsWith('+') ? dayjs(date).add(Number(value), 'day') : dayjs(date).subtract(Number(value), 'day')
        ).format('YYYY-MM-DD');
      } else {
        return dayjs(value).format('YYYY-MM-DD');
      }
    }
  }
};
