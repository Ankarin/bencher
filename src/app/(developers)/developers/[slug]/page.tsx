import { Button } from '@/components/landing/Button'

import Devs from '../Devs'
import Pagination from '@/components/Pagination'
import { countPages } from '@/utils/supabase'
import { PageProps } from '@/utils/types'

// export const revalidate = 60
export default async function Developers({ params }: PageProps) {
  const count: number = await countPages('developers')
  const page: number = Number(params.slug)

  return (
    <div className={'mx-auto max-w-3xl px-2 md:px-5'}>
      <div className='mt-2 flex items-center justify-between'>
        <div className='min-w-0 flex-1'>
          <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
            Developers
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
            New request
          </Button>
        </div>
      </div>

      <Devs page={page}></Devs>
      <Pagination totalPages={count} page={page}></Pagination>
    </div>
  )
}
