import Link from 'next/link';

import { Button } from '@/components/landing/Button';
import { SelectField, TextField } from '@/components/landing/Fields';
import { Logo } from '@/components/landing/Logo';
import { SlimLayout } from '@/components/landing/SlimLayout';
import React from 'react';

export const metadata = {
  title: 'Sign Up',
};

export default function Register(): React.ReactNode {
  return (
    <div className='-mt-20'>
      <SlimLayout>
        <div className='flex'>
          <Logo />
        </div>
        <h2 className='mt-10 text-lg font-semibold text-gray-900'>
          Get started for free
        </h2>
        <p className='mt-2 text-sm text-gray-700'>
          Already registered?{' '}
          <Link
            href='/login'
            className='font-medium text-blue-600 hover:underline'
          >
            Sign in
          </Link>{' '}
          to your account.
        </p>
        <form
          action='/api/auth/sign-up'
          method='post'
          className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2'
        >
          <TextField
            label='First name'
            name='firstName'
            type='text'
            autoComplete='given-name'
            required
          />
          <TextField
            label='Last name'
            name='lastName'
            type='text'
            autoComplete='family-name'
            required
          />
          {/* <TextField */}
          {/*    className="col-span-full" */}
          {/*    label="Company name" */}
          {/*    name="company" */}
          {/*    type="text" */}
          {/*    autoComplete="company" */}
          {/*    required */}
          {/* /> */}
          <TextField
            className='col-span-full'
            label='Email address'
            name='email'
            type='email'
            autoComplete='email'
            required
          />
          <TextField
            className='col-span-full'
            label='Password'
            name='password'
            type='password'
            minLength='6'
            autoComplete='new-password'
            required
          />
          <SelectField
            className='col-span-full'
            label='How are you going to use BitBencher?'
            name='type'
          >
            <option>I want to find developers.</option>
            <option>I want to find and offer developers.</option>
          </SelectField>

          <div className='col-span-full'>
            <div className='relative flex items-start'>
              <div className='flex h-6 items-center'>
                <input
                  required
                  id='comments'
                  aria-describedby='comments-description'
                  name='comments'
                  type='checkbox'
                  className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                />
              </div>
              <div className='ml-3 text-sm leading-6'>
                <label htmlFor='comments' className='font-medium text-gray-900'>
                  I agree
                </label>{' '}
                <span id='comments-description' className='text-gray-500'>
                  <span className='sr-only'> </span> to BitBencher's{' '}
                  <Link href={'/terms'} target={'_blank'}>
                    <span className={'text-blue'}>Terms & Conditions</span>
                  </Link>
                  ,{' '}
                  <Link href={'/privacy'} target={'_blank'}>
                    <span className={'text-anchor-blue'}>Privacy</span>
                  </Link>{' '}
                  and{' '}
                  <Link href={'/cookies'} target={'_blank'}>
                    <span className={'text-blue'}>Cookies</span>
                  </Link>{' '}
                  policies.
                </span>
              </div>
            </div>
            <br />

            <Button
              type='submit'
              variant='solid'
              color='blue'
              className='w-full'
            >
              <span>
                Sign up <span aria-hidden='true'>&rarr;</span>
              </span>
            </Button>
          </div>
        </form>
      </SlimLayout>
    </div>
  );
}
