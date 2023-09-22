'use client';
// import { Button } from '@/components/landing/Button';
import { PhotoIcon, InformationCircleIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import Select from 'react-tailwindcss-select';
import { countries, availableOptions, englishLevels, languages } from '@/utils/options';
import { disableArrowsNumber } from '@/utils/tailwindDefaults';
import { Tooltip } from 'react-tooltip';

interface devFormProps {
  isNew?: boolean; // 👈️ marked optional
}


export default function DevForm({ isNew = false }: devFormProps) {
  const [experience, setExperience] = useState('3');
  const [location, setLocation] = useState('');
  const [available, setAvailable] = useState('');
  const [english, setEnglish] = useState('');
  const [otherLanguages, setOtherLanguages] = useState(null);


  const languagesOptions = languages().map(item => {
    return { value: item, label: item };
  });

  const handleSelect = (val) => {
    setOtherLanguages(val);
  };


  console.log(isNew);
  return (
    <form>
      <div className='space-y-12'>
        <div className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base font-semibold leading-7 text-gray-900'>Developer Profile</h2>
          <p className='mt-2 text-sm leading-6 text-gray-600'>
            This profile is linked to your company, it will be public when you allow, make sure to keep private
            information that would let others
            contact your developer directly to avoid solicitation.
          </p>
          <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-3'>
              <label htmlFor='username' className='block text-sm font-medium leading-6 text-gray-900'>
                Title *
              </label>
              <div
                className='flex mt-2 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                <input
                  type='text'
                  name='name'
                  id='name'
                  autoComplete='name'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
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
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                }}
                className='mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
              >
                <option></option>
                {countries().map((country) => (
                  <option key={country}>{country}</option>
                ))}
              </select>
            </div>
            <div className='sm:col-span-3'>
              <div className='mt-2'>
                <label
                  htmlFor='location'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >

                  Available *
                </label>
                <select
                  required
                  id='available'
                  name='available'
                  value={available}
                  onChange={(e) => {
                    setAvailable(e.target.value);
                  }}
                  className='mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
                >
                  <option></option>
                  {availableOptions().map((country) => (
                    <option key={country}>{country}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className='sm:col-span-3'>
              <div className='mt-2 '>
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
                    setEnglish(e.target.value);
                  }}
                  className='mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
                >
                  <option></option>
                  {englishLevels().map((item) => (
                    <option key={item.level}>{item.text}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className='sm:col-span-3'>
              <label
                htmlFor='location'
                className='block text-sm font-medium leading-6 text-gray-900'
              >

                Other Languages
              </label>
              <div className={'mt-2'}>
                <Select
                  value={otherLanguages}
                  onChange={handleSelect}
                  options={languagesOptions}
                  primaryColor='blue'
                  isMultiple={true}
                  isSearchable={true}
                  isClearable={true}
                  classNames={{
                    menuButton: () => 'rounded-md border-0  flex border-0 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6',
                  }}
                />
              </div>
            </div>
            <div className='sm:col-span-3'>
              <label htmlFor='about' className='block text-sm font-medium leading-6 text-gray-900'>
                {experience} +
                years of experience
              </label>
              <div className='mt-2'>


                <input id='experience' name='experience' type='range' min='1' max='10' value={experience}
                       onChange={(e) => {
                         setExperience(e.target.value);
                       }}
                       list='markers'
                       className='w-full light  h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700' />
              </div>
            </div>

            <div className='sm:col-span-3'>
              <label htmlFor='rate' className='block text-sm font-medium leading-6 text-gray-900'>
                Rate
              </label>
              <div className='relative mt-2 rounded-md shadow-sm'>
                <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                  <span className='text-gray-500 sm:text-sm'>$</span>
                </div>

                <input
                  type='number'
                  name='rate'
                  id='rate'
                  className={`${disableArrowsNumber()}  block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  placeholder='0.00'
                  aria-describedby='price-currency'
                />
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
          <span className='text-gray-500 sm:text-sm' id='price-currency'>
            USD / Hour
          </span>
                </div>
              </div>
              <p className='mt-3 text-sm leading-6 text-indigo-600'>
                Recommended
              </p>

            </div>


            <div className='col-span-full'>
              <label htmlFor='about' className='block text-sm font-medium leading-6 text-gray-900'>
                About
              </label>
              <div className='mt-2'>
                <textarea
                  id='about'
                  name='about'
                  rows={3}
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  defaultValue={''}
                />
              </div>
              <p className='mt-3 text-sm leading-6 text-gray-600'>Write a few sentences about the developer.</p>

            </div>

            <div className='col-span-full'>
              <label htmlFor='cover-photo' className='block text-sm font-medium leading-6 text-gray-900'>
                Detailed CV
              </label>
              <div className='mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10'>
                <div className='text-center'>
                  <PhotoIcon className='mx-auto h-12 w-12 text-gray-300' aria-hidden='true' />
                  <div className='mt-4 flex text-sm leading-6 text-gray-600'>
                    <label
                      htmlFor='file-upload'
                      className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
                    >
                      <span>Upload a file</span>
                      <input id='file-upload' name='file-upload' type='file' className='sr-only' />
                    </label>
                    <p className='pl-1'>or drag and drop</p>
                  </div>
                  <p className='text-xs leading-5 text-gray-600'>PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>
          </div>


        </div>

      </div>


      <div className='mt-6 flex items-center justify-end gap-x-6'>
        <button type='button' className='text-sm font-semibold leading-6 text-gray-900'>
          Cancel
        </button>
        <button
          type='submit'
          className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          Save
        </button>
      </div>
    </form>

  );

}
