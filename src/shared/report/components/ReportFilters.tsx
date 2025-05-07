import { ReportFilterEnum } from '@/core/reports/types/models';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useReport } from '../hooks/useReport';
import { parseInputToFilter, parseStandardFilterToInput } from '../utils/parsers';
import debounce from 'lodash.debounce';
import { cn } from '@/helpers/cn';
import Input from '@/components/customized/Input/Input';
import Select from '@/components/customized/Select/Select';

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
    <div
      className={cn(
        'flex flex-col sm:flex-row gap-4 w-full',
      )}
    >
      {report?.filters?.map((filter) => {
        switch (filter.type) {
          case 'DATE':
            return (
              <Input
                id={`${filter.parameter}-date`}
                label={filter.label}
                name={filter.parameter}
                value={filtersInput[filter.parameter]}
                onChange={(e) => handleChangeInput(filter.type, filter.parameter, e.target.value)}
                type="date"
              />
            );
          case 'NUMBER':
            return (
              <Input
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
              <Input
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
                placeholder="Selecione uma opção"
                name={filter.parameter}
                value={filtersInput[filter.parameter]}
                onValueChange={(value) => handleChangeInput(filter.type, filter.parameter, value)}
                options={Object.entries(EnumBooleanFilter).map(([key, { value, label }]) => ({
                  key,
                  label,
                  value,
                }))}
              />
            );
        }
      })}
    </div>
  );
};
