import React from 'react';

export default function NotVerified(): React.ReactNode {
  return (
    <div className='bg-white shadow sm:rounded-lg'>
      <div className='px-4 py-5 sm:p-6'>
        <h3 className='text-base font-semibold leading-6 text-gray-900'>
          Please wait to get verified
        </h3>
        <div className='mt-2 sm:flex sm:items-start sm:justify-between'>
          <div className='max-w-xl text-sm text-gray-500'>
            <p> Right now your company profile is hidden from others.</p>
            <p>
              We want to make sure that only trustworthy companies are on our
              platform.
            </p>
            <p>Usually, it takes less than 24 hours.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
