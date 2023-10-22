import { getCompanies, getCompanyData } from '@/utils/supabase'

import { Company } from '@/utils/types'
import CompanyCard from '@/app/(companies)/CompanyCard'

export default async function CompaniesList() {
  const companies = await getCompanies()
  const myCompany = await getCompanyData()
  return (
    <div className={'mx-auto my-5 grid  max-w-3xl gap-3 md:my-10  '}>
      {companies.map((company: Company) => (
        <CompanyCard
          key={company.id}
          company={company}
          isMine={company.id === myCompany?.id}
        ></CompanyCard>
      ))}
    </div>
  )
}
