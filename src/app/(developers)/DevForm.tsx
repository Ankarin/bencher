'use client'

import { uuid } from '@supabase/supabase-js/dist/main/lib/helpers'
import { XMarkIcon, TrashIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import {
  countries,
  englishLevels,
  languages,
  categorys,
  getRegion,
  skillList,
} from '@/utils/options'

import { selectStyleObject } from '@/utils/utils'
import { zust } from 'src/store'
import { toast } from 'react-toastify'
import Toast from '@/components/app/Toast'
import { useRouter } from 'next/navigation'
import { supaDownload } from '@/utils/supabaseClient'
import { Developer, Selecter } from '@/utils/types'
import ConfirmDelete from '@/components/app/Confirm'

const supabase = createClientComponentClient()

export default function DevForm({
  isNew = false,
  dev,
}: {
  isNew: boolean
  dev: Developer | null // Add null to the type
}) {
  const [title, setTitle] = useState<string>('') // Add string type
  const [category, setCategory] = useState<string>('') // Add string type
  const [experience, setExperience] = useState<string>('3') // Add string type
  const [location, setLocation] = useState<string>('') // Add string type
  const [asap, setAsap] = useState<boolean>(false) // Add boolean type
  const [english, setEnglish] = useState<string>('') // Add string type
  const [rate, setRate] = useState<string>('') // Add string type
  const [otherLanguages, setOtherLanguages] = useState<Selecter[]>([]) // Add Selecter[] type
  const [mainSkills, setMainSkills] = useState<Selecter[]>([]) // Add Selecter[] type
  const [description, setDescription] = useState<string>('') // Add string type
  const [uploading, setUploading] = useState<boolean>(false) // Add boolean type
  const [cv, setCv] = useState<{
    url: string
    filename: string
  }>({
    url: '',
    filename: '',
  }) // Add object type
  const [disabledSave, setDisabledSave] = useState<boolean>(false) // Add boolean type
  const [isPublic, setPublic] = useState<boolean>(true) // Add boolean type
  const [file, setFile] = useState<File | null>(null) // Add File type
  const router = useRouter()

  const [openConfirm, setOpenConfirm] = useState<boolean>(false) // Add boolean type

  useEffect(() => {
    if (dev) {
      setTitle(dev.title)
      setCategory(dev.category)
      setExperience(dev.experience)
      setLocation(dev.country)
      setAsap(dev.asap)
      setEnglish(dev.english)
      setRate(dev.hourly_rate)
      setOtherLanguages(
        dev.other_languages.map((item) => {
          return { value: item, label: item }
        })
      )

      setMainSkills(
        dev.skills.map((item) => {
          return { value: item, label: item }
        })
      )
      setDescription(dev.description)
      setCv({ url: dev.cv.url, filename: dev.cv.name })
      setPublic(dev.public)
    }
  }, [dev])

  const zustMyCompany = zust((state) => state.myCompany)

  const languagesOptions = languages()
    .map((item) => {
      return { value: item, label: item }
    })
    .filter((item) => !otherLanguages.includes(item))

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleSelectOtherLanguages = (val) => {
    console.log(val)
    if (val.length > 5) {
      return
    }
    setOtherLanguages(val)
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleSelectSkills = (val) => {
    if (val.length > 15) {
      return
    }
    setMainSkills(val)
  }

  async function loadCV(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) {
      throw new Error('You must select pdf to upload.')
    }
    const file = e.target.files[0]
    setFile(file)
    const path = uuid()
    setCv({
      url: `cv/${path}`,
      filename: file.name,
    })
  }

  const supaAddDev = async (developer: Developer) => {
    const { data, error } = await supabase
      .from('developers')
      .insert(developer)
      .select()
    if (error) {
      toast.error('Error adding developer!')
    }
    router.refresh()
    if (data) {
      router.push(`/edit-dev/${data[0].id}`)
      toast.success('Added new developer!')
    }
  }

  const supaEditDev = async (developer: Developer) => {
    const { error } = await supabase
      .from('developers')
      .update(developer)
      .eq('id', dev?.id)
      .select()
    if (error) {
      toast.error('Error updating developer!')
      return
    } else {
      toast.success('Updated developer!')
    }
    router.refresh()
  }

  const saveDeveloper = async () => {
    const developer: Developer = {
      company: zustMyCompany ? zustMyCompany.id : '',
      title,
      category,
      experience: experience,
      country: location,
      region: getRegion(location),
      asap,
      english,
      skills: mainSkills.map((item) => item.value),
      other_languages: otherLanguages.map((item) => item.value),
      hourly_rate: rate,
      description,
      cv: { url: cv.url, name: cv.filename },
      public: isPublic,
    }
    if (isNew) {
      await supaAddDev(developer)
    } else {
      await supaEditDev(developer)
    }
  }

  async function uploadCv() {
    if (dev && dev.cv.url === cv.url) return
    if (!file) return

    if (!cv.url && dev?.cv.url) {
      await supabase.storage.from('bitbencher/').remove([dev.cv.url])
    }

    try {
      setUploading(true)
      const { error: uploadError } = await supabase.storage
        .from('bitbencher/')
        .upload(cv.url, file)
      if (uploadError) {
        toast.error('Error uploading CV !')
      }
    } catch (error) {
      console.log(error)
      return
    } finally {
      setUploading(false)
    }
  }

  const save = async (e: React.FormEvent<HTMLFormElement>) => {
    setDisabledSave(true)
    e.preventDefault()
    await uploadCv()
    await saveDeveloper()
    setDisabledSave(false)
  }

  const handlePublic = (state: boolean) => {
    setPublic(state)
  }

  const confirmDelete = async () => {
    setOpenConfirm(false)
    const { error } = await supabase
      .from('developers')
      .delete()
      .eq('id', dev?.id)
    if (error) {
      toast.error('Error deleting developer!')
      console.log(error)
      return
    }
    toast.success('Developer deleted!')
    router.push('/my-devs')
  }

  return (
    <form onSubmit={save}>
      <Toast />

      <div className='space-y-12'>
        <div className='border-b border-gray-900/10 pb-12'>
          <div className={'items-center justify-between sm:flex'}>
            <h2 className='pb-3 text-2xl font-bold leading-7 text-gray-900 sm:col-span-3 sm:truncate sm:p-0 sm:text-3xl sm:tracking-tight'>
              {isNew ? `Add Developer` : `Edit Developer`}
            </h2>
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
                  <span className={'font-semibold'}>Public - </span> Visible to
                  others and can be applied for jobs.
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
                  <span className={'font-semibold'}>Private - </span> Hidden and
                  can't be applied for jobs.
                </label>
              </div>
            </div>
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
            <div className='sm:col-span-3'>
              <label
                htmlFor='location'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Location *
              </label>
              <select
                required
                id='location'
                name='location'
                value={`${location}`}
                onChange={(e) => {
                  setLocation(e.target.value)
                }}
                className='mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
              >
                <option></option>
                {countries().map((country) => (
                  <option key={country}>{country}</option>
                ))}
              </select>
              <p className='absolute mt-1 text-sm leading-6 text-indigo-600'>
                {getRegion(location)}
              </p>
            </div>
            <div className='sm:col-span-3 '>
              <div>
                <label
                  htmlFor='location'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  English Level *
                </label>
                <select
                  required
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
            <div className='mt-2 sm:col-span-3'>
              <label
                htmlFor='rate'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Rate
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
              <p className='absolute mt-1 text-sm leading-6 text-indigo-600'>
                Recommended
              </p>
            </div>
            <div className='mt-2 sm:col-span-3'>
              <label
                htmlFor='about'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                {experience} + years of experience
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
            <div className='mt-2 sm:col-span-3'>
              <label
                htmlFor='location'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Other Languages (Up to 5)
              </label>
              <div>
                <Select
                  isMulti
                  onChange={handleSelectOtherLanguages}
                  value={otherLanguages}
                  options={languagesOptions}
                  isSearchable={true}
                  isClearable={true}
                  styles={selectStyleObject}
                />
              </div>
            </div>
            <div className='mt-2 sm:col-span-3'>
              <label
                htmlFor='location'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Main Skills (Up to 15)
              </label>
              <div>
                <CreatableSelect
                  value={mainSkills}
                  onChange={handleSelectSkills}
                  options={skillList()}
                  isMulti
                  isClearable={true}
                  styles={selectStyleObject}
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
                Write a few sentences about the candidate.
              </p>
            </div>
            <div className='sm:col-span-3'>
              <label
                htmlFor='cover-photo'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Detailed CV
              </label>
              {!cv.url ? (
                <div>
                  <label
                    htmlFor='file-upload'
                    className='relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
                  >
                    <span>Upload </span>
                    <input
                      id='file-upload'
                      name='file-upload'
                      type='file'
                      accept='.pdf'
                      className='sr-only'
                      onChange={loadCV}
                      disabled={uploading}
                    />
                  </label>
                  <span>{file ? file.name : ''}</span>
                </div>
              ) : (
                <div className={'flex'}>
                  <span
                    className={'cursor-pointer text-indigo-600'}
                    onClick={() => supaDownload(cv.url)}
                  >
                    {cv.filename}{' '}
                  </span>
                  <XMarkIcon
                    onClick={() => {
                      setFile(null)
                      setCv({ url: '', filename: '' })
                    }}
                    className='ml-5 h-6 w-6 cursor-pointer text-red-500'
                  ></XMarkIcon>
                </div>
              )}
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
                  <span className={'font-semibold'}>ASAP - </span> Ready to
                  start within 2 days.
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
                  Ready to start soon.
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmDelete
        open={openConfirm}
        setOpen={setOpenConfirm}
        confirmDelete={confirmDelete}
      />

      <div className='mt-6 flex items-center justify-between '>
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
            onClick={() => router.push('/my-devs')}
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
