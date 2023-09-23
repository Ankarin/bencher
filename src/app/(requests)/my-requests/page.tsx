import { Button } from '@/components/landing/Button';

export default function MyRequests() {
  return <main className={'mx-auto max-w-5xl px-5'}>
    <div className='mt-2 md:flex md:items-center md:justify-between'>
      <div className='min-w-0 flex-1'>
        <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
          My Requests
        </h2>
      </div>
      <div className='mt-4 flex flex-shrink-0 md:ml-4 md:mt-0'>
        <Button color='blue' loading={false} className='' variant='solid' href='/add-request'>New Request</Button>
      </div>
    </div>
  </main>;
}
