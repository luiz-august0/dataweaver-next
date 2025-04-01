import StandardForm from '@/components/FormTypes/StandardForm';
import { FormButton } from '@/components/FormTypes/types/models';
import PasswordInput from '@/components/PasswordInput/PasswordInput';
import { mutateUser } from '@/core/users/services/users';
import { User } from '@/core/users/types/models';
import { successToast } from '@/helpers/toast';
import { MultipartBean } from '@/shared/types/models';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, CircularProgress, FormControlLabel, Switch, TextField } from '@mui/material';
import { useSession } from 'next-auth/react';
import { Dispatch, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { schemaValidation } from './schemaValidation';

type Props = {
  user?: User;
  userAuthenticated?: boolean;
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  onSubmitForm?: () => void;
  loadingUser?: boolean;
};

export default function UserForm({ user, userAuthenticated, open, setOpen, onSubmitForm, loadingUser }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [updatePassword, setUpdatePassword] = useState<boolean>(false);
  const { update, data } = useSession();

  const form = useForm<User>({
    defaultValues: {
      active: true,
      login: '',
      password: '',
      photoMultipart: undefined,
      photo: undefined,
    },
    resolver: yupResolver(schemaValidation(updatePassword || !user)),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = form;

  useEffect(() => {
    if (user) {
      reset({
        active: user.active,
        id: user.id,
        login: user?.login,
        password: undefined,
        photo: user?.photo,
      });
    }
  }, [user]);

  const handleClose = () => {
    setOpen(false);
  };

  const updateSessionUser = async (user: User) => {
    update({
      ...data,
      user: {
        ...data?.user,
        login: user.login,
        photo: user.photo ?? '',
      },
    });
  };

  const onSubmit = async (data: User) => {
    setLoading(true);

    await mutateUser(data, userAuthenticated ?? false)
      .then((res: User) => {
        if (userAuthenticated) {
          updateSessionUser(res);
        }

        setUpdatePassword(false);
        successToast('Usuário salvo com sucesso!');
        setLoading(false);
        handleClose();
        onSubmitForm?.();
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

  const handleChangePhoto = (value?: MultipartBean) => {
    setValue('photoMultipart', value);
    setValue('photo', undefined);
  };

  return (
    <FormProvider {...form}>
      <StandardForm
        formButtons={buttons}
        formTitle={userAuthenticated ? 'Editar meu usuário' : user ? `Usuário #${user.id}` : 'Novo'}
        handleClose={handleClose}
        open={open}
      >
        {loadingUser ? (
          <div className="flex justify-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="flex flex-col mt-4 gap-4">
            {(userAuthenticated || user?.id) && (
              <div
                className="flex items-center"
                style={{
                  justifyContent: userAuthenticated ? 'flex-end' : 'space-between',
                }}
              >
                {!userAuthenticated && user?.login !== 'admin' && (
                  <FormControlLabel
                    sx={{ margin: '0', marginBottom: '16px' }}
                    value="top"
                    control={
                      <Switch
                        checked={watch('active')}
                        onChange={() => setValue('active', !watch('active'))}
                        name="active"
                        color="primary"
                        id="user-active-switch"
                      />
                    }
                    label="Ativo"
                    labelPlacement="top"
                  />
                )}
                <Button onClick={() => setUpdatePassword(true)} variant={'outlined'} color={'primary'}>
                  Alterar senha
                </Button>
              </div>
            )}
            <div className="flex flex-col gap-4">
              {/* <FormControlLabel
                sx={{
                  margin: "0",
                  marginBottom: "16px",
                  justifyContent: "center",
                  width: "100%",
                }}
                value="top"
                control={
                  <AvatarEditor
                    imageUrl={watch("photo") ?? watch("photoMultipart")?.file}
                    onChange={(value) => handleChangePhoto(value)}
                    onRemove={() => handleChangePhoto(undefined)}
                  />
                }
                label="Foto de perfil"
                labelPlacement="top"
              /> */}
              <TextField
                {...register('login')}
                required
                fullWidth
                id="user-login-text"
                label="Login"
                name="login"
                disabled={user?.login == 'admin'}
                error={!!errors.login}
                helperText={errors.login?.message}
              />
              {(updatePassword || !user) && (
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
              )}
            </div>
          </div>
        )}
      </StandardForm>
    </FormProvider>
  );
}
