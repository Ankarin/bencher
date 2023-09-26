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
  availableOptions,
  englishLevels,
  languages,
  roles,
  getRegion, skillList,
} from '@/utils/options';

import { selectStyleObject } from '@/utils/utils';
import { zust } from '@/store';


const supabase = createClientComponentClient();

export default function DevForm({ isNew = false }) {
  const [title, setTitle] = useState('');
  const [role, setRole] = useState('');
  const [experience, setExperience] = useState('3');
  const [location, setLocation] = useState('');
  const [available, setAvailable] = useState('');
  const [english, setEnglish] = useState('');
  const [rate, setRate] = useState('');
  const [otherLanguages, setOtherLanguages] = useState([]);
  const [mainSkills, setMainSkills] = useState([]);
  const [otherSkills, setOtherSkills] = useState([]);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const [cv, setCv] = useState({ url: '', filename: '' });


  console.log(isNew);

  const zustMyCompany = zust(state => state.myCompany);


  const languagesOptions = languages().map(item => {
    return { value: item, label: item };
  }).filter(item => !otherLanguages.includes(item));

  function testIfTaken(object, array) {
    return array.some(item => item.value === object.value);
  }


  const skillListFiltered = skillList().filter(item => !testIfTaken(item, mainSkills) && !testIfTaken(item, otherSkills));

  const handleSelect = (val) => {
    setOtherLanguages(val);
  };
  const handleSelectSkills = (val) => {
    setMainSkills(val);
  };
  const handleSelectOtherSkills = (val) => {
    setOtherSkills(val);
  };


  const [file, setFile] = useState(null);

  async function loadCV(e) {
    if (!e.target.files || e.target.files.length === 0) {
      throw new Error('You must select pdf to upload.');
    }
    setFile(e.target.files[0]);
  }


  const addDeveloper = async () => {
    try {
      const developer = {
        company: zustMyCompany.id,
        title,
        role,
        experience,
        country: location,
        region: getRegion(location),
        available,
        english,
        skills: mainSkills.map(item => item.value),
        other_skills: otherSkills.map(item => item.value),
        other_languages: otherLanguages.map(item => item.value),
        hourly_rate: rate,
        description,
        cv: cv.url,
      };

      const { error } = await supabase.from('developers').insert(developer);
      console.log(error);
    } catch (e) {
      console.log(e);
      throw new Error(e.message);
    }
  };


  async function uploadCv() {
    try {
      setUploading(true);

      console.log(file);
      const path = uuid();

      const { error: uploadError } = await supabase.storage
        .from('bitbencher/cv')
        .upload(path, file);

      if (uploadError) {
        alert(uploadError);
        return;
      }
      setCv({
        url: `cv/${path}`,
        filename: file.name,
      });
    } catch (error) {
      alert(error.message);
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
      throw new Error(error.message);
    }
    console.log(data);
    window.open(data.publicUrl);
  };


  const save = async (e) => {
    e.preventDefault();
    await addDeveloper();
    await uploadCv();
  };


  return (
    <form onSubmit={save}>
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
                className='flex mt-2 rounded-md  ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                <input
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
                htmlFor='location'
                className='block text-sm font-medium leading-6 text-gray-900'
              >

                Role *
              </label>
              <select
                required
                id='role'
                name='role'
                value={role}
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                className='mt-2 block shadow-sm w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
              >
                <option></option>
                {roles().map((country) => (
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
              <div className=''>
                <label
                  htmlFor='location'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >

                  Available in *
                </label>
                <select
                  required
                  id='available'
                  name='available'
                  value={available}
                  onChange={(e) => {
                    setAvailable(e.target.value);
                  }}
                  className='mt-2 shadow-sm block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6'
                >
                  <option></option>
                  {availableOptions().map((country) => (
                    <option key={country}>{country}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className='sm:col-span-3 mt-2'>
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
              <div className='relative mt-2 rounded-md shadow-sm'>
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
                Main Skills (Pick up to 5)
              </label>
              <div>
                <CreatableSelect
                  value={mainSkills}
                  onChange={handleSelectSkills}
                  options={skillListFiltered}
                  primaryColor='blue'
                  isMulti
                  isClearable={true}
                  styles={selectStyleObject} />
              </div>
            </div>
            <div className='sm:col-span-3 mt-2'>
              <label
                htmlFor='location'
                className='block text-sm font-medium leading-6 text-gray-900'
              >
                More Skills (Pick up to 20)
              </label>
              <div>
                <CreatableSelect
                  value={otherSkills}
                  onChange={handleSelectOtherSkills}
                  options={skillListFiltered}
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
                     {description.length} / 250
                </span>

              </div>
              <p className='mt-3 text-sm leading-6 text-gray-600'>Write a few sentences about the candidate.</p>

            </div>

            <div className='col-span-full'>
              <label htmlFor='cover-photo' className='block text-sm font-medium leading-6 text-gray-900'>
                Detailed CV

              </label>

              {!cv.url ? <div>

                  <label
                    htmlFor='file-upload'
                    className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'
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

                </div> :
                <div className={'flex'}><span className={'text-indigo-600 cursor-pointer'}
                                              onClick={supaDownload}>{cv.filename} </span>
                  <XMarkIcon className='text-red-500 h-6 w-6 cursor-pointer ml-5'></XMarkIcon>
                </div>}
            </div>
          </div>


        </div>

      </div>


      <div className='mt-6 flex items-center justify-end gap-x-6'>
        <button type='button' className='text-sm font-semibold leading-6 text-gray-900'>
          Cancel
        </button>
        <button
          onClick={save}
          className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          Save
        </button>
      </div>
    </form>

  );

}
