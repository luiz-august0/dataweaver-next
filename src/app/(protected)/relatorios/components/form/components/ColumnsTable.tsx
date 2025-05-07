import { DataTable } from '@/components/customized/DataTable/DataTable';
import Input from '@/components/customized/Input/Input';
import Select from '@/components/customized/Select/Select';
import { Button } from '@/components/ui/button';
import { Report, ReportColumn, ReportColumnAlignEnum, ReportColumnFormatEnum } from '@/core/reports/types/models';
import { ColumnDef } from '@tanstack/react-table';
import { Plus, Trash } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

type Props = {
  setColumnIndex: Dispatch<SetStateAction<number | undefined>>;
};

export const ColumnsTable = ({ setColumnIndex }: Props) => {
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
    name: 'columns',
  });

  const getIndex = (row: ReportColumn) => {
    return fields.findIndex((item) => item.id == row.id);
  };

  const columns: ColumnDef<ReportColumn>[] = [
    {
      accessorKey: 'id',
      header: '',
      cell: ({ row }) => {
        const index = getIndex(row.original);

        return (
          <Button
            variant="ghost"
            onClick={() => {
              clearErrors(`columns.${index}`);
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
            {...register(`columns.${index}.sort`)}
            onKeyDown={(e) => e.stopPropagation()}
            placeholder="Ordem"
            type="number"
            error={!!errors.columns?.[index]?.sort?.message}
          />
        );
      },
    },
    {
      accessorKey: 'field',
      header: 'Campo',
      cell: ({ row }) => {
        const index = getIndex(row.original);

        return (
          <Input
            {...register(`columns.${index}.field`)}
            onKeyDown={(e) => e.stopPropagation()}
            placeholder="Campo"
            error={!!errors.columns?.[index]?.field?.message}
          />
        );
      },
    },
    {
      accessorKey: 'html',
      header: 'HTML',
      cell: ({ row }) => {
        const index = getIndex(row.original);

        return (
          <Input
            placeholder="HTML"
            defaultValue={watch(`columns.${index}.html`)}
            error={!!errors.columns?.[index]?.html?.message}
            onFocus={(e) => {
              setColumnIndex(index);
              e.target.blur();
            }}
          />
        );
      },
    },
    {
      accessorKey: 'headerName',
      header: 'Header',
      cell: ({ row }) => {
        const index = getIndex(row.original);

        return (
          <Input
            {...register(`columns.${index}.headerName`)}
            placeholder="Header"
            onKeyDown={(e) => e.stopPropagation()}
            error={!!errors.columns?.[index]?.headerName?.message}
          />
        );
      },
    },
    {
      accessorKey: 'headerAlign',
      header: 'Alinhamento do Header',
      cell: ({ row }) => {
        const index = getIndex(row.original);

        return (
          <Select
            className="w-full"
            options={Object.values(ReportColumnAlignEnum)
              .filter((key) => typeof key == 'string')
              .map((key) => ({
                key,
                label: key,
                value: key,
              }))}
            value={watch(`columns.${index}.headerAlign`)}
            onValueChange={(value) => {
              setValue(`columns.${index}.headerAlign`, value as keyof typeof ReportColumnAlignEnum);
              clearErrors(`columns.${index}.headerAlign`);
            }}
            placeholder="Alinhamento do Header"
            onKeyDown={(e) => e.stopPropagation()}
            error={!!errors.columns?.[index]?.headerAlign?.message}
          />
        );
      },
    },
    {
      accessorKey: 'align',
      header: 'Alinhamento da Coluna',
      cell: ({ row }) => {
        const index = getIndex(row.original);

        return (
          <Select
            className="w-full"
            options={Object.values(ReportColumnAlignEnum)
              .filter((key) => typeof key == 'string')
              .map((key) => ({
                key,
                label: key,
                value: key,
              }))}
            value={watch(`columns.${index}.align`)}
            onValueChange={(value) => {
              setValue(`columns.${index}.align`, value as keyof typeof ReportColumnAlignEnum);
              clearErrors(`columns.${index}.align`);
            }}
            placeholder="Alinhamento do Header"
            onKeyDown={(e) => e.stopPropagation()}
            error={!!errors.columns?.[index]?.align?.message}
          />
        );
      },
    },
    {
      accessorKey: 'format',
      header: 'Formato',
      cell: ({ row }) => {
        const index = getIndex(row.original);

        return (
          <Select
            className="w-full"
            options={Object.values(ReportColumnFormatEnum)
              .filter((key) => typeof key == 'string')
              .map((key) => ({
                key,
                label: key,
                value: key,
              }))}
            value={watch(`columns.${index}.format`)}
            onValueChange={(value) => {
              setValue(`columns.${index}.format`, value as keyof typeof ReportColumnFormatEnum);
              clearErrors(`columns.${index}.format`);
            }}
            placeholder="Alinhamento do Header"
            onKeyDown={(e) => e.stopPropagation()}
            error={!!errors.columns?.[index]?.format?.message}
          />
        );
      },
    },
  ];

  return (
    <div className="flex w-full flex-col gap-2 mt-6">
      <div className="flex fle-row justify-between items-center">
        <h1 className="text-xl">Colunas</h1>
        <Button
          onClick={() =>
            append({
              sort: fields.length + 1,
              align: 'LEFT',
              field: '',
              format: 'DEFAULT',
              headerAlign: 'LEFT',
              headerName: '',
              html: '',
            })
          }
        >
          <Plus className="mr-2 h-4 w-4" />
          Adicionar coluna
        </Button>
      </div>
      <DataTable columns={columns} data={fields || []} />
    </div>
  );
};
