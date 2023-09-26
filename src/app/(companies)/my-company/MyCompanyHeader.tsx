import { Button } from '@/components/landing/Button';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import React from 'react';

export default function MyCompanyHeader({ verified }): React.ReactNode {
  return (
    <div className='mt-2 mb-10 flex min-w-0 items-center justify-between'>
      <h2 className='flex  text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
        My Company
        {verified ? (
          <CheckCircleIcon
            className='ml-5 h-8 w-8 text-indigo-500 md:mt-2'
            aria-hidden='true'
          />
        ) : (
          ''
        )}
      </h2>

      <div className=' flex md:ml-4 '>
        <Button className='' variant='solid' href='/edit-company' loading={false} color='blue'>
          {' '}
          Edit{' '}
        </Button>
      </div>
    </div>
  );
}
