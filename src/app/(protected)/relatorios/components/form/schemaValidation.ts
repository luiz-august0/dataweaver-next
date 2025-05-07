import { Report, ReportColumnAlignEnum, ReportColumnFormatEnum, ReportFilterEnum } from '@/core/reports/types/models';
import yup from '@/lib/yup/yup';
import { ObjectSchema } from 'yup';

const reportSchema: ObjectSchema<Report> = yup.object({
  name: yup.string().required().label('Nome'),
  title: yup.string().required().label('Título'),
  key: yup.string().required().label('Chave de URL'),
  sql: yup.string().required().label('SQL'),
  columns: yup.array(
    yup.object({
      field: yup.string().required().label('Campo'),
      html: yup.string().required().label('Html'),
      headerName: yup.string().required().label('Header'),
      headerAlign: yup
        .mixed<keyof typeof ReportColumnAlignEnum>()
        .oneOf(Object.keys(ReportColumnAlignEnum) as (keyof typeof ReportColumnAlignEnum)[])
        .required()
        .label('Alinhamento de Header é obrigatório'),
      align: yup
        .mixed<keyof typeof ReportColumnAlignEnum>()
        .oneOf(Object.keys(ReportColumnAlignEnum) as (keyof typeof ReportColumnAlignEnum)[])
        .required()
        .label('Alinhamento de Coluna é obrigatório'),
      sort: yup.number().required().label('Ordem'),
      format: yup
        .mixed<keyof typeof ReportColumnFormatEnum>()
        .oneOf(Object.keys(ReportColumnFormatEnum) as (keyof typeof ReportColumnFormatEnum)[])
        .required()
        .label('Formatação é obrigatório'),
    }),
  ).optional().label('Colunas'),
  filters: yup.array(
    yup.object({
      label: yup.string().required().label('Label'),
      parameter: yup.string().required().label('Parâmetro'),
      sql: yup.string().required().label('SQL'),
      type: yup
        .mixed<keyof typeof ReportFilterEnum>()
        .oneOf(Object.keys(ReportFilterEnum) as (keyof typeof ReportFilterEnum)[])
        .required()
        .label('Tipo é obrigatório'),
      sort: yup.number().required().label('Ordem'),
    }),
  ).optional().label('Filtros'),
  sqlTotalizers: yup.string().optional().label('SQL Totalizadores'),
  active: yup.boolean().optional().label('Ativo'),
  hasTotalizers: yup.boolean().optional().label('Possui Totalizadores'),
  id: yup.number().optional().label('ID'),
}) as ObjectSchema<Report>;

export default reportSchema;