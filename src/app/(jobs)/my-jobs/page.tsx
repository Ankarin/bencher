import { Button } from '@/components/landing/Button'
import { Suspense } from 'react'
import MyJobsWrapper from '@/app/(jobs)/my-jobs/MyJobsWrapper'

export default async function MyJobs() {
  return (
    <main className={'mx-auto max-w-3xl px-5'}>
      <div className='mt-2 md:flex md:items-center md:justify-between'>
        <div className='min-w-0 flex-1'>
          <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
            My Jobs
          </h2>
        </div>
        <div className='mt-4 flex flex-shrink-0 md:ml-4 md:mt-0'>
          <Button
            color='blue'
            loading={false}
            className=''
            variant='solid'
            href='/add-job'
          >
            New Job
          </Button>
        </div>
      </div>
      <Suspense fallback={<div></div>}>
        <MyJobsWrapper></MyJobsWrapper>
      </Suspense>
    </main>
  )
}
