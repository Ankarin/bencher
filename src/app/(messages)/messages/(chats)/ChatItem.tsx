'use client'
import React, { useEffect } from 'react'

import { ExtendedChatType, Message } from '@/utils/types'
import { getLastMessage } from '@/utils/supabaseClient'
import { useRouter } from 'next/navigation'

function ChatItem({ chat }: { chat: ExtendedChatType }) {
  const [lastMessage, setLastMessage] = React.useState('')

  const router = useRouter()
  useEffect(() => {
    fetchLastMessage()
  }, [])

  const fetchLastMessage = async () => {
    const message: Message | null = await getLastMessage(chat.id)
    setLastMessage(message?.message || '')
  }

  const changePage = () => {
    console.log(`/messages/${chat.friend.company_id.id}`)
    router.push(`/messages/${chat.friend.company_id.id}`)
  }

  return (
    <div onClick={changePage}>
      <div
        className={
          'w-full  cursor-pointer border-b border-slate-900/10 bg-white p-2 hover:bg-gray-300/10 md:p-4'
        }
      >
        <div className={'flex justify-between'}>
          <p className={'text-md truncate font-semibold'}>
            {chat.friend.first_name} {chat.friend.last_name}
          </p>
          <div
            className={
              'h-3 w-3 rounded-full bg-blue-500 text-center  text-white'
            }
          ></div>
        </div>
        <p className={'truncate text-sm'}>{lastMessage}</p>
      </div>
    </div>
  )
}

export default ChatItem
