'use client'
import React, { useEffect, useState } from 'react'
import ChatItem from '@/app/(messages)/messages/(chats)/ChatItem'
import { ExtendedChatType, User } from '@/utils/types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

import { zust } from '@/store'

function Chats({ initialChats }: { initialChats: ExtendedChatType[] | [] }) {
  const userData: User | null = zust((state) => state.user)
  const [chats, setChats] = useState(initialChats as ExtendedChatType[])

  const supabase = createClientComponentClient()

  const getFullChatData = async (newChatId: string) => {
    const { data, error } = await supabase
      .from('chats')
      .select(
        '*, user_1(id, first_name, last_name, company_id(id, logo_url, name)), user_2(id, first_name, last_name, company_id(id, logo_url, name))'
      )
      .eq('id', newChatId)
    if (error) {
      console.log(error)
    } else {
      const copy = data?.map((chat) => {
        if (chat.user_1.id === userData?.id) {
          return { ...chat, me: chat.user_1, friend: chat.user_2 }
        } else {
          return { ...chat, me: chat.user_2, friend: chat.user_1 }
        }
      })

      setChats((previous: ExtendedChatType[]) => [
        ...previous,
        copy[0] as ExtendedChatType,
      ])
    }
  }

  useEffect(() => {
    const subscription = supabase
      .channel('chats')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chats',
          filter: `user_1=eq.${userData?.id}`,
        },
        (payload) => {
          console.log(payload.new)
          getFullChatData(payload.new.id)
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chats',
          filter: `user_2=eq.${userData?.id}`,
        },
        (payload) => {
          console.log(payload.new)
          getFullChatData(payload.new.id)
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

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
