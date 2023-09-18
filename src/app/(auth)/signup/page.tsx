import { Button } from '@/components/landing/Button';
import { Logo } from '@/components/landing/Logo';
import { SlimLayout } from '@/components/landing/SlimLayout';
import React from 'react';

export const metadata = {
  title: 'Confirm Registration',
};

export default function SignupRedirect({ searchParams }): React.ReactNode {
  return (
    <div className={'-mt-20'}>
      <SlimLayout>
        <div className='flex'>
          <Logo />
        </div>
        <Content type={searchParams.res}></Content>
      </SlimLayout>
    </div>
  );
}

function Content({ type }): React.ReactNode {
  return type === 'exists' ? (
    <div>
      <h2 className='mt-10 text-lg font-semibold text-gray-900'>
        User with email you provided is already exists.
      </h2>
      <br />
      <Button loading={false} href='/login' variant='solid' color='blue' className='w-full'>
        <span>
          Sign In <span aria-hidden='true'></span>
        </span>
      </Button>
    </div>
  ) : type === 'confirm' ? (
    <div>
      <h2 className='mt-10 text-lg font-semibold text-gray-900'>
        Check your email to confirm registration.
      </h2>
      <br />
      <Button loading={false} href='/' variant='solid' color='blue' className='w-full'>
        <span>
          Go Back <span aria-hidden='true'></span>
        </span>
      </Button>
    </div>
  ) : type === 'verified' ? (
    <div>
      <h2 className='mt-10 text-lg font-semibold text-gray-900'>
        Thank you for completing registration, you can sign in now!
      </h2>
      <br />
      <Button href='/login' loading={false} variant='solid' color='blue' className='w-full'>
        <span>
          Sign In<span aria-hidden='true'></span>
        </span>
      </Button>
    </div>
  ) : type === 'forgot' ? (
    <div>
      <h2 className='mt-10 text-lg font-semibold text-gray-900'>
        Check your email, we've sent you a link to reset your password.
      </h2>
      <br />
      <Button href='/' loading={false} variant='solid' color='blue' className='w-full'>
        <span>
          Go Back <span aria-hidden='true'></span>
        </span>
      </Button>
    </div>
  ) : (
    <div>
      <h2 className='mt-10 text-lg font-semibold text-gray-900'>
        Sorry, something went wrong
      </h2>
      <br />
      <Button href='/' loading={false} variant='solid' color='blue' className='w-full'>
        <span>
          Go Back <span aria-hidden='true'></span>
        </span>
      </Button>
    </div>
  );
}
