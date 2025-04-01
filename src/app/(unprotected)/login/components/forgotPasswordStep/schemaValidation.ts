import yup from '@/lib/yup/yup';

export default yup.object().shape({
  login: yup.string().required().label('Login'),
});
