'use client';
import { Developer } from '@/utils/types';
import { getRegion } from '@/utils/options';


export default function DevCard({ developer }: { developer: Developer }) {

  return <div className='bg-white p-2 md:p-4 shadow rounded-lg max-w-[100]'>
    <div className='flex justify-between'>
      <p
        className='text-lg  max-w-[70%] font-semibold  break-words text-indigo-600'>{developer.title}</p>
      <p
        className='text-base font-bold text-xl text-indigo-600'> {developer.hourly_rate ? `$${developer.hourly_rate}/hr` : ''} </p>
    </div>

    <p className={'leading-relaxed'}>
      <span className='max-w-2xl inline-block text-sm  border-r pr-2 mr-2 border-slate-900/20'>
       Category: <span className={'font-semibold'}>{developer.category}</span>
      </span>
      <span
        className='max-w-2xl inline-block   border-r pr-2 mr-2  border-slate-900/20 text-sm'>
        Experience: <span
        className={'font-semibold'}>{developer.experience}+{developer.experience === 1 ? ' year' : ' years'}</span>


      </span>
      <span className='max-w-2xl inline-block   border-r pr-2 mr-2 border-slate-900/20  text-sm'>Location: <span
        className={'font-semibold'}>{developer.country}, {getRegion(developer.country)}</span>
      </span>
      <span className='max-w-2xl inline-block text-sm'>English: <span
        className={'font-semibold'}>{developer.english}</span></span>
    </p>
    <p className='max-w-2xl  text-sm'>{developer.description}</p>

    <p> и еще: другие языки, пара вариантов, основные скиллы до 5 , дополнительные скилы до 20, кнопка скачать
      резюме</p>
  </div>;
}
