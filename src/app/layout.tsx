'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { RickAndMortyProvider } from '@/contexts/rick-and-morty-context';

const inter = Inter({ subsets: ['latin'] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <RickAndMortyProvider>
        <body className={inter.className}>{children}</body>
      </RickAndMortyProvider>
    </html>
  );
}
