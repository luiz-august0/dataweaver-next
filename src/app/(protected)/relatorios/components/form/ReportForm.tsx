import HeaderPage from '@/components/customized/HeaderPage/HeaderPage';
import Input from '@/components/customized/Input/Input';
import { MonacoEditor } from '@/components/customized/MonacoEditor/MonacoEditor';
import Switch from '@/components/customized/Switch/Switch';
import { Button } from '@/components/ui/button';
import { getReportById, mutateReport } from '@/core/reports/services/reports';
import { Report } from '@/core/reports/types/models';
import { successToast } from '@/helpers/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import debounce from 'lodash.debounce';
import { Loader2 } from 'lucide-react';
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
    reValidateMode: 'onBlur',
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
    if (loading) return <Loader2 className="h-8 w-8 animate-spin text-primary" />;

    return (
      <FormProvider {...form}>
        <Switch
          label="Ativo"
          id="report-active-switch"
          checked={watch('active')}
          onCheckedChange={(checked) => setValue('active', checked)}
        />
        <div className="flex flex-row gap-4 max-md:flex-col w-full">
          <Input
            {...register('name')}
            className="w-full"
            required
            id="report-name-text"
            label="Nome"
            name="name"
            errorMessage={errors.name?.message}
          />
          <Input
            {...register('title')}
            className="w-full"
            required
            id="report-title-text"
            label="Título"
            name="title"
            errorMessage={errors.title?.message}
          />
          <Input
            {...register('key')}
            className="w-full"
            required
            id="report-key-text"
            label="Chave de URL"
            name="key"
            errorMessage={errors.key?.message}
          />
        </div>
        <div className="flex flex-row gap-4 max-md:flex-col w-full">
          <MonacoEditor
            height="350px"
            label="SQL"
            defaultLanguage="sql"
            defaultValue={watch('sql')}
            errorMessage={errors?.sql?.message}
            onChange={debounce((value: any) => {
              setValue('sql', value ?? '');
              clearErrors('sql');
            }, 500)}
            required
          />
          <MonacoEditor
            height="350px"
            label="SQL Totalizadores"
            defaultLanguage="sql"
            defaultValue={watch('sqlTotalizers')}
            errorMessage={errors?.sqlTotalizers?.message}
            onChange={debounce((value: any) => {
              setValue('sqlTotalizers', value ?? '');
              clearErrors('sqlTotalizers');
            }, 500)}
          />
        </div>
        <ColumnsTable setColumnIndex={setColumnIndex} />
        <FiltersTable setFilterIndex={setFilterIndex} />
        <Button
          className="self-end mt-1.5 w-32"
          disabled={loadingSubmit}
          onClick={handleSubmit((data) => onSubmit(data as unknown as Report))}
        >
          Salvar
        </Button>
        <EditorForm
          open={typeof filterIndex !== 'undefined'}
          field={typeof filterIndex !== 'undefined' ? (`filters.${filterIndex}.sql` as keyof Report) : undefined}
          formTitle="Editar SQL"
          language="sql"
          handleClose={() => setFilterIndex(undefined)}
        />
        <EditorForm
          open={typeof columnIndex !== 'undefined'}
          field={typeof columnIndex !== 'undefined' ? (`columns.${columnIndex}.html` as keyof Report) : undefined}
          formTitle="Editar HTML"
          language="html"
          handleClose={() => setColumnIndex(undefined)}
        />
      </FormProvider>
    );
  };

  return (
    <>
      <HeaderPage titlePage={id ? 'Editar Relatório' : 'Novo Relatório'} back />
      <div className="flex flex-col gap-4 items-start pb-4">{renderContent()}</div>
    </>
  );
};
