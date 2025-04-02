import DataGrid from '@/components/DataGrid/DataGrid';
import {
  Report,
  ReportColumnAlignEnum,
  ReportColumnFormatEnum,
  ReportFilter,
  ReportFilterEnum,
} from '@/core/reports/types/models';
import * as Icon from '@mui/icons-material';
import { Button, debounce, MenuItem, TextField, Typography } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Dispatch, SetStateAction } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { inputProps, TableField } from './commonTable';

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
  } = useFormContext<Report>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'columns',
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
                clearErrors(`columns.${index}`);
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
                setValue(`columns.${index}.sort`, e.target.value);
                clearErrors(`columns.${index}.sort`);
              }, 500)}
              type="number"
              error={errors?.columns && !!errors?.columns[index]?.sort?.message}
            />
          </TableField>
        );
      },
    },
    {
      field: 'field',
      sortable: false,
      headerName: 'Campo',
      minWidth: 184,
      flex: 1,
      renderCell: (params) => {
        const index = getIndex(params);

        return (
          <TableField>
            <TextField
              {...inputProps}
              placeholder="Campo"
              defaultValue={params.value}
              onKeyDown={(e) => e.stopPropagation()}
              onChange={debounce((e) => {
                setValue(`columns.${index}.field`, e.target.value);
                clearErrors(`columns.${index}.field`);
              }, 500)}
              error={errors?.columns && !!errors?.columns[index]?.field?.message}
            />
          </TableField>
        );
      },
    },
    {
      field: 'html',
      sortable: false,
      headerName: 'HTML',
      minWidth: 184,
      flex: 1,
      renderCell: (params) => {
        const index = getIndex(params);

        return (
          <TableField>
            <TextField
              {...inputProps}
              placeholder="HTML"
              value={watch(`columns.${index}.html`)}
              error={errors?.columns && !!errors?.columns[index]?.html?.message}
              onFocus={(e) => {
                setColumnIndex(index);
                e.target.blur();
              }}
              focused={false}
            />
          </TableField>
        );
      },
    },
    {
      field: 'headerName',
      sortable: false,
      headerName: 'Header',
      minWidth: 184,
      flex: 1,
      renderCell: (params) => {
        const index = getIndex(params);

        return (
          <TableField>
            <TextField
              {...inputProps}
              placeholder="Header"
              defaultValue={params.value}
              onKeyDown={(e) => e.stopPropagation()}
              onChange={debounce((e) => {
                setValue(`columns.${index}.headerName`, e.target.value);
                clearErrors(`columns.${index}.headerName`);
              }, 500)}
              error={errors?.columns && !!errors?.columns[index]?.headerName?.message}
            />
          </TableField>
        );
      },
    },
    {
      field: 'headerAlign',
      sortable: false,
      headerName: 'Alinhamento do Header',
      minWidth: 184,
      flex: 1,
      renderCell: (params) => {
        const index = getIndex(params);

        return (
          <TableField>
            <TextField
              {...inputProps}
              value={watch(`columns.${index}.headerAlign`)}
              onChange={(e) => {
                setValue(`columns.${index}.headerAlign`, e.target.value as keyof typeof ReportColumnAlignEnum);
                clearErrors(`columns.${index}.headerAlign`);
              }}
              placeholder="Alinhamento do Header"
              onKeyDown={(e) => e.stopPropagation()}
              select
              error={errors?.columns && !!errors?.columns[index]?.headerAlign}
            >
              {Object.values(ReportColumnAlignEnum)
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
      field: 'align',
      sortable: false,
      headerName: 'Alinhamento da Coluna',
      minWidth: 184,
      flex: 1,
      renderCell: (params) => {
        const index = getIndex(params);

        return (
          <TableField>
            <TextField
              {...inputProps}
              value={watch(`columns.${index}.align`)}
              onChange={(e) => {
                setValue(`columns.${index}.align`, e.target.value as keyof typeof ReportColumnAlignEnum);
                clearErrors(`columns.${index}.align`);
              }}
              placeholder="Alinhamento da Coluna"
              onKeyDown={(e) => e.stopPropagation()}
              select
              error={errors?.columns && !!errors?.columns[index]?.align}
            >
              {Object.values(ReportColumnAlignEnum)
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
      field: 'format',
      sortable: false,
      headerName: 'Formato',
      minWidth: 220,
      flex: 1,
      renderCell: (params) => {
        const index = getIndex(params);

        return (
          <TableField>
            <TextField
              {...inputProps}
              value={watch(`columns.${index}.format`)}
              onChange={(e) => {
                setValue(`columns.${index}.format`, e.target.value as keyof typeof ReportColumnFormatEnum);
                clearErrors(`columns.${index}.format`);
              }}
              placeholder="Tipo"
              onKeyDown={(e) => e.stopPropagation()}
              select
              error={errors?.columns && !!errors?.columns[index]?.format}
            >
              {Object.values(ReportColumnFormatEnum)
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
  ];

  return (
    <div className="flex w-full flex-col gap-2 mt-6">
      <div className="flex fle-row justify-between items-center">
        <Typography fontSize={20}>Colunas</Typography>
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
          <Icon.Add />
          Adicionar coluna
        </Button>
      </div>
      <DataGrid columns={columns} rows={fields || []} getRowId={(r) => r.id} paginationLess />
    </div>
  );
};
