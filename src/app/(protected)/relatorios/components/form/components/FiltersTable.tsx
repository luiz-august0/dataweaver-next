import DataGrid from '@/components/DataGrid/DataGrid';
import { Report, ReportFilter, ReportFilterEnum } from '@/core/reports/types/models';
import * as Icon from '@mui/icons-material';
import { Button, debounce, MenuItem, TextField, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Dispatch, SetStateAction } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { inputProps, TableField } from './commonTable';

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
  } = useFormContext<Report>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'filters',
  });

  const getIndex = (params: GridRenderCellParams) => {
    return fields.findIndex((item) => item.id == params.id);
  };

  const columns: GridColDef<ReportFilter>[] = [
    {
      field: 'actions',
      headerName: '',
      renderCell: (params) => {
        const index = getIndex(params);

        return (
          <TableField>
            <Button
              variant={'text'}
              sx={{
                minWidth: 24,
              }}
              onClick={() => {
                clearErrors(`filters.${index}`);
                remove(index);
              }}
            >
              <Icon.Delete />
            </Button>
          </TableField>
        );
      },
    },
    {
      field: 'sort',
      sortable: false,
      headerName: 'Ordem',
      minWidth: 160,
      renderCell: (params) => {
        const index = getIndex(params);

        return (
          <TableField>
            <TextField
              {...inputProps}
              placeholder="Ordem"
              defaultValue={params.value}
              onKeyDown={(e) => e.stopPropagation()}
              onChange={debounce((e) => {
                setValue(`filters.${index}.sort`, e.target.value);
                clearErrors(`filters.${index}.sort`);
              }, 500)}
              type="number"
              error={errors?.filters && !!errors?.filters[index]?.sort?.message}
            />
          </TableField>
        );
      },
    },
    {
      field: 'label',
      sortable: false,
      headerName: 'Label',
      minWidth: 184,
      flex: 1,
      renderCell: (params) => {
        const index = getIndex(params);

        return (
          <TableField>
            <TextField
              {...inputProps}
              placeholder="Label"
              defaultValue={params.value}
              onKeyDown={(e) => e.stopPropagation()}
              onChange={debounce((e) => {
                setValue(`filters.${index}.label`, e.target.value);
                clearErrors(`filters.${index}.label`);
              }, 500)}
              error={errors?.filters && !!errors?.filters[index]?.label?.message}
            />
          </TableField>
        );
      },
    },
    {
      field: 'parameter',
      sortable: false,
      headerName: 'Parâmetro',
      minWidth: 184,
      flex: 1,
      renderCell: (params) => {
        const index = getIndex(params);

        return (
          <TableField>
            <TextField
              {...inputProps}
              placeholder="Parâmetro"
              defaultValue={params.value}
              onKeyDown={(e) => e.stopPropagation()}
              onChange={debounce((e) => {
                setValue(`filters.${index}.parameter`, e.target.value);
                clearErrors(`filters.${index}.parameter`);
              }, 500)}
              error={errors?.filters && !!errors?.filters[index]?.parameter?.message}
            />
          </TableField>
        );
      },
    },
    {
      field: 'type',
      sortable: false,
      headerName: 'Tipo',
      minWidth: 220,
      flex: 1,
      renderCell: (params) => {
        const index = getIndex(params);

        return (
          <TableField>
            <TextField
              {...inputProps}
              value={watch(`filters.${index}.type`)}
              onChange={(e) => {
                setValue(`filters.${index}.type`, e.target.value as keyof typeof ReportFilterEnum);
                clearErrors(`filters.${index}.type`);
              }}
              placeholder="Tipo"
              onKeyDown={(e) => e.stopPropagation()}
              select
              error={errors?.filters && !!errors?.filters[index]?.type}
            >
              {Object.values(ReportFilterEnum)
                .filter((key) => typeof key == 'string')
                .map((key) => (
                  <MenuItem key={key} value={key}>
                    {key}
                  </MenuItem>
                ))}
            </TextField>
          </TableField>
        );
      },
    },
    {
      field: 'sql',
      sortable: false,
      headerName: 'SQL',
      minWidth: 350,
      flex: 1,
      renderCell: (params) => {
        const index = getIndex(params);

        return (
          <TableField>
            <TextField
              {...inputProps}
              placeholder="SQL"
              value={watch(`filters.${index}.sql`)}
              error={errors?.filters && !!errors?.filters[index]?.sql?.message}
              onFocus={(e) => {
                setFilterIndex(index);
                e.target.blur();
              }}
              focused={false}
            />
          </TableField>
        );
      },
    },
    {
      field: 'standardValue',
      sortable: false,
      headerName: 'Valor padrão',
      minWidth: 160,
      renderCell: (params) => {
        const index = getIndex(params);

        return (
          <TableField>
            <TextField
              {...inputProps}
              placeholder="Valor padrão"
              defaultValue={params.value}
              onKeyDown={(e) => e.stopPropagation()}
              onChange={debounce((e) => {
                setValue(`filters.${index}.standardValue`, e.target.value);
                clearErrors(`filters.${index}.standardValue`);
              }, 500)}
              error={errors?.filters && !!errors?.filters[index]?.standardValue?.message}
            />
          </TableField>
        );
      },
    },
  ];

  return (
    <div className="flex w-full flex-col gap-2 mt-6">
      <div className="flex fle-row justify-between items-center">
        <Typography fontSize={20}>Filtros</Typography>
        <Button onClick={() => append({ sort: fields.length + 1, label: '', parameter: '', sql: '', type: 'TEXT' })}>
          <Icon.Add />
          Adicionar filtro
        </Button>
      </div>
      <DataGrid columns={columns} rows={fields || []} getRowId={(r) => r.id} paginationLess />
    </div>
  );
};
