import DevCard from '@/app/(developers)/DevCard';
import CompanyCard from '@/app/(companies)/Company';
import { getCompanyById, getCompanyData, getDev } from '@/utils/supabase';
import { Developer, Company } from '@/utils/types';

export default async function EditDev({ params }) {
  const dev: Developer | null = await getDev(params.slug); // Provide a type annotation
  const myCompany: Company = await getCompanyData();

  const devCompany: Company = dev ? await getCompanyById(dev.company) : null;

  const isMine = (): boolean => dev?.company === myCompany?.id;

  return (
    <div className={'mx-auto max-w-5xl p-5'}>
      {dev && devCompany ? (
        <div className={'grid grid-cols-1 gap-5'}>
          <CompanyCard company={devCompany} myCompany={isMine()}></CompanyCard>
          <DevCard developer={dev} isMine={isMine()}></DevCard>
        </div>
      ) : (
        <p>Developer not found</p>
      )}
    </div>
  );
}
