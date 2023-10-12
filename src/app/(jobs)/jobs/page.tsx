import { getJobs } from '@/utils/supabase'
import JobList from '@/app/(jobs)/JobList'

export default async function Developers() {
  const jobs = await getJobs()

  return (
    <div className={'mx-auto max-w-3xl px-2 md:px-5'}>
      <div className='mt-2 flex items-center justify-between'>
        <div className='min-w-0 flex-1'>
          <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
            Jobs
          </h2>
        </div>
      </div>
      <JobList jobs={jobs}></JobList>
    </div>
  )
}
