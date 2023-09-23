'use client';
import NoCompany from '@/app/(companies)/my-company/NoCompany';
import Company from '@/app/(companies)/my-company/Company';
import NotVerified from '@/app/(companies)/my-company/NotVerified';
import MyCompanyHeader from '@/app/(companies)/my-company/MyCompanyHeader';
import React from 'react';
import { zust } from '@/store';

export const dynamic = 'force-dynamic';
export default function MyCompany() {

  const company = zust(state => state.myCompany);
  return (
    <div className='mx-auto max-w-6xl p-5 md:p-10'>
      {!company ? (
        <NoCompany></NoCompany>
      ) : company?.verified ? (
        <div>
          <MyCompanyHeader verified={true}></MyCompanyHeader>
          <Company company={company} myCompany={true}></Company>
        </div>
      ) : (
        <div>
          <MyCompanyHeader verified={false}></MyCompanyHeader>
          <NotVerified></NotVerified>
        </div>
      )}
    </div>
  );
}
