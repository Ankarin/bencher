'use client'
import ApplyModal from '@/app/(jobs)/job/[slug]/ApplyModal'

import { useState, createContext } from 'react'
import { Button } from '@/components/landing/Button'
import { Developer } from '@/utils/types'

export const ApplyContext = createContext(false)

export const SelectDevContext = createContext(null)

export default function Apply() {
  const [open, setOpen] = useState(false)

  const selectDev = (dev: Developer): void => {
    console.log(dev)
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
            Select developers to apply.
          </Button>

          <ApplyModal open={open} close={() => setOpen(false)}></ApplyModal>
        </>
      </SelectDevContext.Provider>
    </ApplyContext.Provider>
  )
}
