'use client';
// import { Button } from '@/components/landing/Button';
import { uuid } from '@supabase/supabase-js/dist/main/lib/helpers';
import { XMarkIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import Select from 'react-select';
import CreatableSelect from 'react-select/creatable';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  countries,
  englishLevels,
  languages,
  categorys,
  getRegion, skillList,
} from '@/utils/options';

import { selectStyleObject } from '@/utils/utils';
import { zust } from '@/store';
import { toast } from 'react-toastify';
import Toast from '@/components/Toast';


const supabase = createClientComponentClient();

export default function DevForm({ isNew = false, devId }) {
  const [title, setTitle] = useState('');
  const [category, setcategory] = useState('');
  const [experience, setExperience] = useState('3');
  const [location, setLocation] = useState('');
  const [asap, setAsap] = useState(false);
  const [english, setEnglish] = useState('');
  const [rate, setRate] = useState('');
  const [otherLanguages, setOtherLanguages] = useState([]);
  const [mainSkills, setMainSkills] = useState([]);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [cv, setCv] = useState({ url: '', filename: '' });
  const [disabledSave, setDisabledSave] = useState(false);


  console.log(isNew);

  console.log(devId);

  const zustMyCompany = zust(state => state.myCompany);


  const languagesOptions = languages().map(item => {
    return { value: item, label: item };
  }).filter(item => !otherLanguages.includes(item));


  const handleSelect = (val) => {
    setOtherLanguages(val);
  };
  const handleSelectSkills = (val) => {
    if (mainSkills.length >= 10) {
      return;
    }
    setMainSkills(val);
  };


  const [file, setFile] = useState(null);

  async function loadCV(e) {
    if (!e.target.files || e.target.files.length === 0) {
      throw new Error('You must select pdf to upload.');
    }
    const file = e.target.files[0];
    setFile(file);
    const path = uuid();
    setCv({
      url: `cv/${path}`,
      filename: file.name,
    });
  }


  const supaAddDev = async (developer) => {
    try {
      await supabase.from('developers').insert(developer);

    } catch (e) {
      console.log(e);
      toast.error('Error adding developer !', {});
    }
    toast.success('Added new developer !', {});
  };


  const addDeveloper = async () => {
    const developer = {
      company: zustMyCompany.id,
      title,
      category,
      experience: experience,
      country: location,
      region: getRegion(location),
      asap,
      english,
      skills: mainSkills.map(item => item.value),
      other_languages: otherLanguages.map(item => item.value),
      hourly_rate: rate,
      description,
      cv: cv.url,
    };
    await supaAddDev(developer);

  };


  async function uploadCv() {
    try {
      setUploading(true);


      const { error: uploadError } = await supabase.storage
        .from('bitbencher/')
        .upload(cv.url, file);

      if (uploadError) {
        alert(uploadError);
        return;
      }
    } catch (error) {
      toast.error('Error uploading CV !', {});
      console.log(error);
    } finally {
      setUploading(false);
    }
  }

  const supaDownload = async () => {
    const { data, error } = supabase
      .storage
      .from('bitbencher')
      .getPublicUrl(cv.url);
    if (error) {
      console.log(error);
      throw new Error(error.message);
    }
    window.open(data.publicUrl);
  };


  const save = async (e) => {
    setDisabledSave(true);
    e.preventDefault();
    await uploadCv();
    await addDeveloper();
    setDisabledSave(false);
  };


  return (
    <form onSubmit={save}>

      <Toast />

      <div className='space-y-12'>
        <div className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base font-medium leading-7 text-gray-900'>Developer Profile</h2>
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
                className='flex mt-2 rounded-md  ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
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
                  setcategory(e.target.value);
                }}
                className='mt-2 block shadow-sm w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
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
                  setLocation(e.target.value);
                }}
                className='mt-2 block shadow-sm w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
              >
                <option></option>
                {countries().map((country) => (
                  <option key={country}>{country}</option>
                ))}
              </select>
              <p className='mt-1 text-sm leading-6 text-indigo-600 absolute'>
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
                    setEnglish(e.target.value);
                  }}
                  className='mt-2 shadow-sm block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
                >
                  <option></option>
                  {englishLevels().map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>


            <div className='sm:col-span-3 mt-2'>
              <label htmlFor='rate' className='block text-sm font-medium leading-6 text-gray-900'>
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
                  className={`[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none shadow-sm  block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                  placeholder='0.00'
                  aria-describedby='price-currency'
                />
                <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'>
          <span className='text-gray-500 sm:text-sm' id='price-currency'>
            USD / Hour
          </span>
                </div>
              </div>
              <p className='mt-1 text-sm leading-6 text-indigo-600 absolute'>
                Recommended
              </p>

            </div>
            <div className='sm:col-span-3 mt-2'>
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
            <div className='sm:col-span-3 mt-2'>
              <label
                htmlFor='location'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Other Languages
              </label>
              <div>
                <Select
                  isMulti
                  onChange={handleSelect}
                  value={otherLanguages}
                  options={languagesOptions}
                  isSearchable={true}
                  isClearable={true}
                  styles={selectStyleObject} />
              </div>
            </div>

            <div className='sm:col-span-3 mt-2'>
              <label
                htmlFor='location'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                Main Skills (Pick up to 10)
              </label>
              <div>
                <CreatableSelect
                  value={mainSkills}
                  onChange={handleSelectSkills}
                  options={skillList()}
                  primaryColor='blue'
                  isMulti
                  isClearable={true}
                  styles={selectStyleObject} />
              </div>
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
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                  maxLength={250}
                />
                <span className={'text-sm'}>
               {description.length} / 250 (Max)
                </span>

              </div>
              <p className='mt-3 text-sm leading-6 text-gray-600'>Write a few sentences about the candidate.</p>

            </div>

            <div className='sm:col-span-3'>
              <label htmlFor='cover-photo' className='block text-sm font-medium leading-6 text-gray-900'>
                Detailed CV

              </label>

              {!cv.url ? <div>

                  <label
                    htmlFor='file-upload'
                    className='relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
                  >
                    <span>Upload </span>
                    <input
                      required
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

                </div> :
                <div className={'flex'}><span className={'text-indigo-600 cursor-pointer'}
                                              onClick={supaDownload}>{cv.filename} </span>
                  <XMarkIcon onClick={() => {
                    setFile(null);
                    setCv({ url: '', filename: '' });
                  }}
                             className='text-red-500 h-6 w-6 cursor-pointer ml-5'></XMarkIcon>
                </div>}
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
                <label htmlFor='push-everything' className='block text-sm leading-6 text-gray-900'>
                  Ready to start within 2 days.
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
                <label htmlFor='push-email' className='block text-sm  leading-6 text-gray-900'>
                  Will be available later.
                </label>
              </div>


            </div>

          </div>


        </div>

      </div>


      <div className='mt-6 flex items-center justify-end gap-x-6'>
        <button type='button' className='text-sm font-medium leading-6 text-gray-900'>
          Cancel
        </button>
        <button
          disabled={disabledSave}
          type='submit'
          className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          Save
        </button>
      </div>
    </form>

  );

}
