'use client';
import { Developer } from '@/utils/types';
import { getRegion } from '@/utils/options';
import { Tooltip } from 'react-tooltip';

export default function DevCard({ developer }: { developer: Developer }) {

  const features = [
    { title: 'Category: ', value: developer.category },
    { title: 'Experience: ', value: `${developer.experience}+${developer.experience === 1 ? ' year' : ' years'}` },
    { title: 'Location: ', value: `${developer.country}, ${getRegion(developer.country)}` },
    { title: 'English: ', value: developer.english },
  ];


  return <div className='bg-white p-2 md:p-4 shadow rounded-lg max-w-[100]'>
    <div className='flex justify-between'>
      <p
        className='text-lg font-semibold  break-words '><span
        className={'mr-3 cursor-pointer text-blue-600 hover:text-blue-800'}>{developer.title}</span>
        {developer.asap &&
          <>
            <a data-tooltip-id='my-tooltip' data-tooltip-content='Ready to start within 2 days.'>
              <span
                className='inline-flex items-center rounded-full bg-red-50 px-1.5 py-0.5 text-xxs font-medium text-red-700 ring-1 ring-inset ring-red-600/10'>ASAP</span>
            </a>
            <Tooltip id='my-tooltip' />

          </>
        }
      </p>

      <p
        className='text-base font-bold text-xl text-blue-600'> {developer.hourly_rate ? `$${developer.hourly_rate}/hr` : ''} </p>
    </div>

    <p className={'leading-6 mb-2 mt-1'}>
      {
        features.map((feature, index) =>
          <span key={index} className='max-w-2xl inline-block  text-xxs md:text-xs'>
            {feature.title}
            <span className={'font-semibold'}>{feature.value}  </span>
            {feature.title !== 'English: ' && <span className={'ml-1'}>- &nbsp;</span>}
      </span>)
      }
    </p>

    <p className={'mb-2'}>
      {developer.skills.map((skill, index) =>
        <span key={index}
              className='mr-3 inline-flex items-center rounded-full bg-indigo-50 px-2 py-0.5 text-xxs font-medium text-indigo-600 ring-1 ring-inset ring-indigo-600/10'>
        {skill}
      </span>)}


    </p>

    <p className='text-sm'>{developer.description}</p>
  </div>;
}
