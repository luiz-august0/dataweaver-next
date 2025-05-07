import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export const useLogout = () => {
  const router = useRouter();

  const logout = async () => {
    await signOut({ redirect: false });
    router.replace('/login');
  };

  return { logout };
};
