'use client';

import MenuSidebar from '@/components/MenuSidebar/MenuSidebar';
import { sessionVerify } from '@/core/auth/services/auth';
import { User } from '@/core/users/types/models';
import { handlerHttpError } from '@/helpers/toast';
import UserForm from '@/shared/profile/components/form/UserForm';
import { CircularProgress, createTheme, Stack, ThemeProvider, Typography } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const router = useRouter();
  const { data, status } = useSession();
  const [user, setUser] = useState<User>();
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const [openUserModal, setOpenUserModal] = useState<boolean>(false);

  useEffect(() => {
    const handleSession = async () => {
      try {
        await sessionVerify();
      } catch (error) {
        handlerHttpError(error);
        await signOut({ redirect: false });
        router.replace('/login');
      }
    };

    if (status == 'authenticated') {
      handleSession();
    } else if (status == 'unauthenticated') {
      router.replace('/login');
    }
  }, [status, router]);

  const loadUser = async () => {
    if (openUserModal && data?.user) {
      setLoadingUser(true);

      setUser(data?.user);

      setLoadingUser(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, [data, openUserModal]);

  let theme = createTheme();

  theme = createTheme(theme, {
    palette: {
      primary: theme.palette.augmentColor({
        color: {
          main: data?.user?.primaryColor ?? '#202020',
        },
      }),
      secondary: theme.palette.augmentColor({
        color: {
          main: data?.user?.secondaryColor ?? '#202020',
        },
      }),
      error: theme.palette.augmentColor({
        color: {
          main: 'rgb(180, 35, 24)',
        },
      }),
      success: theme.palette.augmentColor({
        color: {
          main: 'rgb(2, 122, 72)',
        },
      }),
    },
  });

  if (!status || status == 'loading') {
    return (
      <Stack
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(15px)',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          gap: '10px',
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <CircularProgress sx={{ color: '#202020' }} />
        <Typography fontSize={18}>Carregando, aguarde...</Typography>
      </Stack>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="flex max-md:flex-col">
        <MenuSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} setOpenUserModal={setOpenUserModal} />
        <div className="h-screen w-full md:pr-6 md:pl-6 md:ml-20 pb-10 overflow-auto">{children}</div>
        {openUserModal && (
          <UserForm
            loadingUser={loadingUser}
            open={openUserModal}
            setOpen={setOpenUserModal}
            userAuthenticated
            user={user}
          />
        )}
      </div>
    </ThemeProvider>
  );
}
