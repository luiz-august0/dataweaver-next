'use client';

import { sessionVerify } from '@/core/auth/services/auth';
import { User } from '@/core/users/types/models';
import { handlerHttpError } from '@/helpers/toast';
import { useLogout } from '@/hooks/use-logout';
import UserForm from '@/shared/profile/components/form/UserForm';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { createContext, Dispatch, SetStateAction, useEffect, useState } from 'react';

type Props = {
  setOpenUserModal: Dispatch<SetStateAction<boolean>>;
  loadingSession: boolean;
  user?: User;
};

export const AuthContext = createContext<Partial<Props>>({});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { logout } = useLogout();
  const router = useRouter();
  const { data, status } = useSession();
  const [user, setUser] = useState<User>();
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const [openUserModal, setOpenUserModal] = useState<boolean>(false);
  const [loadingSession, setLoadingSession] = useState<boolean>(true);

  const loadUser = async () => {
    if (data?.user) {
      setLoadingUser(true);

      setUser(data?.user);

      setLoadingUser(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, [data, openUserModal]);

  const handleSession = async () => {
    try {
      await sessionVerify();

      setLoadingSession(false);
    } catch (error) {
      handlerHttpError(error);
      logout();
    }
  };

  useEffect(() => {
    (async () => {
      setLoadingSession(true);

      if (status == 'authenticated') {
        await handleSession();
      } else if (status == 'unauthenticated') {
        router.replace('/login');
      }
    })();
  }, [status]);

  return (
    <AuthContext.Provider
      value={{
        setOpenUserModal,
        loadingSession,
        user,
      }}
    >
      {children}
      {openUserModal && (
        <UserForm
          loadingUser={loadingUser}
          open={openUserModal}
          setOpen={setOpenUserModal}
          userAuthenticated
          user={user}
        />
      )}
    </AuthContext.Provider>
  );
};
