import { ApplyTypeWithDev } from '@/utils/types'

import DevCard from '@/app/(developers)/DevCard'

export default function Candidates({
  applies,
}: {
  applies: ApplyTypeWithDev[]
}) {
  return (
    <div className='mx-auto my-5 grid max-w-3xl gap-3'>
      {applies?.map((apply, key) => (
        <DevCard key={key} developer={apply.developer}></DevCard>
      ))}
    </div>
  )
}
