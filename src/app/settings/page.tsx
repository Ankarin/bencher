'use client'
import React, { useEffect, useState } from 'react'
import { zust } from '@/store'
import { Button } from '@/components/landing/Button'
import Toast from '@/components/app/Toast'
import { changeName, updatePassword } from '@/utils/supabaseClient'
import { toast } from 'react-toastify'

export default function Settings() {
  const [name, setName] = useState('')
  const [pass, setPass] = useState('')

  const [reset, setReset] = useState(false)
  const zustMyUser = zust((state) => state.user)

  useEffect(() => {
    if (zustMyUser) {
      setName(zustMyUser.first_name)
    }
  }, [zustMyUser])
  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await changeName(name)

      if (reset) {
        await updatePassword(pass)
      }
      toast.success('User successfully updated')
      setPass('')
      setReset(false)
    } catch (error) {
      toast.error('Error updating user')
    }
  }

  const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setReset(!reset)
  }

  return (
    <div className={'mx-auto max-w-md p-5'}>
      <Toast></Toast>
      <h2 className='text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight'>
        Settings
      </h2>
      <form onSubmit={submitForm}>
        <div className='mt-10'>
          <div className='sm:col-span-3'>
            <label
              htmlFor='username'
              className='block text-sm font-medium leading-6 text-gray-900'
            >
              First Name ( Display Name )
            </label>
            <div className='mt-2 flex rounded-md  ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                type='text'
                name='name'
                id='name'
                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
              />
            </div>
          </div>

          <div>
            <Button
              onClick={handleReset}
              variant='solid'
              className=' mt-5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              loading={false}
              color='slate'
            >
              {!reset ? `Reset Password` : 'Cancel Reset'}
            </Button>
          </div>

          {reset && (
            <>
              <label
                htmlFor='username'
                className='mt-5 block text-sm font-medium leading-6 text-gray-900'
              >
                New Password
              </label>
              <div className='mt-2 flex rounded-md  ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                <input
                  required
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  type='password'
                  minLength={6}
                  name='title'
                  id='title'
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                />
              </div>
            </>
          )}

          <Button
            variant='solid'
            type='submit'
            className='mt-5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            loading={false}
            color='blue'
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  )
}
