import StandardForm from '@/components/customized/FormTypes/StandardForm';
import { FormButton } from '@/components/customized/FormTypes/types/models';
import Input from '@/components/customized/Input/Input';
import PasswordInput from '@/components/customized/PasswordInput/PasswordInput';
import { create, edit } from '@/core/connection/services/connection';
import { Connection } from '@/core/connection/types/models';
import { successToast } from '@/helpers/toast';
import { yupResolver } from '@hookform/resolvers/yup';
import { Dispatch, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import schemaValidation from './schemaValidation';

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
      variant: 'outline',
    },
    {
      id: 'submit',
      title: 'Salvar',
      isSubmit: true,
      color: 'primary',
      onClick: handleSubmit(onSubmit),
      loading: loading,
      variant: 'default',
    },
  ];

  return (
    <FormProvider {...form}>
      <StandardForm
        formButtons={buttons}
        formTitle={connection ? 'Editar Conexão' : 'Nova Conexão'}
        handleClose={handleClose}
        open={open}
      >
        <div className="flex flex-col gap-4">
          <Input
            {...register('host')}
            required
            id="connection-host-text"
            label="Host"
            name="host"
            errorMessage={errors.host?.message}
          />
          <Input
            required
            id="connection-port-text"
            label="Porta"
            name="port"
            type="number"
            value={watch('port')}
            onChange={(e) => {
              clearErrors('port');
              setValue('port', Number(parseFloat(e.target.value).toFixed(0)));
            }}
            errorMessage={errors.port?.message}
          />
          <Input
            {...register('database')}
            required
            id="connection-database-text"
            label="Base"
            name="database"
            errorMessage={errors.database?.message}
          />
          <Input
            {...register('username')}
            required
            id="connection-username-text"
            label="Usuário"
            name="username"
            errorMessage={errors.username?.message}
          />
          <PasswordInput
            {...register('password')}
            required
            id="password"
            name="password"
            label="Senha"
            errorMessage={errors.password?.message}
          />
        </div>
      </StandardForm>
    </FormProvider>
  );
}
