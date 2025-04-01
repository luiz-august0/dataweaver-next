import yup from '@/lib/yup/yup';

export default yup.object().shape({
  password: yup.string().required().label('Senha'),
  confirmPassword: yup
    .string()
    .test('passwordEquals', 'As senhas devem ser iguais', function (value) {
      const { password } = this.parent;

      return !(value && value !== password);
    })
    .required()
    .label('Confirmar senha'),
});
