'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status == 'authenticated') {
      router.replace('/');
    }
  }, [status]);

  return children;
}
