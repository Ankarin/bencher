'use client'
import ApplyModal from '@/app/(jobs)/(apply)/ApplyModal'

import { useState, createContext } from 'react'
import { Button } from '@/components/landing/Button'
import { ExistingJob, ApplyType, ExistingDeveloper } from '@/utils/types'
import { toast } from 'react-toastify'

import { useRouter } from 'next/navigation'
import Toast from '@/components/app/Toast'

export const ApplyContext = createContext(false)

const makeApplyRequest = async (apply: ApplyType) => {
  const { status } = await fetch('/api/apply', {
    method: 'POST',
    body: JSON.stringify(apply),
  })
  return status
}

export const SelectDevContext = createContext(function (
  _dev: ExistingDeveloper,
  _rate: string
) {})

export default function Apply({ job }: { job: ExistingJob }) {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const selectDev = async (dev: ExistingDeveloper, rate: string) => {
    const apply: ApplyType = {
      developer: dev.id,
      job: job.id,
      rate: rate,
      poster: job.company,
      provider: dev.company,
    }
    const status = await makeApplyRequest(apply)
    console.log(status)
    status === 200
      ? toast.success('Applied successfully')
      : toast.error('Error applying')
    router.refresh()
    setOpen(false)
  }

  return (
    <ApplyContext.Provider value={true}>
      <SelectDevContext.Provider value={selectDev}>
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
      </SelectDevContext.Provider>
    </ApplyContext.Provider>
  )
}
