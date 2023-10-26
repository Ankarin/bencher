import JobsWrapper from '@/app/(jobs)/jobs/JobsWrapper'
import { PageProps } from '@/utils/types'
import { countPages } from '@/utils/supabase'
import Pagination from '@/components/Pagination'

// export const revalidate = 60
export default async function Jobs({ params }: PageProps) {
  const count: number = await countPages('jobs')
  const page: number = Number(params.slug)
  return (
    <div className={'mx-auto max-w-3xl px-2 md:px-5'}>
      <div className='mt-2 flex items-center justify-between'>
        <div className='min-w-0 flex-1'>
          <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
            Jobs
          </h2>
        </div>
      </div>
      <JobsWrapper page={page}></JobsWrapper>
      <Pagination totalPages={count} page={page}></Pagination>
    </div>
  )
}
