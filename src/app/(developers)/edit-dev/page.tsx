'use client';
import DevForm from '@/components/app/DevForm';

import { useRouter } from 'next/router';

export default function EditDev() {
  const router = useRouter();
  const devID = router.query.slug;
  return (
    <div className={'mx-auto max-w-5xl p-5'}>
      <DevForm isNew={false} devId={devID}></DevForm>
    </div>
  );

}
