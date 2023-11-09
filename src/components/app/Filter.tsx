'use client'
import React, { useState } from 'react'
import {
  categorys,
  englishLevels,
  getEngLevelFromText,
  skillList,
} from '@/utils/options'
import CreatableSelect from 'react-select/creatable'
import { selectStyleObject } from '@/utils/utils'
import { FormSubmit, Selecter } from '@/utils/types'
import { useRouter } from 'next/navigation'

function Filter() {
  const router = useRouter()

  const [category, setCategory] = useState('')
  const [english, setEnglish] = useState('')
  const [rate, setRate] = useState('')
  const [experience, setExperience] = useState('1')
  const [mainSkills, setMainSkills] = useState<Selecter[]>([])

  const [isDisabled, setIsDisabled] = useState(false)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const handleSelectSkills = (val) => {
    if (val.length > 15) {
      return
    }
    setMainSkills(val)
  }

  const filter = (e: FormSubmit) => {
    e.preventDefault()
    setIsDisabled(true)
    const queryParams = new URLSearchParams()
    queryParams.set('category', category)
    queryParams.set('english', String(getEngLevelFromText(english)))
    queryParams.set('rate', rate)
    queryParams.set('experience', experience)
    if (mainSkills.length > 0) {
      const skills = mainSkills.map((skill) => skill.value)
      queryParams.set('mainSkills', skills.join(','))
    }

    const queryString = queryParams.toString()
    const url = `/developers/1?${queryString}`

    // Use the `url` for navigation or perform other actions

    router.push(url)

    setIsDisabled(false)
  }
  const clearFilter = () => {
    setCategory('')
    setEnglish('')
    setRate('')
    setExperience('1')
    setMainSkills([])
    router.push('/developers/1')
  }

  return (
    <form onSubmit={filter} className={'fixed px-2 pt-12 md:pl-0 md:pr-5'}>
      <div className='mt-3 sm:col-span-3'>
        <label
          htmlFor='category'
          className='block text-sm font-medium leading-6 text-gray-900'
        >
          Category
        </label>
        <select
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
      <div className='mt-2 sm:col-span-3 '>
        <div>
          <label
            htmlFor='location'
            className='block text-sm font-medium leading-6 text-gray-900'
          >
            Min English Level
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
      <div className='mt-2 sm:col-span-3'>
        <label
          htmlFor='rate'
          className='block text-sm font-medium leading-6 text-gray-900'
        >
          Max Rate
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
            <span className='text-gray-500 sm:text-sm' id='price-currency'>
              USD / Hour
            </span>
          </div>
        </div>
      </div>
      <div className='mt-3 sm:col-span-3'>
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
      <div className={'flex items-center justify-between gap-x-6 pt-4'}>
        <button
          onClick={clearFilter}
          type='button'
          className='text-sm font-medium leading-6 text-gray-900'
        >
          Clear
        </button>
        <button
          disabled={isDisabled}
          type={'submit'}
          className='cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          Filter
        </button>
      </div>
    </form>
  )
}

export default Filter
