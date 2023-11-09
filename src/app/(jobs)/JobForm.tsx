'use client'
import React, { useEffect, useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import {
  englishLevels,
  categorys,
  skillList,
  howManyHours,
  scopeOptions,
} from '@/utils/options'

import { selectStyleObject } from '@/utils/utils'
import { zust } from '@/store'
import { toast } from 'react-toastify'
import Toast from '@/components/app/Toast'
import { useRouter } from 'next/navigation'
import { Job, Selecter } from '@/utils/types'
import { TrashIcon } from '@heroicons/react/24/solid'
import ConfirmDelete from '@/components/app/Confirm'

const supabase = createClientComponentClient()

export default function JobForm({
  isNew = false,
  job,
}: {
  isNew?: boolean
  job?: Job
}) {
  const [title, setTitle] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [experience, setExperience] = useState<string>('3')
  const [asap, setAsap] = useState<boolean>(true)
  const [english, setEnglish] = useState<string>('')
  const [rate, setRate] = useState<string>('')
  const [otherLanguages, setOtherLanguages] = useState<Selecter[]>([])
  const [mainSkills, setMainSkills] = useState<Selecter[]>([])
  const [description, setDescription] = useState<string>('')
  const [hours, setHours] = useState<string>('')
  const [scope, setScope] = useState<string>('')
  const [disabledSave, setDisabledSave] = useState<boolean>(false)
  const [isPublic, setPublic] = useState<boolean>(true)
  const router = useRouter()

  const [openConfirm, setOpenConfirm] = useState<boolean>(false)

  useEffect(() => {
    if (job) {
      setTitle(job.title)
      setCategory(job.category)
      setExperience(job.experience)
      setAsap(job.asap)
      setEnglish(job.english)
      setRate(job.rate)
      setOtherLanguages(
        job.other_languages.map((item) => {
          return { value: item, label: item }
        })
      )
      setMainSkills(
        job.skills.map((item) => {
          return { value: item, label: item }
        })
      )
      setDescription(job.description)
      setPublic(job.public)
      setScope(job.scope)
      setHours(job.hours)
    }
  }, [job])

  const zustMyCompany = zust((state) => state.myCompany)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleSelectSkills = (val) => {
    if (val.length > 15) {
      return
    }
    setMainSkills(val)
  }

  const supaAddJob = async (newJob: Job) => {
    const { data, error } = await supabase.from('jobs').insert(newJob).select()
    if (error) {
      toast.error('Error adding new job!')
    }
    router.refresh()
    if (data) {
      router.push(`/edit-job/${data[0].id}`)
      toast.success('New job added!')
    }
  }

  const supaEditJob = async (newJob: Job) => {
    const { error } = await supabase
      .from('jobs')
      .update(newJob)
      .eq('id', job?.id)
      .select()
    if (error) {
      toast.error('Error updating job!')
    } else {
      toast.success('Job updated!')
    }
    router.refresh()
  }

  const saveJob = async () => {
    const job: Job = {
      hours,
      scope,
      company: zustMyCompany?.id ?? '',
      title,
      category,
      experience: experience,
      asap,
      english,
      skills: mainSkills.map((item) => item.value),
      other_languages: otherLanguages.map((item) => item.value),
      rate: rate,
      description,
      public: isPublic,
    }
    if (isNew) {
      await supaAddJob(job)
    } else {
      await supaEditJob(job)
    }
  }

  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    setDisabledSave(true)
    e.preventDefault()
    await saveJob()
    setDisabledSave(false)
  }

  const handlePublic = (state: boolean) => {
    // if (state && zustMyCompany.verified) {
    //   return;
    // } else {
    setPublic(state)
    // }
  }

  const confirmDelete = async () => {
    setOpenConfirm(false)
    if (!job) return
    const { error } = await supabase.from('jobs').delete().eq('id', job.id)
    if (error) {
      toast.error('Error deleting job!')
      console.log(error)
      return
    }
    toast.success('Job deleted!')
    router.push('/my-devs')
  }

  return (
    <form onSubmit={save}>
      <Toast />
      <div className='space-y-12'>
        <div className='border-b border-gray-900/10 pb-12'>
          <div className={'items-center justify-between sm:flex'}>
            <h2 className='pb-3 text-2xl font-bold leading-7 text-gray-900 sm:col-span-3 sm:truncate sm:p-0 sm:text-3xl sm:tracking-tight'>
              {isNew ? `Add Job` : `Edit Job`}
            </h2>
          </div>
          <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-3'>
              <label
                htmlFor='username'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Title *
              </label>
              <div className='mt-2 flex rounded-md  ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                <input
                  required
                  maxLength={40}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type='text'
                  name='title'
                  id='title'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </div>

            <div className='sm:col-span-3'>
              <label
                htmlFor='category'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Category *
              </label>
              <select
                required
                id='category'
                name='category'
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value)
                }}
                className='mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
              >
                <option></option>
                {categorys().map((country) => (
                  <option key={country}>{country}</option>
                ))}
              </select>
            </div>
            <div className='sm:col-span-3 '>
              <div>
                <label
                  htmlFor='location'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Ho many hours per week *
                </label>
                <select
                  required
                  id='hours'
                  name='hours'
                  value={hours}
                  onChange={(e) => {
                    setHours(e.target.value)
                  }}
                  className='mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
                >
                  <option></option>
                  {howManyHours().map((item) => (
                    <option key={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className='sm:col-span-3 '>
              <div>
                <label
                  htmlFor='location'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  How long *
                </label>
                <select
                  id='scope'
                  name='scope'
                  value={scope}
                  onChange={(e) => {
                    setScope(e.target.value)
                  }}
                  className='mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
                >
                  <option></option>
                  {scopeOptions().map((item) => (
                    <option key={item.id}>{item.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className='sm:col-span-3 '>
              <div>
                <label
                  htmlFor='location'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Minimum English Level
                </label>
                <select
                  id='english'
                  name='english'
                  value={english}
                  onChange={(e) => {
                    setEnglish(e.target.value)
                  }}
                  className='mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
                >
                  <option></option>
                  {englishLevels().map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className=' sm:col-span-3'>
              <label
                htmlFor='rate'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Maximum rate
              </label>
              <div className='relative mt-2 rounded-md '>
                <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                  <span className='text-gray-500 sm:text-sm'>$</span>
                </div>

                <input
                  onChange={(e) => setRate(e.target.value)}
                  value={rate}
                  type='number'
                  name='rate'
                  id='rate'
                  className={`block w-full rounded-md border-0  py-1.5 pl-7 pr-12 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 [appearance:textfield] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
                  placeholder='0.00'
                  aria-describedby='price-currency'
                />
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
                  <span
                    className='text-gray-500 sm:text-sm'
                    id='price-currency'
                  >
                    USD / Hour
                  </span>
                </div>
              </div>
            </div>

            {/*<div className='mt-2 sm:col-span-3'>*/}
            {/*  <label*/}
            {/*    htmlFor='location'*/}
            {/*    className='block text-sm font-medium leading-6 text-gray-900'*/}
            {/*  >*/}
            {/*    Other Languages (Up to 5)*/}
            {/*  </label>*/}
            {/*  <div>*/}
            {/*    <Select*/}
            {/*      isMulti*/}
            {/*      onChange={handleSelectOtherLanguages}*/}
            {/*      value={otherLanguages}*/}
            {/*      options={languagesOptions}*/}
            {/*      isSearchable={true}*/}
            {/*      isClearable={true}*/}
            {/*      styles={selectStyleObject}*/}
            {/*    />*/}
            {/*  </div>*/}
            {/*</div>*/}

            <div className='mt-2 sm:col-span-3'>
              <label
                htmlFor='location'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Main Skills (Recommended 5, Up to 15) *
              </label>
              <div>
                <CreatableSelect
                  required
                  value={mainSkills}
                  onChange={handleSelectSkills}
                  options={skillList()}
                  isMulti
                  isClearable={true}
                  styles={selectStyleObject}
                />
              </div>
            </div>

            <div className='mt-2 sm:col-span-3'>
              <label
                htmlFor='about'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Minimum {experience} + years of experience
              </label>
              <div className='mt-2'>
                <input
                  id='experience'
                  name='experience'
                  type='range'
                  min='1'
                  max='10'
                  value={experience}
                  onChange={(e) => {
                    setExperience(e.target.value)
                  }}
                  list='markers'
                  className='light h-2  w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700'
                />
              </div>
            </div>

            <div className='col-span-full'>
              <label
                htmlFor='about'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                About
              </label>
              <div className='mt-2'>
                <textarea
                  id='about'
                  name='about'
                  rows={3}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  maxLength={250}
                />
                <span className={'text-sm'}>
                  {description.length} / 250 (Max)
                </span>
              </div>
              <p className='mt-3 text-sm leading-6 text-gray-600'>
                Write a few sentences about the job.
              </p>
            </div>

            <div className={'sm:col-span-3'}>
              <div className='flex items-center gap-x-3'>
                <input
                  id='available'
                  name='available'
                  type='radio'
                  checked={asap}
                  onChange={() => setAsap(true)}
                  className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                />
                <label
                  htmlFor='push-everything'
                  className='block text-sm leading-6 text-gray-900'
                >
                  <span className={'font-semibold'}>ASAP - </span> Need to start
                  ASAP.
                </label>
              </div>
              <div className='flex  items-center gap-x-3'>
                <input
                  id='push-email'
                  name='available'
                  type='radio'
                  checked={!asap}
                  onChange={() => setAsap(false)}
                  className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600/60'
                />
                <label
                  htmlFor='push-email'
                  className='block text-sm  leading-6 text-gray-900'
                >
                  Can start later.
                </label>
              </div>
            </div>
            <div className={'sm:col-span-3'}>
              <div className='flex items-center gap-x-3'>
                <input
                  id='public'
                  name='public'
                  type='radio'
                  checked={isPublic}
                  onChange={() => handlePublic(true)}
                  className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600'
                />
                <label
                  htmlFor='push-everything'
                  className='block text-sm leading-6 text-gray-900'
                >
                  <span className={'font-semibold'}>Public - </span> Visible,
                  others can apply.
                </label>
              </div>
              <div className='flex items-center gap-x-3'>
                <input
                  id='public'
                  name='public'
                  type='radio'
                  checked={!isPublic}
                  onChange={() => handlePublic(false)}
                  className='h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600/60'
                />
                <label
                  htmlFor='push-email'
                  className='block text-sm  leading-6 text-gray-900'
                >
                  <span className={'font-semibold'}>Private - </span> Hidden,
                  others can't apply.
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-6 flex items-center justify-between '>
        <ConfirmDelete
          open={openConfirm}
          setOpen={setOpenConfirm}
          confirmDelete={confirmDelete}
        />
        <div>
          {!isNew && (
            <button
              onClick={() => setOpenConfirm(true)}
              type='button'
              className='inline-flex items-center gap-x-1.5 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              <TrashIcon className=' h-5 w-5' aria-hidden='true' />
              Delete
            </button>
          )}
        </div>
        <div className={'flex  items-center justify-end gap-x-6'}>
          <button
            onClick={() => router.push('/my-jobs')}
            type='button'
            className='text-sm font-medium leading-6 text-gray-900'
          >
            Go Back
          </button>
          <button
            disabled={disabledSave}
            type='submit'
            className='cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Save
          </button>
        </div>
      </div>
    </form>
  )
}
