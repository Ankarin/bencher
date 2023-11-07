'use client'
import { Fragment, useEffect } from 'react'
import { Disclosure, Menu, Transition, Popover } from '@headlessui/react'
import { useDetectClickOutside } from 'react-detect-click-outside'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image, { ImageLoaderProps } from 'next/image'
import { Button } from '@/components/landing/Button'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { zust } from '@/store'
import { SmallLogo } from '@/components/SmallLogo'
import profilePic from '@/images/profile.png'
import {
  DocumentTextIcon,
  UserIcon,
  ClipboardDocumentListIcon,
  SquaresPlusIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/24/outline'
import { User, Company, ExistingDeveloper } from '@/utils/types'
import Notifications from '@/components/app/Notifications'

interface AppHeaderProps {
  user: User | null
  company: Company | null
  myDevs: ExistingDeveloper[]
}

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ')
}

export default function AppHeader({ user, company, myDevs }: AppHeaderProps) {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const pathname = usePathname()
  const zustSetCompany = zust((state) => state.setCompany)
  const zustSetUser = zust((state) => state.setUser)
  const zustSetDevelopers = zust((state) => state.setMyDevelopers)

  useEffect(() => {
    zustSetCompany(company)
    if (user) zustSetUser(user)
    zustSetDevelopers(myDevs)
  }, [user, company, myDevs])

  const signOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  const MyCompanyLinks = [
    {
      name: 'My Company',
      description: 'Edit information about your organisation.',
      href: '/my-company',
      icon: DocumentTextIcon,
    },
    {
      name: 'My Developers',
      description: 'Add and edit profiles of developers from your company.',
      href: '/my-devs',
      icon: UserIcon,
    },
    {
      name: 'My Jobs',
      description: 'Post and edit jobs, see who applied.',
      href: '/my-jobs',
      icon: ClipboardDocumentListIcon,
    },
    {
      name: 'My applies',
      description: 'Check and edit your applies.',
      href: '/my-applies',
      icon: SquaresPlusIcon,
    },
  ]

  if (
    pathname !== '/login' &&
    pathname !== '/register' &&
    pathname !== '/signup' &&
    pathname !== '/forgotpass' &&
    pathname !== '/resetpass'
  ) {
    return (
      <Disclosure as='nav' className='border-b border-slate-900/10 bg-white  '>
        {({ open }) => (
          <>
            <div className='mx-auto max-w-7xl px-2 sm:px-4 lg:px-8'>
              <div className='relative flex h-16 items-center justify-between'>
                <div className='flex items-center px-2 lg:px-0'>
                  <div className='flex-shrink-0'>
                    <SmallLogo></SmallLogo>
                  </div>
                  <div className='hidden lg:ml-6 lg:block'>
                    <div className='flex space-x-4'>
                      {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                      <Link
                        href='/developers'
                        className='rounded-md px-3 py-2 text-sm font-medium leading-6 text-gray-900 '
                      >
                        Developers
                      </Link>
                      <Link
                        href='/jobs'
                        className='rounded-md px-3 py-2 text-sm font-medium leading-6 text-gray-900'
                      >
                        Jobs
                      </Link>
                      <Link
                        href='/companies'
                        className='rounded-md px-3 py-2 text-sm font-medium leading-6 text-gray-900'
                      >
                        Companies
                      </Link>
                      {user && (
                        ///// pc view menu for users who are loged in
                        <Popover.Group className='hidden lg:flex lg:gap-x-12'>
                          <Popover className='relative flex items-center'>
                            {({ open, close }) => {
                              // eslint-disable-next-line react-hooks/rules-of-hooks
                              const ref = useDetectClickOutside({
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                onTriggered: close,
                              })
                              return (
                                <div className={'flex justify-between'}>
                                  <Popover.Button className='flex items-center gap-x-1 text-sm font-medium leading-6 text-gray-900 focus:outline-none'>
                                    My Company
                                    {!open ? (
                                      <ChevronDownIcon
                                        className='h-5 w-5 flex-none text-gray-400'
                                        aria-hidden='true'
                                      />
                                    ) : (
                                      <ChevronUpIcon
                                        className='h-5 w-5 flex-none text-gray-400'
                                        aria-hidden='true'
                                      />
                                    )}
                                  </Popover.Button>

                                  <Transition
                                    as={Fragment}
                                    enter='transition ease-out duration-200'
                                    enterFrom='opacity-0 translate-y-1'
                                    enterTo='opacity-100 translate-y-0'
                                    leave='transition ease-in duration-150'
                                    leaveFrom='opacity-100 translate-y-0'
                                    leaveTo='opacity-0 translate-y-1'
                                  >
                                    <Popover.Panel
                                      ref={ref}
                                      className='absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5'
                                    >
                                      <div className='p-4'>
                                        {MyCompanyLinks.map((item) => (
                                          <div
                                            key={item.name}
                                            className='group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50'
                                          >
                                            <div className='flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white'>
                                              <item.icon
                                                className='h-6 w-6 text-gray-600 group-hover:text-indigo-600'
                                                aria-hidden='true'
                                              />
                                            </div>
                                            <div className='flex-auto'>
                                              <Link
                                                onClick={close}
                                                href={item.href}
                                                className='block font-semibold text-gray-900'
                                              >
                                                {item.name}
                                                <span className='absolute inset-0' />
                                              </Link>
                                              <p className='mt-1 text-gray-600'>
                                                {item.description}
                                              </p>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </Popover.Panel>
                                  </Transition>
                                </div>
                              )
                            }}
                          </Popover>
                        </Popover.Group>
                        //end
                      )}
                    </div>
                  </div>
                </div>
                <div className='flex lg:hidden'>
                  {/* Mobile menu button */}
                  <Disclosure.Button className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                    <span className='absolute -inset-0.5' />
                    <span className='sr-only'>Open main menu</span>
                    {open ? (
                      <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                    ) : (
                      <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                    )}
                  </Disclosure.Button>
                </div>
                <div className='hidden lg:ml-4 lg:block'>
                  <div className='flex items-center'>
                    <Menu
                      as='div'
                      className='relative ml-4 flex-shrink-0 outline-none'
                    >
                      <div>
                        {user ? (
                          <div className={'flex items-center'}>
                            <Notifications />
                            <Menu.Button className='relative flex rounded-full border-none  text-sm  font-medium outline-none focus:outline-none  focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                              <span className='absolute -inset-1.5 outline-none' />
                              <span className='sr-only'>Open user menu</span>
                              <span className={'pr-3 pt-1 outline-none'}>
                                {' '}
                                {user.first_name}{' '}
                                {company ? `@${company.name}` : ''}
                              </span>

                              <Image
                                loader={({ src }: ImageLoaderProps) => src}
                                className='h-8 w-8 rounded-full'
                                src={profilePic}
                                alt=''
                                width='30'
                                height='30'
                              />
                            </Menu.Button>
                          </div>
                        ) : (
                          <div className='flex'>
                            <Button
                              loading={false}
                              href='/login'
                              className='mr-2'
                              color='slate'
                              variant='solid'
                            >
                              <span>Sign In</span>
                            </Button>

                            <Button
                              className=''
                              loading={false}
                              variant='solid'
                              href='/register'
                              color='blue'
                            >
                              <span>Sign Up</span>
                            </Button>
                          </div>
                        )}
                      </div>
                      <Transition
                        as={Fragment}
                        enter='transition ease-out duration-100'
                        enterFrom='transform opacity-0 scale-95'
                        enterTo='transform opacity-100 scale-100'
                        leave='transition ease-in duration-75'
                        leaveFrom='transform opacity-100 scale-100'
                        leaveTo='transform opacity-0 scale-95'
                      >
                        <Menu.Items className='absolute right-0 z-10 mt-5 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                          <Menu.Item>
                            {({ active }) => (
                              <p
                                onClick={() => router.push('/settings')}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block cursor-pointer px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Settings
                              </p>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <p
                                onClick={signOut}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block cursor-pointer px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                Sign Out
                              </p>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className='lg:hidden'>
              <div className='space-y-1 px-2 pb-3 pt-2'>
                <Disclosure.Button
                  as='a'
                  href='/developers'
                  className='text-base block rounded-md px-3 py-2 font-medium  hover:bg-gray-700 hover:text-white'
                >
                  Developers
                </Disclosure.Button>
                <Disclosure.Button
                  as='a'
                  href='/jobs'
                  className='text-base block rounded-md px-3 py-2 font-medium  hover:bg-gray-700 hover:text-white'
                >
                  Jobs
                </Disclosure.Button>
                <Disclosure.Button
                  as='a'
                  href='/companies'
                  className='text-base block rounded-md px-3 py-2 font-medium  hover:bg-gray-700 hover:text-white'
                >
                  Companies
                </Disclosure.Button>
              </div>

              <div className='border-t border-gray-700 pb-3 pt-4'>
                {!user ? (
                  <div className='mt-3 space-y-1 px-2'>
                    <Disclosure.Button
                      as='a'
                      href='/login'
                      className='text-base block rounded-md px-3 py-2 font-medium  hover:bg-gray-700 hover:text-white'
                    >
                      Sign In
                    </Disclosure.Button>
                    <Disclosure.Button
                      as='a'
                      href='/register'
                      className='text-base block rounded-md px-3 py-2 font-medium  hover:bg-gray-700 hover:text-white'
                    >
                      Sign Up
                    </Disclosure.Button>
                  </div>
                ) : (
                  <div className='mt-3 space-y-1 px-2'>
                    <div className='ml-3'>
                      <div className='text-base mb-2 text-lg font-medium '>
                        {user.first_name} {company ? `@${company.name}` : ''}
                      </div>
                    </div>

                    <Disclosure.Button
                      as='a'
                      href='/my-company'
                      className='text-base block rounded-md px-3 py-2 font-medium  hover:bg-gray-700 hover:text-white'
                    >
                      My Company
                    </Disclosure.Button>
                    <Disclosure.Button
                      as='a'
                      href='/my-devs'
                      className='text-base block rounded-md px-3 py-2 font-medium  hover:bg-gray-700 hover:text-white'
                    >
                      My Developers
                    </Disclosure.Button>
                    <Disclosure.Button
                      as='a'
                      href='/my-jobs'
                      className='text-base block rounded-md px-3 py-2 font-medium  hover:bg-gray-700 hover:text-white'
                    >
                      My Jobs
                    </Disclosure.Button>
                    <Disclosure.Button
                      as='a'
                      href='/my-applies'
                      className='text-base block rounded-md px-3 py-2 font-medium  hover:bg-gray-700 hover:text-white'
                    >
                      My Applies
                    </Disclosure.Button>
                    <br />
                    <Disclosure.Button
                      as='a'
                      href='/notifications'
                      className='text-base block rounded-md px-3 py-2 font-medium  hover:bg-gray-700 hover:text-white'
                    >
                      Notifications
                    </Disclosure.Button>

                    <br />
                    <Disclosure.Button
                      as='a'
                      href='/settings'
                      className='text-base block rounded-md px-3 py-2 font-medium hover:bg-gray-700 hover:text-white'
                    >
                      Settings
                    </Disclosure.Button>
                    <Disclosure.Button
                      onClick={signOut}
                      className='text-base block rounded-md px-3 py-2 font-medium hover:bg-gray-700 hover:text-white'
                    >
                      Sign Out
                    </Disclosure.Button>
                  </div>
                )}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    )
  }
}
