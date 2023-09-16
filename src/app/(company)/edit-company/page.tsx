import EditCompanyForm from 'src/app/(company)/edit-company/EditCompanyForm';
import { getCompanyData, getUser, getUserData } from 'src/utils/supabase';
import React from 'react';

export default async function MyCompany() {
  const user = await getUser();
  const userData = await getUserData(user.id);
  const company = userData.company_id
    ? await getCompanyData(userData.company_id)
    : null;

  return (
    <div className='mx-auto max-w-6xl p-5 md:p-10'>
      <EditCompanyForm company={company}></EditCompanyForm>
    </div>
  );
}
