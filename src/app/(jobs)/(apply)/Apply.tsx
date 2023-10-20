'use client'
import ApplyModal from '@/app/(jobs)/(apply)/ApplyModal'
import { ApplyTypeWithDev } from '@/utils/types'
import { useState, createContext } from 'react'
import { Button } from '@/components/landing/Button'
import { ExistingJob, ApplyType, ExistingDeveloper } from '@/utils/types'
import { toast } from 'react-toastify'

import { useRouter } from 'next/navigation'
import Toast from '@/components/app/Toast'

const makeApplyRequest = async (apply: ApplyType) => {
  const { status } = await fetch('/api/apply', {
    method: 'POST',
    body: JSON.stringify(apply),
  })
  return status
}
export const ApplyContext = createContext(false)

export const AppliedDevsContext = createContext<ApplyTypeWithDev[] | []>([])
export const SelectDevContext = createContext(function (
  _dev: ExistingDeveloper
) {})

export default function Apply({
  job,
  applies,
}: {
  job: ExistingJob
  applies?: ApplyTypeWithDev[]
}) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const selectDev = async (dev: ExistingDeveloper) => {
    const apply: ApplyType = {
      developer: dev.id,
      job: job.id,
      poster: job.company,
      provider: dev.company,
    }
    const status = await makeApplyRequest(apply)
    status === 200
      ? toast.success('Applied successfully')
      : toast.error('Error applying')
    router.refresh()
    setOpen(false)
  }

  return (
    <ApplyContext.Provider value={true}>
      <SelectDevContext.Provider value={selectDev}>
        <AppliedDevsContext.Provider value={applies ?? []}>
          <>
            <Toast></Toast>
            <Button
              color='blue'
              loading={false}
              className=''
              variant='solid'
              onClick={() => setOpen(true)}
            >
              Apply
            </Button>

            <ApplyModal open={open} close={() => setOpen(false)}></ApplyModal>
          </>
        </AppliedDevsContext.Provider>
      </SelectDevContext.Provider>
    </ApplyContext.Provider>
  )
}
