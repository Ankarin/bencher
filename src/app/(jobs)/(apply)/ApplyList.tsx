import { ApplyTypeWithDev } from '@/utils/types'
import ApplyItem from '@/app/(jobs)/(apply)/ApplyItem'

export default function ApplyList({
  applies,
}: {
  applies: ApplyTypeWithDev[]
}) {
  return (
    <div className='mx-auto my-5 grid max-w-3xl gap-3 '>
      {applies?.map((apply, key) => (
        <ApplyItem key={key} apply={apply}></ApplyItem>
      ))}
    </div>
  )
}
