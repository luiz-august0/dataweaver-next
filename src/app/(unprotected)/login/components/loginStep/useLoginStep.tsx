import PasswordInput from '@/components/PasswordInput/PasswordInput';
import { SessionLogin } from '@/core/auth/types/models';
import { handlerHttpError, successToast } from '@/helpers/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@mui/material/TextField';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { StepProps } from '../types';
import schemaValidation from './schemaValidation';

export const useLoginStep = (): StepProps => {
  const router = useRouter();
  const form = useForm<SessionLogin>({
    resolver: yupResolver(schemaValidation),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
    watch,
    setValue,
  } = form;
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: SessionLogin) => {
    setLoading(true);

    const signInData = {
      login: data.login,
      password: data.password,
      databasePassword: data.databasePassword
    };

    const result = await signIn('credentials', {
      ...signInData,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      handlerHttpError(JSON.parse(result.error));
      return;
    }

    successToast('Login realizado com sucesso!');

    router.replace('/');
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    title: 'Login',
    buttonText: 'Acessar',
    subtitle: 'Informe seus dados abaixo para acessar o sistema',
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
        <PasswordInput
          value={watch('password')}
          onChange={(e) => setValue('password', e.target.value)}
          margin="normal"
          required
          id="password"
          fullWidth
          name="password"
          autoFocus
          label="Senha"
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <PasswordInput
          value={watch('databasePassword')}
          onChange={(e) => setValue('databasePassword', e.target.value)}
          margin="normal"
          required
          id="databasePassword"
          fullWidth
          name="databasePassword"
          autoFocus
          label="Senha da conexão com o banco"
          error={!!errors.databasePassword}
          helperText={errors.databasePassword?.message}
        />
      </>
    ),
  };
};
