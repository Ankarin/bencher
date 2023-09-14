'use client';
import { Button } from '@/components/landing/Button';
import Image from 'next/image';
import React, { useEffect } from 'react';
import {
  UserGroupIcon,
  MapPinIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';

export default function Company({ company, myCompany }): React.ReactNode {
  useEffect(() => {
    console.log(company);
  }, []);

  const features = [
    {
      data: `${company.average_rate} / h`,
      icon: CurrencyDollarIcon,
    },
    {
      data: company.size,
      icon: UserGroupIcon,
    },
    {
      data: company.location,
      icon: MapPinIcon,
    },

    // {
    //     data: `${company.founding_year} `,
    //     icon: FlagIcon
    // },
  ];

  return (
    <div className='bg-white p-4 shadow  sm:rounded-lg md:p-5 '>
      <div className='flex'>
        <Image
          className={'h-12 w-12 md:h-16 md:w-16'}
          src={company.logo_url}
          alt='image'
          height={100}
          width={100}
        ></Image>

        <div className={'flex w-full items-center justify-between pl-4'}>
          <p className='text-2xl font-bold '>{company.name}</p>
          <div className={' hidden md:flex '}>
            {features.map((item) => (
              <div className={'flex font-bold md:mr-8 '} key={item.data}>
                <item.icon className={'h-6 w-6 text-indigo-600'}></item.icon>
                <span className={'ml-1'}>{item.data}</span>
              </div>
            ))}

            <a
              href={company.website}
              target={'_blank'}
              className='whitespace-nowrap font-bold text-indigo-600 hover:text-blue-600'
            >
              Website
            </a>
          </div>
        </div>
      </div>
      <div className={'mt-5 grid grid-cols-2 gap-2 md:hidden'}>
        {features.map((item) => (
          <div className={`flex font-bold md:hidden`} key={item.data}>
            <item.icon className={'h-5 w-5 text-indigo-600'}></item.icon>
            <span className={'ml-1'}>{item.data}</span>
          </div>
        ))}

        <div className={'flex'}>
          <a
            href={company.website}
            target={'_blank'}
            className='whitespace-nowrap font-bold text-indigo-600 hover:text-blue-600'
          >
            Website
          </a>
        </div>
      </div>

      <p className='mt-3 w-full border-t border-gray-200 pt-3 text-base'>
        {company.description}
      </p>

      <div className={'mt-1 flex items-center justify-between'}>
        <Link
          href={'/'}
          target={'_blank'}
          className='whitespace-nowrap font-bold text-indigo-600 hover:text-blue-600'
        >
          Details
        </Link>
        {myCompany ? '' : <Button color={'blue'}>Message</Button>}
      </div>
    </div>
  );
}
