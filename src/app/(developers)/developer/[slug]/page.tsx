import DevCard from '@/app/(developers)/DevCard';
import CompanyCard from '@/app/(companies)/CompanyCard';
import { getCompanyById, getCompanyData, getDev } from '@/utils/supabase';
import { Developer, Company, ParamsType } from '@/utils/types';

export default async function EditDev(params: ParamsType) {
  const dev: Developer | null = await getDev(params.slug); // Provide a type annotation
  const myCompany: Company | null = await getCompanyData();

  const devCompany: Company | null = dev ? await getCompanyById(dev?.company ?? '') : null;

  const isMine = (): boolean => dev?.company === myCompany?.id;

  return (
    <div className={'mx-auto max-w-3xl p-5'}>
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
