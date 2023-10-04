'use client';
import DevForm from '@/components/app/DevForm';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function EditDev() {
  const router = useRouter();
  console.log(1, router);
  useEffect(() => {
    console.log(1, router);

  }, []);

  return (
    <div className={'mx-auto max-w-5xl p-5'}>
      asd
      {/*<DevForm isNew={false}></DevForm>*/}
    </div>
  );
}
