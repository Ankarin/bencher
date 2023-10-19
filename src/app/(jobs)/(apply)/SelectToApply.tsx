import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState, useContext } from 'react'
import { Button } from '@/components/landing/Button'
import { ExistingDeveloper, FormSubmit } from '@/utils/types'
import { SelectDevContext } from '@/app/(jobs)/(apply)/Apply'

export default function SelectToApply({
  developer,
}: {
  developer: ExistingDeveloper
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [rate, setRate] = useState(developer.hourly_rate)

  const apply = useContext(SelectDevContext)

  const selectToApply = (e: FormSubmit) => {
    e.preventDefault()
    apply(developer, rate)
    setIsOpen(false)
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    <>
      <Button
        className='h-10'
        loading={false}
        variant='solid'
        color='blue'
        onClick={openModal}
      >
        Select
      </Button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-50' onClose={closeModal}>
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
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                    {developer.title}
                  </Dialog.Title>

                  <form onSubmit={selectToApply}>
                    <div className='mt-2 sm:col-span-3'>
                      <div className='relative mt-2 rounded-md '>
                        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
                          <span className='text-gray-500 sm:text-sm'>$</span>
                        </div>

                        <input
                          required
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
                          <span
                            className='text-gray-500 sm:text-sm'
                            id='price-currency'
                          >
                            USD / Hour
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className={'mt-6 flex  items-center justify-between'}>
                      <button
                        onClick={() => setIsOpen(false)}
                        type='button'
                        className='text-sm font-medium leading-6 text-gray-900'
                      >
                        Cancel
                      </button>
                      <button
                        type='submit'
                        className='cursor-pointer rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                      >
                        Apply
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
