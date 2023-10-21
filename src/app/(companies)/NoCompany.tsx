import { Button } from '@/components/landing/Button'
import React from 'react'

export default function Company(): React.ReactNode {
  return (
    <div className='rounder-lg bg-white shadow'>
      <div className='px-4 py-5 sm:p-6'>
        <h3 className='text-base font-medium leading-6 text-gray-900'>
          Add your company
        </h3>
        <div className='mt-2 sm:flex sm:items-start sm:justify-between'>
          <div className='max-w-xl text-sm text-gray-500'>
            <p>
              In order to use the platform you need to add your company
              information.
            </p>
          </div>
          <div className='mt-5 sm:ml-6 sm:mt-0 sm:flex sm:flex-shrink-0 sm:items-center'>
            <Button
              href='/edit-company'
              variant='solid'
              className=''
              loading={false}
              color='blue'
            >
              Create new company
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
