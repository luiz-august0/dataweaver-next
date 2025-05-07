import StandardForm from '@/components/customized/FormTypes/StandardForm';
import { FormButton } from '@/components/customized/FormTypes/types/models';
import Input from '@/components/customized/Input/Input';
import PasswordInput from '@/components/customized/PasswordInput/PasswordInput';
import { Button } from '@/components/ui/button';
import { mutateUser } from '@/core/users/services/users';
import { User } from '@/core/users/types/models';
import { successToast } from '@/helpers/toast';
import { MultipartBean } from '@/shared/types/models';
import { yupResolver } from '@hookform/resolvers/yup';
import { Loader2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Dispatch, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { schemaValidation } from './schemaValidation';
import Switch from '@/components/customized/Switch/Switch';

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
    watch,
    register,
    handleSubmit,
    formState: { errors },
    reset,
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

  const handleChangePhoto = (value?: MultipartBean) => {
    setValue('photoMultipart', value);
    setValue('photo', undefined);
  };

  return (
    <FormProvider {...form}>
      <StandardForm
        formButtons={buttons}
        formTitle={userAuthenticated ? 'Editar meu usuário' : user ? `Editar usuário` : 'Novo'}
        handleClose={handleClose}
        open={open}
      >
        {loadingUser ? (
          <div className="flex justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {(userAuthenticated || user?.id) && (
              <div
                className="flex items-end"
                style={{
                  justifyContent: userAuthenticated ? 'flex-end' : 'space-between',
                }}
              >
                {!userAuthenticated && user?.login !== 'admin' && (
                  <Switch
                    label="Ativo"
                    id="user-active-switch"
                    checked={watch('active')}
                    onCheckedChange={(checked) => setValue('active', checked)}
                  />
                )}
                <Button onClick={() => setUpdatePassword(true)} variant={'default'}>
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
              <Input
                {...register('login')}
                required
                id="user-login-text"
                label="Login"
                name="login"
                disabled={user?.login == 'admin'}
                errorMessage={errors.login?.message}
              />
              {(updatePassword || !user) && (
                <PasswordInput
                  {...register('password')}
                  required
                  id="password"
                  name="password"
                  autoFocus
                  label="Senha"
                  errorMessage={errors.password?.message}
                />
              )}
            </div>
          </div>
        )}
      </StandardForm>
    </FormProvider>
  );
}
