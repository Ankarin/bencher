'use client'
import { Job } from '@/utils/types'
import Link from 'next/link'
import { Tooltip } from 'react-tooltip'
import { Button } from '@/components/landing/Button'

export default function JobCard({
  job,
  isMine = false,
}: {
  job: Job
  isMine?: boolean
}) {
  const features = [
    { title: '', value: job.category },
    {
      title: '',
      value: `${job.experience}+${
        Number(job.experience) === 1 ? ' year' : ' years'
      } of exp`,
    },

    { title: 'English: ', value: `${job.english}+ ` },
  ]

  return (
    <div className='max-w-[100] rounded-lg bg-white p-2 shadow md:p-4'>
      <div className='flex justify-between'>
        <p className='break-words text-lg  font-semibold '>
          <Link href={`/job/${job.id}`}>
            <span
              className={
                'mr-2 cursor-pointer text-blue-600 hover:text-blue-800'
              }
            >
              {job.title}{' '}
            </span>
          </Link>

          {job.asap && (
            <>
              <a
                data-tooltip-id='my-tooltip'
                data-tooltip-content='Looking to hire within 2 days.'
              >
                <span className='mr-2 inline-flex items-center rounded-full bg-red-50 px-1.5 py-0.5 text-xxs font-medium text-red-700 ring-1 ring-inset ring-red-600/10'>
                  ASAP
                </span>
              </a>
              <Tooltip id='my-tooltip' />
            </>
          )}
          {isMine && !job.public ? (
            <>
              <a
                data-tooltip-id='my-tooltip'
                data-tooltip-content="Hidden, others can't apply."
              >
                <span className='inline-flex items-center rounded-full bg-yellow-50 px-1.5 py-0.5 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20'>
                  {' '}
                  Private
                </span>
              </a>
              <Tooltip id='my-tooltip' />
            </>
          ) : (
            ''
          )}
        </p>
        <p className='text-base text-xl font-bold text-green-700'>
          {' '}
          {job.rate ? `Up to $${job.rate}/hr` : ''}{' '}
        </p>
      </div>

      <p className={'mb-2 mt-1 leading-6'}>
        {features.map((feature, index) => (
          <span
            key={index}
            className='inline-block max-w-2xl  text-xxs md:text-xs'
          >
            {feature.title}
            <span className={'font-semibold'}>{feature.value} </span>
            {feature.title !== 'English: ' && (
              <span className={'ml-1'}>- &nbsp;</span>
            )}
          </span>
        ))}
      </p>

      <p className={'mb-2'}>
        {job.skills.map((skill, index) => (
          <span
            key={index}
            className='mr-2 inline-flex items-center rounded-full bg-indigo-50 px-1.5 py-0.5 text-xxs font-medium text-indigo-600 ring-1 ring-inset ring-indigo-600/10'
          >
            {skill}
          </span>
        ))}
      </p>

      <p className='text-sm'>{job.description}</p>
      <div className={'mt-3 flex items-center justify-end'}>
        {isMine ? (
          <Button
            className='h-10'
            loading={false}
            variant='solid'
            color='blue'
            href={`/edit-job/${job.id}`}
          >
            Edit
          </Button>
        ) : (
          <Button
            className='h-10'
            loading={false}
            variant='solid'
            color='blue'
            href={`/job/${job.id}`}
          >
            Apply
          </Button>
        )}
      </div>
    </div>
  )
}
