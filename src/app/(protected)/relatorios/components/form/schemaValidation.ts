import { ReportColumnAlignEnum, ReportColumnFormatEnum, ReportFilterEnum } from '@/core/reports/types/models';
import yup from '@/lib/yup/yup';

export default yup.object().shape({
  name: yup.string().required('Nome'),
  title: yup.string().required('Título'),
  key: yup.string().required('Chave de URL'),
  sql: yup.string().required('SQL'),
  active: yup.boolean().required('Ativo'),
  columns: yup.array(
    yup.object({
      field: yup.string().required().label('Campo'),
      html: yup.string().required().label('Html'),
      headerName: yup.string().required().label('Header'),
      headerAlign: yup
        .mixed<keyof typeof ReportColumnAlignEnum>()
        .oneOf(Object.keys(ReportColumnAlignEnum) as (keyof typeof ReportColumnAlignEnum)[])
        .required('Alinhamento de Header é obrigatório'),
      align: yup
        .mixed<keyof typeof ReportColumnAlignEnum>()
        .oneOf(Object.keys(ReportColumnAlignEnum) as (keyof typeof ReportColumnAlignEnum)[])
        .required('Alinhamento de Coluna é obrigatório'),
      sort: yup.number().required().label('Ordem'),
      format: yup
        .mixed<keyof typeof ReportColumnFormatEnum>()
        .oneOf(Object.keys(ReportColumnFormatEnum) as (keyof typeof ReportColumnFormatEnum)[])
        .required('Formatação é obrigatório'),
    }),
  ),
  filters: yup.array(
    yup.object({
      label: yup.string().required().label('Label'),
      parameter: yup.string().required().label('Parâmetro'),
      type: yup
        .mixed<keyof typeof ReportFilterEnum>()
        .oneOf(Object.keys(ReportFilterEnum) as (keyof typeof ReportFilterEnum)[])
        .required('Tipo é obrigatório'),
      sql: yup.string().required().label('SQL'),
      sort: yup.number().required().label('Ordem'),
    }),
  ),
});
