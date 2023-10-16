import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import ApplyList from './ApplyList'

export default function ApplyModal({
  open,
  close,
}: {
  open: boolean
  close: () => void
}) {
  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={() => close()}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='mt-16 h-screen w-full max-w-3xl transform overflow-y-auto  bg-white text-left align-middle shadow-xl transition-all '>
                  <div
                    className={
                      'mt-4 flex justify-between px-4 text-lg font-medium'
                    }
                  >
                    <span>Select to apply.</span>
                    <button
                      onClick={() => close()}
                      type='button'
                      className='gap-x-1.5 rounded-md bg-red-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    >
                      Close
                    </button>
                  </div>

                  <ApplyList></ApplyList>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
