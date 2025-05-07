import { DataTable } from '@/components/customized/DataTable/DataTable';
import Input from '@/components/customized/Input/Input';
import Select from '@/components/customized/Select/Select';
import { Button } from '@/components/ui/button';
import { Report, ReportFilter, ReportFilterEnum } from '@/core/reports/types/models';
import { ColumnDef } from '@tanstack/react-table';
import debounce from 'lodash.debounce';
import { Plus, Trash } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

type Props = {
  setFilterIndex: Dispatch<SetStateAction<number | undefined>>;
};

export const FiltersTable = ({ setFilterIndex }: Props) => {
  const {
    control,
    setValue,
    watch,
    formState: { errors },
    clearErrors,
    register,
  } = useFormContext<Report>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'filters',
  });

  const getIndex = (row: ReportFilter) => {
    return fields.findIndex((item) => item.id == row.id);
  };

  const columns: ColumnDef<ReportFilter>[] = [
    {
      accessorKey: 'id',
      header: '',
      cell: ({ row }) => {
        const index = getIndex(row.original);

        return (
          <Button
            variant="ghost"
            onClick={() => {
              clearErrors(`filters.${index}`);
              remove(index);
            }}
          >
            <Trash className="h-5 w-5 text-primary" />
          </Button>
        );
      },
    },
    {
      accessorKey: 'sort',
      header: 'Ordem',
      cell: ({ row }) => {
        const index = getIndex(row.original);

        return (
          <Input
            {...register(`filters.${index}.sort`)}
            placeholder="Ordem"
            onKeyDown={(e) => e.stopPropagation()}
            type="number"
            error={!!errors.filters?.[index]?.sort?.message}
          />
        );
      },
    },
    {
      accessorKey: 'label',
      header: 'Label',
      cell: ({ row }) => {
        const index = getIndex(row.original);

        return (
          <Input
            {...register(`filters.${index}.label`)}
            placeholder="Label"
            onKeyDown={(e) => e.stopPropagation()}
            error={!!errors.filters?.[index]?.label?.message}
          />
        );
      },
    },
    {
      accessorKey: 'parameter',
      header: 'Parâmetro',
      cell: ({ row }) => {
        const index = getIndex(row.original);

        return (
          <Input
            {...register(`filters.${index}.parameter`)}
            placeholder="Parâmetro"
            onKeyDown={(e) => e.stopPropagation()}
            error={!!errors.filters?.[index]?.parameter?.message}
          />
        );
      },
    },
    {
      accessorKey: 'type',
      header: 'Tipo',
      cell: ({ row }) => {
        const index = getIndex(row.original);

        return (
          <Select
            className="w-full"
            options={Object.values(ReportFilterEnum)
              .filter((key) => typeof key == 'string')
              .map((key) => ({
                key,
                label: key,
                value: key,
              }))}
            value={watch(`filters.${index}.type`)}
            onValueChange={(value) => {
              setValue(`filters.${index}.type`, value as keyof typeof ReportFilterEnum);
              clearErrors(`filters.${index}.type`);
            }}
            placeholder="Tipo"
            onKeyDown={(e) => e.stopPropagation()}
            error={!!errors.filters?.[index]?.type?.message}
          />
        );
      },
    },
    {
      accessorKey: 'sql',
      header: 'SQL',
      cell: ({ row }) => {
        const index = getIndex(row.original);

        return (
          <Input
            placeholder="SQL"
            defaultValue={watch(`filters.${index}.sql`)}
            error={!!errors.filters?.[index]?.sql?.message}
            onFocus={(e) => {
              setFilterIndex(index);
              e.target.blur();
            }}
          />
        );
      },
    },
    {
      accessorKey: 'standardValue',
      header: 'Valor padrão',
      cell: ({ row }) => {
        const index = getIndex(row.original);

        return (
          <Input
            {...register(`filters.${index}.standardValue`)}
            placeholder="Valor padrão"
            onKeyDown={(e) => e.stopPropagation()}
            error={!!errors.filters?.[index]?.standardValue?.message}
          />
        );
      },
    },
  ];

  return (
    <div className="flex w-full flex-col gap-2 mt-6">
      <div className="flex fle-row justify-between items-center">
        <h1 className="text-xl">Filtros</h1>
        <Button onClick={() => append({ sort: fields.length + 1, label: '', parameter: '', sql: '', type: 'TEXT' })}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar filtro
        </Button>
      </div>
      <DataTable columns={columns} data={fields || []} />
    </div>
  );
};
