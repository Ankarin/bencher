'use client'
import ApplyModal from '@/app/(jobs)/job/[slug]/ApplyModal'

import { useState, createContext } from 'react'
import { Button } from '@/components/landing/Button'
import { Developer, Job } from '@/utils/types'

export const ApplyContext = createContext(false)

export const SelectDevContext = createContext(function (
  _dev: Developer,
  _rate: string
) {})

export default function Apply({ job }: { job: Job }) {
  const [open, setOpen] = useState(false)

  const selectDev = (dev: Developer, rate: string): void => {
    console.log(dev)
    console.log(rate)
    console.log(job)
    // const apply: ApplyType = {
    //   developer: dev.id,
    //   job: job.id,
    // }
    setOpen(false)
  }

  return (
    <ApplyContext.Provider value={true}>
      <SelectDevContext.Provider value={selectDev}>
        <>
          <Button
            color='blue'
            loading={false}
            className=''
            variant='solid'
            onClick={() => setOpen(true)}
          >
            Select developers to apply
          </Button>

          <ApplyModal open={open} close={() => setOpen(false)}></ApplyModal>
        </>
      </SelectDevContext.Provider>
    </ApplyContext.Provider>
  )
}
