import Link from 'next/link';

import { Button } from '@/components/landing/Button';
import { TextField } from '@/components/landing/Fields';
import { Logo } from '@/components/landing/Logo';
import { SlimLayout } from '@/components/landing/SlimLayout';
import React from 'react';
import { SearchParams } from '@/utils/types';

export const metadata = {
  title: 'Forgot Password',
};

export default function Forgotpass({ searchParams }: { searchParams: SearchParams }): React.ReactNode {
  return (
    <div className='-mt-20'>
      <SlimLayout>
        <div className='flex'>
          <Logo />
        </div>
        <h2 className='mt-20 text-lg font-medium text-gray-900'>
          Forgot your password ?
        </h2>

        <form
          method='post'
          action='/api/auth/forgot'
          className='mt-10 grid grid-cols-1 gap-y-8'
        >
          <TextField
            className={''}
            label='Email'
            name='email'
            type='email'
            autoComplete='email'
            required
          />
          <div>
            <Button
              loading={false}
              type='submit'
              variant='solid'
              color='blue'
              className='w-full'
            >
              <span>
                Send reset link<span aria-hidden='true'>&rarr;</span>
              </span>
            </Button>
            <p className='mt-5 text-sm text-gray-700'>
              Don’t have an account?{' '}
              <Link
                href='/register'
                className='font-medium text-blue-600 hover:underline'
              >
                Sign up.
              </Link>
            </p>
          </div>
          <p className='text-red-600'>{searchParams.error}</p>
        </form>
      </SlimLayout>
    </div>
  );
}
