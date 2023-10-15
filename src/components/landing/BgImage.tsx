'use client';
import Image from 'next/image';
import backgroundImage from '@/images/background-faqs.jpg';

export default function BgImage() {

  return <Image
    className='absolute left-1/2 top-0 max-w-none -translate-y-1/4 translate-x-[-30%]'
    src={backgroundImage}
    alt=''
    width={1558}
    height={946}
    loader={({ src }) => src}
  />;
}