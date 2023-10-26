import { ApplyTypeWithDev } from '@/utils/types'
import MyCandidate from '@/app/(apply)/MyCandidate'

export default function MyCandidates({
  applies,
}: {
  applies: ApplyTypeWithDev[]
}) {
  return (
    <div className='mx-auto my-5 grid max-w-3xl gap-3 '>
      {applies?.map((apply, key) => (
        <MyCandidate key={key} apply={apply}></MyCandidate>
      ))}
    </div>
  )
}
