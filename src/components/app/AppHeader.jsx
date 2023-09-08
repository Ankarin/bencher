'use client'
import {Fragment} from 'react'
import {Disclosure, Menu, Transition} from '@headlessui/react'
import {Bars3Icon, BellIcon, XMarkIcon} from '@heroicons/react/24/outline'
import ProfilePic from '@/images/profile.png'
import Image from 'next/image';
import {Button} from '@/components/landing/Button';
import {usePathname} from 'next/navigation'
import Link from 'next/link';
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'

import {useRouter} from 'next/navigation'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function AppHeader({user}) {
    const router = useRouter()
    const supabase = createClientComponentClient()
    const pathname = usePathname()
    const userEmail = user ? user.email : ''
    const signOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }

    if (pathname !== "/login" && pathname !== "/register" && pathname !== "/signup") {
        return (
            <Disclosure as="nav" className="bg-gray-800">
                {({open}) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="flex items-center px-2 lg:px-0">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-8 w-auto"
                                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                            alt="Your Company"
                                        />
                                    </div>
                                    <div className="hidden lg:ml-6 lg:block">
                                        <div className="flex space-x-4">
                                            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                                            <a href="#"
                                               className="rounded-md text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 text-sm font-medium ">
                                                Hire
                                            </a>
                                            <a
                                                href="#"
                                                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                            >
                                                Requests
                                            </a>
                                            <a
                                                href="#"
                                                className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                            >
                                                Companies
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex lg:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button
                                        className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="absolute -inset-0.5"/>
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="hidden lg:ml-4 lg:block">
                                    <div className="flex items-center">
                                        <Menu as="div" className="relative outline-none ml-4 flex-shrink-0">
                                            <div>
                                                {user ? <Menu.Button
                                                        className="relative flex rounded-full bg-gray-800 text-sm text-white focus:outline-none outline-none border-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                        <span className="absolute outline-none -inset-1.5"/>
                                                        <span className="sr-only">Open user menu</span>
                                                        <span
                                                            className={"outline-none pt-1 pr-3"}>         {userEmail}</span>

                                                        <Image
                                                            className="h-8 w-8 rounded-full"
                                                            src={ProfilePic}
                                                            alt=""
                                                        />
                                                    </Menu.Button> :
                                                    <div className="flex">
                                                        <Button href="/login" className="mr-2"
                                                                color="white"
                                                                variant="outline"><span>Sign In</span></Button>

                                                        <Button href="/register"
                                                                color="blue"><span>Sign Up</span></Button>
                                                    </div>}

                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items
                                                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <Menu.Item>
                                                        {({active}) => (
                                                            <Link
                                                                href="#"
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700'
                                                                )}
                                                            >
                                                                My Profile
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({active}) => (
                                                            <Link
                                                                href="/my-company"
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700'
                                                                )}
                                                            >
                                                                My Company
                                                            </Link>
                                                        )}
                                                    </Menu.Item>
                                                    <Menu.Item>
                                                        {({active}) => (
                                                            <p
                                                                onClick={signOut}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'cursor-pointer block px-4 py-2 text-sm text-gray-700'
                                                                )}
                                                            >
                                                                Sign out
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

                        <Disclosure.Panel className="lg:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                                <Disclosure.Button
                                    as="a"
                                    href="#"
                                    className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                                >
                                    Dashboard
                                </Disclosure.Button>
                                <Disclosure.Button
                                    as="a"
                                    href="#"
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                >
                                    Team
                                </Disclosure.Button>
                                <Disclosure.Button
                                    as="a"
                                    href="#"
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                                >
                                    Projects
                                </Disclosure.Button>
                            </div>
                            <div className="border-t border-gray-700 pb-3 pt-4">
                                <div className="flex items-center px-5">
                                    <div className="ml-3">
                                        <div className="text-base font-medium text-white">Tom Cook</div>
                                        <div className="text-sm font-medium text-gray-400">tom@example.com</div>
                                    </div>
                                </div>
                                <div className="mt-3 space-y-1 px-2">
                                    <Disclosure.Button
                                        as="a"
                                        href="#"
                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                    >
                                        Your Profile
                                    </Disclosure.Button>
                                    <Disclosure.Button
                                        as="a"
                                        href="#"
                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                    >
                                        Settings
                                    </Disclosure.Button>
                                    <Disclosure.Button
                                        onClick={signOut}
                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                    >
                                        Sign out
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
        )
    }

}
