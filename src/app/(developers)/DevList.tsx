import { Developer } from '@/utils/types'
import DevCard from '@/app/(developers)/DevCard'

export default function DevList({
  developers,
  isMine = false,
}: {
  developers: Developer[]
  isMine?: boolean
}) {
  return (
    <div className='mx-auto my-5 grid  max-w-3xl gap-3 md:my-10  '>
      {developers?.map((dev, key) => (
        <DevCard key={key} isMine={isMine} developer={dev}></DevCard>
      ))}
    </div>
  )
}
