import { ReportColumnAlignEnum, ReportColumnFormatEnum, ReportFilterEnum } from '@/core/reports/types/models';
import yup from '@/lib/yup/yup';

export default yup.object().shape({
  name: yup.string().required().label('Nome'),
  title: yup.string().required().label('Título'),
  key: yup.string().required().label('Chave de URL'),
  sql: yup.string().required().label('SQL'),
  active: yup.boolean().required().label('Ativo'),
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
  ),
  filters: yup.array(
    yup.object({
      label: yup.string().required().label('Label'),
      parameter: yup.string().required().label('Parâmetro'),
      type: yup
        .mixed<keyof typeof ReportFilterEnum>()
        .oneOf(Object.keys(ReportFilterEnum) as (keyof typeof ReportFilterEnum)[])
        .required()
        .label('Tipo é obrigatório'),
      sql: yup.string().required().label('SQL'),
      sort: yup.number().required().label('Ordem'),
    }),
  ),
});
