import NoCompany from '@/app/(companies)/my-company/NoCompany';
import CompanyCard from '@/app/(companies)/CompanyCard';
import NotVerified from '@/app/(companies)/my-company/NotVerified';
import MyCompanyHeader from '@/app/(companies)/my-company/MyCompanyHeader';
import React from 'react';
import { getCompanyData } from '@/utils/supabase';
import { Company } from '@/utils/types';

export const dynamic = 'force-dynamic';
export default async function MyCompany() {
  const company: Company | null = await getCompanyData();

  return (
    <div>
      {company && !company.verified ? <NotVerified></NotVerified> : ''}
      <div className='mx-auto mx-auto max-w-3xl px-5'>
        {!company ? (
          <NoCompany></NoCompany>
        ) : (
          <div>
            {company && <MyCompanyHeader verified={company.verified}></MyCompanyHeader>}
            <CompanyCard company={company} myCompany={true}></CompanyCard>
          </div>
        )}
      </div>
    </div>
  );
}
