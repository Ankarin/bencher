'use client';
import DevForm from '@/components/app/DevForm';

export default function AddDev() {
  return (
    <div className={'mx-auto max-w-5xl p-5'}>
      <DevForm isNew={true}></DevForm>
    </div>
  );

}
