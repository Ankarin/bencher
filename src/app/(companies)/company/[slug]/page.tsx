import React from 'react';
import {
  getCompanyById,
  getDevsByCompany,
  getCompanyData,
} from '@/utils/supabase';
import { Company, Developer, PageProps } from '@/utils/types';
import CompanyCard from '@/app/(companies)/CompanyCard';
import DevList from '@/app/(developers)/DevList';

export const dynamic = 'force-dynamic';
export default async function CompanyPage({ params }: PageProps) {
  const company: Company = await getCompanyById(params.slug);
  const devs: Developer[] = await getDevsByCompany(company?.id ?? '');
  const myCompany: Company | null = await getCompanyData();
  const isMine = (): boolean => company?.id === myCompany?.id;

  return (
    <div className={'mx-auto max-w-3xl px-2 md:px-5'}>
      <CompanyCard company={company} myCompany={isMine()}></CompanyCard>
      <DevList developers={devs} isMine={isMine()}></DevList>
    </div>
  );
}
