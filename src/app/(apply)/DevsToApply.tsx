import { ExistingDeveloper } from '@/utils/types'

import { useContext } from 'react'
import { zust } from '@/store'
import { AppliedDevsContext } from '@/app/(apply)/Apply'
import DevCard from '@/app/(developers)/DevCard'

export default function DevsToApply() {
  const developers: ExistingDeveloper[] = zust((state) => state.myDevelopers)
  const applied = useContext(AppliedDevsContext)
  const mapApply = applied.map((item) => item.developer.id)
  const filtered = developers
    .filter((item) => item.public)
    .filter((item) => !mapApply.includes(item.id))
  return (
    <div className={'mx-auto  px-2 sm:-mt-5'}>
      <div className='mx-auto my-5 grid  max-w-3xl gap-3 md:my-10  '>
        {filtered?.map((dev, key) => (
          <DevCard key={key} isMine={true} developer={dev}></DevCard>
        ))}
      </div>
    </div>
  )
}
