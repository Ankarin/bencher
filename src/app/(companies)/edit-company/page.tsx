import EditCompanyForm from '@/app/(companies)/edit-company/EditCompanyForm';
import { getCompanyData } from '@/utils/supabase';
import React from 'react';

export const dynamic = 'force-dynamic';
export default async function MyCompany() {
  const company = await getCompanyData();
  return (
    <div className='mx-auto max-w-6xl p-5 md:p-10'>
      <EditCompanyForm company={company}></EditCompanyForm>
    </div>
  );
}
