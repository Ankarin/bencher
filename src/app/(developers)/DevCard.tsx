'use client'
import { ExistingDeveloper } from '@/utils/types'
import { getEngTextFromLevel, getRegion } from '@/utils/options'
import { Tooltip } from 'react-tooltip'
import { Button } from '@/components/landing/Button'
import { supaDownload } from '@/utils/supabaseClient'
import Link from 'next/link'
import React, { useContext } from 'react'
import { ApplyContext } from '@/app/(apply)/(select-dev-and-apply)/Apply'
import SelectDev from '@/app/(apply)/(select-dev-and-apply)/SelectDevBtn'
import { TrashIcon } from '@heroicons/react/24/solid'

export default function DevCard({
  developer,
  isMine = false,
  cancelApply,
}: {
  developer: ExistingDeveloper
  isMine?: boolean
  cancelApply?: () => Promise<void>
}) {
  const features = [
    { title: '', value: developer.category },
    {
      title: '',
      value: `${developer.experience}+${
        Number(developer.experience) === 1 ? ' year' : ' years'
      } of exp`,
    },
    {
      title: '',
      value: `${developer.country}, ${getRegion(developer.country)}`,
    },
    { title: 'English: ', value: `${getEngTextFromLevel(developer.english)} ` },
  ]

  const isApply = useContext(ApplyContext)

  const devCardActions = () => {
    if (cancelApply) {
      return (
        <button
          onClick={cancelApply}
          type='button'
          className='inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          <TrashIcon className=' h-5 w-5' aria-hidden='true' />
          Delete Apply
        </button>
      )
    }

    if (isMine && !isApply) {
      return (
        <Button
          className='h-10'
          loading={false}
          variant='solid'
          color='slate'
          href={`/edit-dev/${developer.id}`}
        >
          Edit
        </Button>
      )
    } else if (isApply && isMine) {
      return <SelectDev developer={developer}></SelectDev>
    }
  }

  return (
    <div className='max-w-[100] rounded-lg bg-white p-2 shadow md:p-4'>
      <div className='flex justify-between'>
        <p className='break-words   font-semibold '>
          <Link href={`/developer/${developer.id}`}>
            <span
              className={
                ' text-base cursor-pointer text-blue-600 hover:text-blue-800 sm:text-lg'
              }
            >
              {developer.title}{' '}
            </span>
          </Link>

          {developer.asap && (
            <>
              <a
                data-tooltip-id='my-tooltip'
                data-tooltip-content='Ready to start ASAP.'
              >
                <span className='mr-1 inline-flex items-center rounded-full bg-red-50 px-1.5 py-0.5 text-xxs font-medium text-red-700 ring-1 ring-inset ring-red-600/10'>
                  ASAP
                </span>
              </a>
              <Tooltip id='my-tooltip' />
            </>
          )}
          {isMine && !developer.public ? (
            <>
              <a
                data-tooltip-id='my-tooltip'
                data-tooltip-content="Hidden and can't be applied for jobs."
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
        <p className='text-base font-bold text-green-700 sm:text-xl'>
          {developer.hourly_rate ? `$${developer.hourly_rate}/hr` : ''}{' '}
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
        {developer.other_languages.map((lang, index) => (
          <span
            key={index}
            className='mr-3 inline-flex items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xxs font-medium text-green-700 ring-1 ring-inset ring-green-600/20'
          >
            {lang}
          </span>
        ))}
      </p>

      <p className={'mb-2'}>
        {developer.skills.map((skill, index) => (
          <span
            key={index}
            className='mr-3 inline-flex items-center rounded-full bg-indigo-50 px-1.5 py-0.5 text-xxs font-medium text-indigo-600 ring-1 ring-inset ring-indigo-600/10'
          >
            {skill}
          </span>
        ))}
      </p>

      <p className='text-sm'>{developer.description}</p>
      <div className={'flex items-center justify-between'}>
        <div className={'pt-2'}>
          {developer.cv.url && (
            <span
              className={
                'cursor-pointer font-semibold text-blue-600 hover:text-blue-800'
              }
              onClick={() => supaDownload(developer.cv.url)}
            >
              Download CV{' '}
            </span>
          )}
        </div>
        {devCardActions()}
      </div>
    </div>
  )
}
