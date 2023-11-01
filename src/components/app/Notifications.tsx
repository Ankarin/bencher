import React, { Fragment } from 'react'
import { BellIcon } from '@heroicons/react/24/outline'
import { Popover, Transition } from '@headlessui/react'
import { useDetectClickOutside } from 'react-detect-click-outside'

function Notifications() {
  return (
    <div>
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
                  <BellIcon className='mr-3 mt-1 h-6 w-6 flex-none cursor-pointer' />
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
                    className='absolute -left-40 top-full z-10 mt-5 w-screen max-w-sm overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5'
                  >
                    <div className='p-4'>No notifications yet.</div>
                  </Popover.Panel>
                </Transition>
              </div>
            )
          }}
        </Popover>
      </Popover.Group>
    </div>
  )
}

export default Notifications
