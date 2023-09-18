import { Button } from '@/components/landing/Button';
import { TextField } from '@/components/landing/Fields';
import { Logo } from '@/components/landing/Logo';
import { SlimLayout } from '@/components/landing/SlimLayout';
import React from 'react';

export const metadata = {
  title: 'Reset Password',
};

export default function Login({ searchParams }): React.ReactNode {
  return (
    <div className='-mt-20'>
      <SlimLayout>
        <div className='flex'>
          <Logo />
        </div>
        <h2 className='mt-20 text-lg font-semibold text-gray-900'>
          Setup a new password
        </h2>
        <form
          method='post'
          action='/api/auth/reset'
          className='mt-10 grid grid-cols-1 gap-y-8'
        >
          <TextField
            label='New Password'
            name='password'
            type='password'
            autoComplete='current-password'
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
                Setup <span aria-hidden='true'>&rarr;</span>
              </span>
            </Button>
          </div>
          <p className='text-red-600'>{searchParams.error}</p>
        </form>
      </SlimLayout>
    </div>
  );
}
