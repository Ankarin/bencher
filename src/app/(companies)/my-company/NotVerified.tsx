import React from 'react';

export default function NotVerified(): React.ReactNode {
  return (<div className='flex justify-center -mt-4  gap-x-6 bg-indigo-600 px-6 py-2.5'>
      <p className='text-sm leading-6  text-white'>
        Your company is not verified yet. To get verified, please
        <a href='https://meetings-eu1.hubspot.com/dmitry-loza' className='text-sm font-semibold leading-6 '>Schedule
          a call <span aria-hidden='true'>→</span>
        </a>
      </p>
    </div>
  );
}
