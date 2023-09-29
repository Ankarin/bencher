import { Developer } from '@/utils/types';
import { getRegion } from '@/utils/options';

export default function DevCard({ developer }: Developer) {

  return <div className='bg-white p-2 md:p4 shadow rounded-lg max-w-[100]'>
    <div className='flex justify-between'>
      <p
        className='text-lg  max-w-[70%] font-semibold  break-words text-indigo-600'>{developer.title}</p>
      <p
        className='text-base font-bold text-xl text-indigo-600'> {developer.hourly_rate ? `$${developer.hourly_rate}/hr` : ''} </p>
    </div>
    <div className='flex '>
      <p className='max-w-2xl text-sm'>{developer.role}</p>
      <p
        className='max-w-2xl  ml-2  text-sm'>{developer.experience}+{developer.experience === 1 ? 'year' : 'years'} of
        exp
      </p>
      <p className='max-w-2xl  ml-2 text-sm'>{developer.country}, {getRegion(developer.country)}</p>
      <p className='max-w-2xl  ml-2 text-sm'>English: {developer.english}</p>
      <p className='max-w-2xl  ml-2 text-sm'>Time to start: {developer.available}</p>
    </div>
    <p className='max-w-2xl   text-sm'>{developer.description}</p>

    <p> и еще: другие языки, пара вариантов, основные скиллы до 5 , дополнительные скилы до 20, кнопка скачать
      резюме</p>
  </div>;
}
