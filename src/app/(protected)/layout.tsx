'use client';

import { SidebarProvider } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';
import { AuthContext, AuthProvider } from '@/providers/AuthProvider';
import { Loader2 } from 'lucide-react';
import { ReactNode, useContext } from 'react';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';

interface Props {
  children: ReactNode;
}

function RenderLayout({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();
  const { loadingSession } = useContext(AuthContext);

  if (loadingSession) {
    return (
      <div className="fixed flex flex-col w-screen h-screen bg-[#00000080] items-center justify-center gap-2.5">
        <Loader2 className="h-11 w-11 animate-spin text-primary" />
        <h1 className="text-lg">Carregando, aguarde...</h1>
      </div>
    );
  }

  return (
    <div className={`flex w-full ${isMobile && 'flex-col'}`}>
      <Sidebar />
      {isMobile && <Topbar />}
      <main className="flex-1 bg-background  px-2">{children}</main>
    </div>
  );
}

export default function Layout({ children }: Props) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <RenderLayout>{children}</RenderLayout>
      </SidebarProvider>
    </AuthProvider>
  );
}
