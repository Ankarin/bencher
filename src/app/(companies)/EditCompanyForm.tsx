'use client'
import React, { useEffect, useState } from 'react'
import { createCompany, updateCompany } from '@/utils/supabaseClient'
import { Button } from '@/components/landing/Button'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { PhotoIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { countries, getRegion } from '@/utils/options'
import { Company } from '@/utils/types'
import Toast from '@/components/app/Toast'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const supabase = createClientComponentClient()
export default function CompanyEdit({
  company,
}: {
  company: Company | null
}): React.ReactNode {
  const router = useRouter()
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  //
  const [name, setName] = useState('')
  const [website, setWebsite] = useState('')

  const [size, setSize] = useState('')
  const [location, setLocation] = useState('')
  const [logo_url, setLogoUrl] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (company) {
      setName(company.name)
      setWebsite(company.website)
      setSize(company.size)
      setLocation(company.country)
      setLogoUrl(company.logo_url)
      setDescription(company.description)
    }
  }, [company])

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const saveForm = async (e) => {
    e.preventDefault()
    setLoading(true)
    const newCompany: Company = {
      name,
      website,
      size,
      country: location,
      region: getRegion(location),
      description,
      logo_url,
      verified: true,
    }
    if (!company) {
      await createCompany(newCompany)
      toast.success('Company added!')
      router.push('/my-company')
    } else {
      if (!company) {
        return
      }
      const id = company.id
      const updatedCompany = {
        id: id,
        ...newCompany,
      }
      await updateCompany(updatedCompany)
      toast.success('Your company updated!')
    }
    setLoading(false)
  }

  async function uploadLogo(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('bitbencher/logos')
        .upload(filePath, file)

      if (uploadError) {
        alert(uploadError)
        return
      }
      setLogoUrl(`logos/${fileName}`)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <Toast />
      <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
        My Company
      </h2>
      <form onSubmit={saveForm}>
        <div className='space-y-12'>
          <div className=' border-gray-900/10 pb-12'>
            <p className='mt-1 text-sm leading-6 text-gray-600'>
              This information will be displayed publicly.
            </p>
            <div className={'mt-10 flex justify-center sm:justify-start'}>
              {logo_url ? (
                <div>
                  <label
                    htmlFor='cover-photo'
                    className='pb-10 text-sm font-medium leading-6 text-gray-900'
                  >
                    Company Logo (100 x 100 recommended)
                  </label>
                  <Image
                    src={logo_url}
                    alt={'logo'}
                    width='100'
                    height='100'
                  ></Image>
                  <label
                    htmlFor='file-upload'
                    className='relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
                  >
                    <span>Change</span>
                    <input
                      id='file-upload'
                      name='file-upload'
                      type='file'
                      accept='.png, .jpg, .jpeg, .svg'
                      className='sr-only'
                      onChange={uploadLogo}
                      disabled={uploading}
                    />
                  </label>
                </div>
              ) : (
                <div>
                  <label
                    htmlFor='cover-photo'
                    className=' text-sm font-medium leading-6 text-gray-900'
                  >
                    Company Logo (100 x 100 recommended)
                  </label>
                  <div className='mt-2 flex h-44 w-44 justify-center rounded-lg border border-dashed border-gray-900/25  py-5'>
                    <div className='text-center'>
                      <PhotoIcon
                        className='mx-auto h-12 w-12 text-gray-300'
                        aria-hidden='true'
                      />
                      <div className='mt-4 flex justify-center text-sm leading-6 text-gray-600'>
                        <label
                          htmlFor='file-upload'
                          className='relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
                        >
                          <span>Upload a file</span>
                          <input
                            id='file-upload'
                            name='file-upload'
                            type='file'
                            accept='.png, .jpg, .jpeg, .svg'
                            className='sr-only'
                            onChange={uploadLogo}
                            disabled={uploading}
                          />
                        </label>
                      </div>
                      <p className='text-xs leading-5 text-gray-600'>
                        PNG, JPG, JPEG, SVG{' '}
                      </p>
                      <p className='text-xs leading-5 text-gray-600'>
                        up to 10 mb{' '}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='first-name'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Company Name *
                </label>
                <div className='mt-2'>
                  <input
                    required
                    type='text'
                    name='name'
                    id='name'
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                    }}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
              <div className='sm:col-span-3'>
                <label
                  htmlFor='last-name'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Company Website (https://website.example) *
                </label>
                <div className='mt-2'>
                  <input
                    required
                    type='url'
                    name='website'
                    id='website'
                    value={website}
                    onChange={(e) => {
                      setWebsite(e.target.value)
                    }}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
            </div>
            <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
              <div className='sm:col-span-3'>
                <div className='mt-2'>
                  <label
                    htmlFor='location'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Company Size *
                  </label>
                  <select
                    required
                    id='size'
                    name='size'
                    className='mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    value={size}
                    onChange={(e) => {
                      setSize(e.target.value)
                    }}
                  >
                    <option></option>
                    <option>2 - 10</option>
                    <option>10 - 49</option>
                    <option>50 - 249</option>
                    <option>250 - 1000</option>
                    <option>1000+</option>
                  </select>
                </div>
              </div>
              <div className='sm:col-span-3'>
                <div className='mt-2'>
                  <label
                    htmlFor='location'
                    className='block text-sm font-medium leading-6 text-gray-900'
                  >
                    Primary Location *
                  </label>
                  <select
                    required
                    id='location'
                    name='location'
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value)
                    }}
                    className='mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  >
                    <option></option>
                    {countries().map((country) => (
                      <option key={country}>{country}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className='mt-10 sm:col-span-3'>
              <label
                htmlFor='about'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Description *
              </label>
              <div className='mt-2'>
                <textarea
                  required
                  id='description'
                  name='description'
                  rows={5}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value)
                  }}
                  maxLength={300}
                />
                <span className={'text-sm'}>
                  <span> {description.length} / 300 (Max)</span>
                </span>
              </div>
              <p className='mt-3 text-sm leading-6 text-gray-600'>
                Write a few sentences about your company to highlight your
                expertise.
              </p>
            </div>
          </div>
        </div>

        <div className='mt-6 flex items-center justify-end gap-x-6'>
          <button
            type='button'
            className='text-sm font-medium leading-6 text-gray-900'
          >
            Go Back
          </button>
          <Button
            variant='solid'
            type='submit'
            className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            loading={loading}
            color='blue'
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}
