import { Company, ExistingDeveloper } from '@/utils/types'
import DevCard from '@/app/(developers)/DevCard'
import { getCompanyData } from '@/utils/supabase'

export default async function DevList({
  developers,
  isMine,
}: {
  developers: ExistingDeveloper[]
  isMine?: boolean
}) {
  const myCompany: Company | null = await getCompanyData()
  return (
    <div className='mx-auto my-5 grid  max-w-3xl gap-3 md:my-10  '>
      {developers?.map((dev, key) => (
        <DevCard
          key={key}
          isMine={dev.company === myCompany?.id || isMine}
          developer={dev}
        ></DevCard>
      ))}
    </div>
  )
}
