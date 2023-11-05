'use client'
import React, { useEffect, useState } from 'react'
import ChatItem from '@/app/(messages)/messages/(chats)/ChatItem'
import { ExtendedChatType, User } from '@/utils/types'
import { getMyChats } from '@/utils/supabaseClient'
import { zust } from '@/store'

function Chats() {
  const userData: User | null = zust((state) => state.user)
  const [chats, setChats] = useState([] as ExtendedChatType[])

  useEffect(() => {
    fetchChats()
  }, [userData])

  const fetchChats = async () => {
    const chats: ExtendedChatType[] | [] = userData?.id
      ? await getMyChats(userData?.id)
      : []
    console.log(1, chats)
    setChats(chats)
  }

  return (
    <div
      className={
        'col-span-2 h-full overflow-auto border-slate-900/10 md:border-r'
      }
    >
      {chats.length > 0 ? (
        chats.map((chat: ExtendedChatType) => (
          <ChatItem key={chat.id} chat={chat} />
        ))
      ) : (
        <p className={'pt-5 text-center'}>
          You don't have any conversations yet.
        </p>
      )}
    </div>
  )
}

export default Chats
