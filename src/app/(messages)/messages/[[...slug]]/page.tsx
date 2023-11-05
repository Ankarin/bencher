'use client'
import React, { useEffect, useState } from 'react'

import Chat from '@/app/(messages)/messages/(chat)/Chat'
import NewMessage from '@/app/(messages)/messages/(chat)/NewMessage'
import { PageProps, ChatUser } from '@/utils/types'
import ChatHeader from '@/app/(messages)/messages/(chat)/ChatHeader'
import { getChatUser, getMessages, getChat } from '@/utils/supabaseClient'

import { zust } from '@/store'
import { ChatType } from '@/utils/types'
import { Message } from '@/utils/types'

function Messages({ params }: PageProps) {
  const userData = zust((state) => state.user)
  const [receiver, setReceiver] = useState<ChatUser | null>(null)

  const [chatId, setChatId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[] | []>([])
  const fetchReceiver = async () => {
    const receiver: ChatUser | null = await getChatUser(params?.slug as string)
    setReceiver(receiver)
  }
  const fetchChat = async () => {
    const chat: ChatType | null =
      receiver?.id && userData?.id
        ? await getChat(receiver.id, userData.id)
        : null
    const messages: Message[] | [] = chat?.id ? await getMessages(chat.id) : []

    setChatId(chat?.id || null)
    setMessages(messages)
  }

  const fetchAll = async () => {
    await fetchReceiver()
    await fetchChat()
  }

  useEffect(() => {
    fetchAll()
  }, [userData])

  return (
    <>
      {receiver && userData && (
        <div className={'flex h-[calc(100vh-100px)] w-full flex-col'}>
          <ChatHeader receiver={receiver}></ChatHeader>
          <div className={'flex-grow overflow-hidden'}>
            <div
              className={
                'h-full overflow-x-hidden overflow-y-scroll px-10 pt-5'
              }
            >
              {chatId && messages.length > 0 && (
                <Chat
                  receiver={receiver}
                  me={userData}
                  chatId={chatId}
                  startingMessages={messages}
                ></Chat>
              )}
            </div>
          </div>
          <div className={'mt-5 flex-none'}>
            <NewMessage receiver={receiver} sender={userData} chatId={chatId} />
          </div>
        </div>
      )}
    </>
  )
}

export default Messages
