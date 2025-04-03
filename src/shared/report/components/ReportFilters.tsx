import { ReportFilterEnum } from '@/core/reports/types/models';
import { debounce, MenuItem, Select, Stack, TextField } from '@mui/material';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useReport } from '../hooks/useReport';
import { parseInputToFilter, parseStandardFilterToInput } from '../utils/parsers';

type Props = {
  setFilters: Dispatch<SetStateAction<{ [key: string]: any }>>;
};

const EnumBooleanFilter = {
  true: { label: 'Sim', value: true },
  false: { label: 'Não', value: false },
  all: { label: 'Todos', value: undefined },
};

export const ReportFilters = ({ setFilters }: Props) => {
  const [filtersInput, setFiltersInput] = useState<{ [key: string]: any }>([]);
  const { report } = useReport();

  const onChangeFilter = debounce((type: keyof typeof ReportFilterEnum, parameter: string, value: any) => {
    setFilters((prev) => ({ ...prev, [parameter]: parseInputToFilter(type, value) }));
  }, 750);

  const onChangeInput = (parameter: string, value: any) => {
    setFiltersInput((prev) => ({ ...prev, [parameter]: value }));
  };

  useEffect(() => {
    if (report?.filters) {
      report.filters.forEach((filter) => {
        setFiltersInput((prev) => ({
          ...prev,
          [filter.parameter]: parseStandardFilterToInput(filter.type, filter?.standardValue ?? ''),
        }));
      });
    }
  }, [report?.filters]);

  const handleChangeInput = (type: keyof typeof ReportFilterEnum, parameter: string, value: any) => {
    onChangeInput(parameter, value);
    onChangeFilter(type, parameter, value);
  };

  return (
    <Stack
      display={'flex'}
      flexDirection={{ sm: 'row' }}
      gap={2}
      width={{ sm: '50%', xs: report?.filters && report?.filters.length < 2 ? '50%' : '100%' }}
    >
      {report?.filters?.map((filter) => {
        switch (filter.type) {
          case 'DATE':
            return (
              <TextField
                fullWidth
                id={`${filter.parameter}-date`}
                label={filter.label}
                name={filter.parameter}
                value={filtersInput[filter.parameter]}
                onChange={(e) => handleChangeInput(filter.type, filter.parameter, e.target.value)}
                type="date"
                InputLabelProps={{ shrink: true }}
              />
            );
          case 'NUMBER':
            return (
              <TextField
                fullWidth
                id={`${filter.parameter}-number`}
                label={filter.label}
                name={filter.parameter}
                value={filtersInput[filter.parameter]}
                onChange={(e) => handleChangeInput(filter.type, filter.parameter, e.target.value)}
                type="number"
              />
            );
          case 'TEXT':
            return (
              <TextField
                fullWidth
                id={`${filter.parameter}-text`}
                label={filter.label}
                name={filter.parameter}
                value={filtersInput[filter.parameter]}
                onChange={(e) => handleChangeInput(filter.type, filter.parameter, e.target.value)}
              />
            );
          case 'BOOLEAN':
            return (
              <Select
                id={`${filter.parameter}-boolean`}
                label={filter.label}
                name={filter.parameter}
                value={filtersInput[filter.parameter]}
                onChange={(e) =>
                  handleChangeInput(
                    filter.type,
                    filter.parameter,
                    EnumBooleanFilter[e.target.value as keyof typeof EnumBooleanFilter],
                  )
                }
              >
                {Object.entries(EnumBooleanFilter).map(([key, value]) => (
                  <MenuItem key={key} value={key}>
                    {value.label}
                  </MenuItem>
                ))}
              </Select>
            );
        }
      })}
    </Stack>
  );
};
