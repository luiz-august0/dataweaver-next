import StandardForm from '@/components/FormTypes/StandardForm';
import { FormButton } from '@/components/FormTypes/types/models';
import { Connection } from '@/core/connection/types/models';
import { successToast } from '@/helpers/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dispatch, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import schemaValidation from './schemaValidation';
import { create, edit } from '@/core/connection/services/connection';
import { TextField } from '@mui/material';
import PasswordInput from '@/components/PasswordInput/PasswordInput';

type Props = {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  connection?: Connection;
  onSubmitForm?: (data: Connection) => void;
};

export default function ConnectionForm({ open, setOpen, connection, onSubmitForm }: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<Connection>({
    resolver: yupResolver(schemaValidation),
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

  useEffect(() => {
    if (open) {
      if (connection) {
        reset(connection);
      } else {
        reset(undefined);
      }
    }
  }, [connection, form, open]);

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = async (data: Connection) => {
    setLoading(true);

    await (connection ? edit : create)(data)
      .then((data) => {
        successToast('Conexão de base de dados salva com sucesso!');
        setLoading(false);
        handleClose();
        onSubmitForm?.(data as Connection);
      })
      .catch(() => setLoading(false));
  };

  const buttons: FormButton[] = [
    {
      id: 'cancel',
      title: 'Cancelar',
      color: 'primary',
      onClick: handleClose,
      variant: 'outlined',
    },
    {
      id: 'submit',
      title: 'Salvar',
      isSubmit: true,
      color: 'primary',
      onClick: handleSubmit(onSubmit),
      loading: loading,
      variant: 'contained',
    },
  ];

  return (
    <FormProvider {...form}>
      <StandardForm
        formButtons={buttons}
        formTitle={connection ? 'Editar Conexão' : 'Nova Conexão'}
        handleClose={handleClose}
        maxWidth={'md'}
        open={open}
      >
        <div className="flex flex-col mt-4 gap-4 items-start">
          <TextField
            {...register('host')}
            required
            fullWidth
            id="connection-host-text"
            label="Host"
            name="host"
            error={!!errors.host}
            helperText={errors.host?.message}
          />
          <TextField
            required
            fullWidth
            id="connection-port-text"
            label="Porta"
            name="port"
            type="number"
            value={watch('port')}
            onChange={(e) => {
              clearErrors('port');
              setValue('port', Number(parseFloat(e.target.value).toFixed(0)));
            }}
            error={!!errors.port}
            helperText={errors.port?.message}
          />
          <TextField
            {...register('database')}
            required
            fullWidth
            id="connection-database-text"
            label="Base"
            name="database"
            error={!!errors.database}
            helperText={errors.database?.message}
          />
          <TextField
            {...register('username')}
            required
            fullWidth
            id="connection-username-text"
            label="Usuário"
            name="username"
            error={!!errors.username}
            helperText={errors.username?.message}
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
        </div>
      </StandardForm>
    </FormProvider>
  );
}
