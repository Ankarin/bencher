'use client'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useRouter, usePathname } from 'next/navigation'

export default function Pagination({
  page,
  totalPages,
}: {
  page: number
  totalPages: number
}) {
  const router = useRouter()
  const pathname = usePathname()
  const changePage = (param: number) => {
    if (param > totalPages || param < 1) return
    const routeSegments = pathname.split('/') // Split the route into segments
    routeSegments[routeSegments.length - 1] = String(param) // Update the last segment
    const newRoute = routeSegments.join('/')
    router.push(newRoute)
  }

  if (totalPages === 1) return <></>
  else {
    return (
      <div className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6'>
        <div className='flex flex-1 items-center justify-between'>
          <div>
            <p className='text-lg text-gray-700'>
              Page <span className='font-medium'> {page} </span>
              out of
              <span className='font-medium'> {totalPages}</span>
            </p>
          </div>
          <div>
            <nav
              className='isolate inline-flex -space-x-px rounded-md shadow-sm'
              aria-label='Pagination'
            >
              <a
                onClick={() => changePage(page - 1)}
                className=' relative inline-flex cursor-pointer items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
              >
                <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
              </a>

              <a
                onClick={() => changePage(page + 1)}
                className=' relative inline-flex cursor-pointer items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
              >
                <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
              </a>
            </nav>
          </div>
        </div>
      </div>
    )
  }
}
