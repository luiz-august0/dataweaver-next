import NextSessionProvider from '@/core/auth/providers/NextSessionProvider';
import type { Metadata } from 'next';
import { Inter as FontInter } from 'next/font/google';

import { Toaster } from 'sonner';
import './globals.css';
import { ThemeProvider } from '@/providers/ThemeProvider';

const fontInter = FontInter({
  subsets: ['latin'],
  variable: '--font-sans',
});

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontInter.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NextSessionProvider>
            <Toaster richColors position="bottom-left" />
            {children}
          </NextSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
