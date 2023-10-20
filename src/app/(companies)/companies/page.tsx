import { getCompanies, getCompanyData } from '@/utils/supabase'
import CompanyCard from '@/app/(companies)/CompanyCard'
import { Company } from '@/utils/types'

export const dynamic = 'force-dynamic'
export default async function Companies() {
  const companies = await getCompanies()
  const myCompany = await getCompanyData()

  return (
    <div className={'mx-auto max-w-3xl px-2 md:px-5'}>
      <div className='mt-2 flex items-center justify-between'>
        <div className='min-w-0 flex-1'>
          <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
            Companies
          </h2>
        </div>
        <div className='mt-4 flex flex-shrink-0 md:ml-4 md:mt-0'></div>
      </div>
      <div className={'mx-auto my-5 grid  max-w-3xl gap-3 md:my-10  '}>
        {companies.map((company: Company) => (
          <CompanyCard
            key={company.id}
            company={company}
            isMine={company.id === myCompany?.id}
          ></CompanyCard>
        ))}
      </div>
    </div>
  )
}
