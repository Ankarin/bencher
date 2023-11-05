'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import React, { useEffect, useState } from 'react'
import { Message, User } from '@/utils/types'

import { ChatUser } from '@/utils/types'

function Chat({
  receiver,
  me,
  chatId,
  startingMessages,
}: {
  receiver: ChatUser
  me: User
  chatId: string
  startingMessages: Message[] | []
}) {
  const [messages, setMessages] = useState<Message[]>(startingMessages)

  const supabase = createClientComponentClient()

  useEffect(() => {
    const subscription = supabase
      .channel('chat')

      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `chat=eq.${chatId}`,
        },
        (payload) => {
          setMessages((previous: Message[]) => [
            ...previous,
            payload.new as Message,
          ])
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  return (
    <>
      {messages.map((message) => (
        <MessageItem
          isYou={message.sender === me.id}
          message={message.message}
          key={message.id}
        ></MessageItem>
      ))}
    </>
  )
}

const MessageItem = ({
  isYou,
  message,
}: {
  isYou: boolean
  message: string | null
}) => {
  return (
    <div>
      {isYou ? (
        <div className='mb-2 flex  w-full justify-end'>
          <div className='max-w-[75%]  overflow-hidden overflow-ellipsis break-words rounded-lg bg-blue-700 px-3 py-2 text-white'>
            {message}
          </div>
        </div>
      ) : (
        <div className='mb-2 flex'>
          <div className='max-w-[75%] overflow-hidden overflow-ellipsis break-words rounded-lg bg-slate-600 px-3 py-2 text-white'>
            {message}
          </div>
        </div>
      )}
    </div>
  )
}

export default Chat
