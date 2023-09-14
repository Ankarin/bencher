'use client';
import Link from 'next/link';

import { Button } from '@/components/landing/Button';
import { TextField } from '@/components/landing/Fields';
import { Logo } from '@/components/landing/Logo';
import { SlimLayout } from '@/components/landing/SlimLayout';
import React, { useState } from 'react';

export default function Forgotpass({ searchParams }): React.ReactNode {
  const [email, setEmail] = useState('');

  return (
    <div className='-mt-20'>
      <SlimLayout>
        <div className='flex'>
          <Logo />
        </div>
        <h2 className='mt-20 text-lg font-semibold text-gray-900'>
          Forgot your password ?
        </h2>

        <form
          method='post'
          action='/api/auth/sign-in'
          className='mt-10 grid grid-cols-1 gap-y-8'
        >
          <TextField
            label='Email'
            name='email'
            type='email'
            autoComplete='email'
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
            required
          />
          <div>
            <Button
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
