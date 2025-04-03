import HeaderPage from '@/components/HeaderPage/HeaderPage';
import { MonacoEditor } from '@/components/MonacoEditor/MonacoEditor';
import { getReportById, mutateReport } from '@/core/reports/services/reports';
import { Report } from '@/core/reports/types/models';
import { successToast } from '@/helpers/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress, debounce, FormControlLabel, Switch, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ColumnsTable } from './components/ColumnsTable';
import { EditorForm } from './components/EditorForm';
import { FiltersTable } from './components/FiltersTable';
import schemaValidation from './schemaValidation';

type Props = {
  id?: number;
};

export const ReportForm = ({ id }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(!!id);
  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
  const [filterIndex, setFilterIndex] = useState<number>();
  const [columnIndex, setColumnIndex] = useState<number>();

  const form = useForm<Report>({
    defaultValues: {
      active: true,
    },
    resolver: yupResolver(schemaValidation),
  });

  const {
    handleSubmit,
    reset,
    clearErrors,
    setValue,
    watch,
    register,
    formState: { errors },
  } = form;

  const loadReport = async (id: number) => {
    await getReportById({ id }).then((data) => reset(data));
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      loadReport(id);
    } else {
      reset();
    }
  }, [id, form]);

  const onSubmit = async (data: Report) => {
    setLoadingSubmit(true);

    await mutateReport({
      ...data,
      columns: data?.columns?.map((column) => ({ ...column, id: undefined })),
      filters: data?.filters?.map((filter) => ({ ...filter, id: undefined })),
    }).then(() => {
      successToast('Relatório salvo com sucesso!');
      router.push('/relatorios');
    });

    setLoading(false);
  };

  const renderContent = () => {
    if (loading) return <CircularProgress />;

    return (
      <FormProvider {...form}>
        <FormControlLabel
          sx={{ margin: '0', marginBottom: '16px' }}
          value="top"
          control={
            <Switch
              checked={watch('active')}
              onChange={() => setValue('active', !watch('active'))}
              name="active"
              color="primary"
              id="report-active-switch"
            />
          }
          label="Ativo"
          labelPlacement="top"
        />
        <div className="flex flex-row gap-4 max-md:flex-col w-full">
          <TextField
            {...register('name')}
            required
            fullWidth
            id="report-name-text"
            label="Nome"
            name="name"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            {...register('title')}
            required
            fullWidth
            id="report-title-text"
            label="Título"
            name="title"
            error={!!errors.title}
            helperText={errors.title?.message}
          />
          <TextField
            {...register('key')}
            required
            fullWidth
            id="report-key-text"
            label="Chave de URL"
            name="key"
            error={!!errors.key}
            helperText={errors.key?.message}
          />
        </div>
        <div className="flex flex-row gap-4 max-md:flex-col w-full">
          <div className="w-full">
            <MonacoEditor
              height="350px"
              label="SQL"
              defaultLanguage="sql"
              defaultValue={watch('sql')}
              error={!!errors?.sql}
              helperText={errors?.sql?.message}
              onChange={debounce((value: any) => {
                setValue('sql', value ?? '');
                clearErrors('sql');
              }, 500)}
              required
            />
          </div>
          <div className="w-full">
            <MonacoEditor
              height="350px"
              label="SQL Totalizadores"
              defaultLanguage="sql"
              defaultValue={watch('sqlTotalizers')}
              error={!!errors?.sqlTotalizers}
              helperText={errors?.sqlTotalizers?.message}
              onChange={debounce((value: any) => {
                setValue('sqlTotalizers', value ?? '');
                clearErrors('sqlTotalizers');
              }, 500)}
            />
          </div>
        </div>
        <ColumnsTable setColumnIndex={setColumnIndex} />
        <FiltersTable setFilterIndex={setFilterIndex} />
        <Button
          color="primary"
          variant="contained"
          size="small"
          disabled={loadingSubmit}
          sx={{ height: '40px', width: 100, alignSelf: 'flex-end', justifySelf: 'flex-end', marginTop: 5 }}
          onClick={handleSubmit(onSubmit)}
        >
          Salvar
        </Button>
        <EditorForm
          open={typeof filterIndex !== 'undefined'}
          index={filterIndex ?? 0}
          field={`filters.${filterIndex ?? 0}.sql` as keyof Report}
          formTitle="Editar SQL"
          label="SQL"
          language="sql"
          handleClose={() => setFilterIndex(undefined)}
        />
        <EditorForm
          open={typeof columnIndex !== 'undefined'}
          index={columnIndex ?? 0}
          field={`columns.${columnIndex ?? 0}.html` as keyof Report}
          formTitle="Editar HTML"
          label="HTML"
          language="html"
          handleClose={() => setColumnIndex(undefined)}
        />
      </FormProvider>
    );
  };

  return (
    <>
      <HeaderPage titlePage={id ? 'Editar Relatório' : 'Novo Relatório'} back />
      <div className="flex flex-col mt-10 px-3 gap-4 items-start">{renderContent()}</div>
    </>
  );
};
