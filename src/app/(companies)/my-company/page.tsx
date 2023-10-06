import NoCompany from '@/app/(companies)/my-company/NoCompany';
import Company from '@/app/(companies)/Company';
import NotVerified from '@/app/(companies)/my-company/NotVerified';
import MyCompanyHeader from '@/app/(companies)/my-company/MyCompanyHeader';
import React from 'react';
import { getCompanyData } from '@/utils/supabase';

export const dynamic = 'force-dynamic';
export default async function MyCompany() {

  const company = await getCompanyData();

  return (
    <div>
      {company && !company.verified ? <NotVerified></NotVerified> : ''}
      <div className='mx-auto mx-auto max-w-5xl px-5'>
        {!company ? (
          <NoCompany></NoCompany>
        ) : (
          <div>
            <MyCompanyHeader verified={company.verified}></MyCompanyHeader>
            <Company company={company} myCompany={true}></Company>
          </div>
        )}
      </div>

    </div>
  );
}
