import { generateRecovery } from '@/core/recovery/services/recovery';
import { ForgotPasswordRequest } from '@/core/recovery/types/dtos';
import { successToast } from '@/helpers/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StepProps } from '../types';
import schemaValidation from './schemaValidation';

export const useForgotPasswordStep = (): StepProps => {
  const form = useForm<ForgotPasswordRequest>({
    resolver: yupResolver(schemaValidation),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = form;
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: ForgotPasswordRequest) => {
    setLoading(true);

    await generateRecovery(data)
      .then(() => {
        successToast(
          'Solicitação realizada com sucesso. Verifique o e-mail ' +
            data.login +
            ' para visualizar as instruções de redefinição de senha',
        );
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    title: 'Redefinir senha',
    subtitle: 'Informe o e-mail cadastrado para receber as instruções de redefinição de senha',
    buttonText: 'Solicitar',
    loading,
    clearErrors,
    reset,
    fields: (
      <>
        <TextField
          {...register('login')}
          margin="normal"
          required
          fullWidth
          id="login"
          label="Login"
          name="login"
          autoFocus
          InputLabelProps={{ shrink: true }}
          error={!!errors.login}
          helperText={errors.login?.message}
        />
      </>
    ),
  };
};
