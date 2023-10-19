'use client'
import { ApplyTypeWithDev, Company } from '@/utils/types'
import { zust } from '@/store'
import DevCard from '@/app/(developers)/DevCard'

export default function ApplyItem({ apply }: { apply: ApplyTypeWithDev }) {
  const zustMyCompany: Company | null = zust((state) => state.myCompany)
  const isMine = zustMyCompany?.id === apply.provider
  console.log(isMine, apply)
  return (
    <div className=' '>
      <DevCard developer={apply.developer} isMine={isMine} />
    </div>
  )
}
