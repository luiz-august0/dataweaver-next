'use client';

import { sessionVerify } from '@/core/auth/services/auth';
import { createTheme, ThemeProvider } from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const router = useRouter();
  const { status } = useSession();

  let theme = createTheme();

  theme = createTheme(theme, {
    palette: {
      primary: theme.palette.augmentColor({
        color: {
          main: '#202020',
        },
      }),
      secondary: theme.palette.augmentColor({
        color: {
          main: '#202020',
        },
      }),
    },
  });

  useEffect(() => {
    const handleSession = async () => {
      await sessionVerify().then(() => {
        router.replace('/');
      });
    };

    if (status == 'authenticated') {
      handleSession();
    }
  }, [status, router]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
