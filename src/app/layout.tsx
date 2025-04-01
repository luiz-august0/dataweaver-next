import NextSessionProvider from '@/core/auth/providers/NextSessionProvider';
import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const sans = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Data Weaver',
  description: 'Data Weaver',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sans.className}>
        <NextSessionProvider>
          <Toaster richColors position="bottom-left" />
          {children}
        </NextSessionProvider>
      </body>
    </html>
  );
}
