import { getCompanies } from '@/utils/supabase';
import Company from '@/app/(companies)/Company';

export const dynamic = 'force-dynamic';
export default async function Companies() {
  const companies = await getCompanies();

  return (
    <div className='mx-auto grid max-w-6xl grid-cols-1 gap-3 p-5 md:p-10'>
      {companies.map((item) => (
        <Company key={item.id} company={item} myCompany={false}></Company>
      ))}
    </div>
  );
}
