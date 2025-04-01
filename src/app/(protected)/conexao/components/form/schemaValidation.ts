import yup from '@/lib/yup/yup';

export default yup.object().shape({
  host: yup.string().required().label('Host'),
  port: yup.number().required().label('Porta'),
  database: yup.string().required().label('Base'),
  username: yup.string().required().label('Usuário'),
  password: yup.string().required().label('Senha'),
});
