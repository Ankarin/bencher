import React from 'react'
import { ChatUser } from '@/utils/types'
import Link from 'next/link'

import { ChevronLeftIcon } from '@heroicons/react/20/solid'

function ChatHeader({ receiver }: { receiver: ChatUser }) {
  return (
    <div
      className={
        'flex w-full items-center justify-between  border-b border-slate-900/10 px-2'
      }
    >
      <Link
        href={'/messages'}
        className={'flex items-center text-blue-600 hover:text-blue-800'}
      >
        <ChevronLeftIcon className={'h-8 w-8'} />
        Back
      </Link>
      <div className={'flex w-full justify-center py-3 text-xl font-semibold'}>
        {receiver.first_name + ' ' + receiver.last_name}
        <Link
          className={'ml-2 text-blue-600 hover:text-blue-800'}
          href={`/company/${receiver.company_id.id}`}
        >
          @{receiver?.company_id?.name}
        </Link>
      </div>
    </div>
  )
}

export default ChatHeader
