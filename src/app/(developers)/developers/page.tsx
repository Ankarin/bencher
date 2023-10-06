import { getDevs } from '@/utils/supabase';
import { Button } from '@/components/landing/Button';
import DevList from '@/app/(developers)/DevList';

export default async function Developers() {
  const developers = await getDevs();

  return (
    <div className={'mx-auto max-w-5xl px-2 md:px-5'}>
      <div className='mt-2 flex items-center justify-between'>
        <div className='min-w-0 flex-1'>
          <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
            Developers
          </h2>
        </div>
        <div className='mt-4 flex flex-shrink-0 md:ml-4 md:mt-0'>
          <Button color='blue' loading={false} className='' variant='solid' href='/add-request'>New request</Button>
        </div>

      </div>
      <DevList developers={developers}></DevList>
    </div>
  );

}
