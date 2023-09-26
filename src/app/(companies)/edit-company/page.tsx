import EditCompanyForm from '@/app/(companies)/edit-company/EditCompanyForm';
import { getCompanyData, getUserData } from 'src/utils/supabase';
import React from 'react';

export const dynamic = 'force-dynamic';
export default async function MyCompany() {
  const userData = await getUserData();
  const company = userData.company_id
    ? await getCompanyData()
    : null;

  return (
    <div className='mx-auto max-w-6xl p-5 md:p-10'>
      <EditCompanyForm company={company}></EditCompanyForm>
    </div>
  );
}
