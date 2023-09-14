import { getCompanies } from 'src/utils/supabase';
import Company from 'src/app/(company)/my-company/Company';

export default async function Companies() {
  const companies = await getCompanies();

  return (
    <div className='mx-auto grid max-w-6xl grid-cols-1 gap-10 p-5 md:p-10'>
      {companies.map((item) => (
        <Company key={item.id} company={item}></Company>
      ))}
    </div>
  );
}
