import NoCompany from 'src/app/(company)/my-company/NoCompany';
import Company from 'src/app/(company)/my-company/Company';
import NotVerified from 'src/app/(company)/my-company/NotVerified';
import { getCompanyData, getUser, getUserData } from 'src/utils/supabase';
import MyCompanyHeader from 'src/app/(company)/my-company/MyCompanyHeader';
import React from 'react';

// @ts-ignore
export default async function MyCompany(): Promise<React.ReactNode> {
  const user = await getUser();
  const userData = await getUserData(user.id);

  const company = userData.company_id
    ? await getCompanyData(userData.company_id)
    : null;
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
