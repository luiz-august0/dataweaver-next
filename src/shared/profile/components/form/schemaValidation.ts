import yup from '@/lib/yup/yup';

export const schemaValidation = (validPassword: boolean) => {
  if (validPassword) {
    return yup.object().shape({
      login: yup.string().required().label('Login'),
      password: yup.string().required().label('Senha'),
    });
  } else {
    return yup.object().shape({
      login: yup.string().required().label('Login'),
    });
  }
};
