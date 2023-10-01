import { Developer } from '@/utils/types';
import { getRegion } from '@/utils/options';

export default function DevCard({ developer }: { developer: Developer }) {

  const features = {
    category: developer.role,
    experience: developer.experience,
    location: `${developer.country}, ${getRegion(developer.country)}`,
    english: developer.english,
    available: developer.available,
  };


  return <div className='bg-white p-2 md:p-4 shadow rounded-lg max-w-[100]'>
    <div className='flex justify-between'>
      <p
        className='text-lg  max-w-[70%] font-semibold  break-words text-indigo-600'>{developer.title}</p>
      <p
        className='text-base font-bold text-xl text-indigo-600'> {developer.hourly_rate ? `$${developer.hourly_rate}/hr` : ''} </p>
    </div>


    <div className='hidden lg:flex mb-4 mt-2'>
      <p className='max-w-2xl text-sm pr-3 '>Category: <span
        className={'font-bold'}>{developer.role}</span></p>
      <p
        className='max-w-2xl border-l px-3 border-slate-900/40  text-sm'> Experience: <span
        className={'font-bold'}>{developer.experience}+{developer.experience === 1 ? ' year' : ' years'}</span>
      </p>
      <p className='max-w-2xl  border-l px-3 border-slate-900/40 text-sm'>Location: <span
        className={'font-bold'}>{developer.country}, {getRegion(developer.country)}</span></p>
      <p className='max-w-2xl  border-l px-3 border-slate-900/40  text-sm'>English: <span
        className={'font-bold'}>{developer.english}</span></p>
      <p className='max-w-2xl  border-l px-3 border-slate-900/40  text-sm'>Time to start: <span
        className={'font-bold'}>{developer.available}</span>
      </p>
    </div>


    <div className=' lg:hidden mb-4 mt-2'>
      <div className={'flex'}>
        <p className='max-w-2xl text-sm pr-1 '><span
          className={'font-bold'}>{developer.role}</span></p>
        <p
          className='max-w-2xl border-l px-1 border-slate-900/40  text-sm'><span
          className={'font-bold'}>{developer.experience}+{developer.experience === 1 ? ' year' : ' years'} of exp</span>
        </p>
        <p className='max-w-2xl  border-l px-1 border-slate-900/40 text-sm'><span
          className={'font-bold'}>{developer.country}, {getRegion(developer.country)}</span></p>
      </div>
      <div className={'flex'}>


        <p className='max-w-2xl  pr-1   text-sm'>English: <span
          className={'font-bold'}>{developer.english}</span></p>
        <p className='max-w-2xl  border-l px-1 border-slate-900/40  text-sm'>Time to start: <span
          className={'font-bold'}>{developer.available}</span>
        </p>
      </div>
    </div>

    <p className='max-w-2xl   text-sm'>{developer.description}</p>

    <p> и еще: другие языки, пара вариантов, основные скиллы до 5 , дополнительные скилы до 20, кнопка скачать
      резюме</p>
  </div>;
}
