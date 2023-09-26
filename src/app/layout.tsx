import { Inter, Lexend } from 'next/font/google';
import clsx from 'clsx';
import AppHeader from '@/components/app/AppHeader';
import '@/styles/tailwind.css';
import { type Metadata } from 'next';
import React from 'react';
import 'react-tooltip/dist/react-tooltip.css';
import { getUserData, getCompanyData } from '@/utils/supabase';


export const metadata: Metadata = {
  title: {
    template: '%s - BitBencher',
    default: 'BitBencher - Hiring developers made simple',
  },
  description:
    'BitBencher is a marketplace with thousands of vetted developers from European software companies. Work directly wit no fees.',
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
});

export default async function RootLayout({
                                           children,
                                         }: {
  children: React.ReactNode;
}) {


  const userData = await getUserData();
  const companyData = await getCompanyData();


  return (
    <html
      lang='en'
      className={clsx('h-full antialiased', inter.variable, lexend.variable)}
      suppressHydrationWarning
    >
    <body className='relative min-h-full bg-white '>
    <div className='top:0 right:0 left:0 fixed z-50 w-screen'>
      <AppHeader user={userData} company={companyData}></AppHeader>
    </div>

    <div className={'pt-20'}>{children}</div>
    </body>
    </html>
  );
}
