'use client'
import React, { useEffect } from 'react'
import { PaperAirplaneIcon } from '@heroicons/react/20/solid'
import { useState, useRef } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { ChatUser, User } from '@/utils/types'

import Toast from '@/components/app/Toast'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

function NewMessage({
  receiver,
  sender,
  chatId,
}: {
  receiver: ChatUser
  sender: User
  chatId: string | null
}) {
  const supabase = createClientComponentClient()
  const [msg, setMsg] = useState('')
  const [chat, setChat] = useState<string | null>(null)

  const router = useRouter()

  useEffect(() => {
    setChat(chatId)
  }, [])

  const formRef = useRef<HTMLFormElement | null>(null)
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target
    setMsg(textarea.value)
    textarea.style.height = 'auto'
    textarea.style.height = textarea.scrollHeight + 'px'
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      if (!e.metaKey && !e.ctrlKey) {
        if (msg.trim() !== '') {
          submitForm(e)
        }
      }
    }
  }

  const createChat = async () => {
    const { error, data } = await supabase
      .from('chats')
      .insert({
        user_1: sender.id,
        user_2: receiver.id,
      })
      .select()
    if (error) {
      toast.error('Sorry, something went wrong!')
    } else {
      setChat(data[0].id)
      await sendMsg(data[0].id)
      router.refresh()
    }
  }

  const sendMsg = async (chat_id: string) => {
    const { error } = await supabase
      .from('messages')
      .insert({
        chat: chat_id,
        message: msg,
        receiver: receiver.id,
        sender: sender.id,
        is_read: false,
      })
      .select()
    if (error) {
      toast.error('Sorry, something went wrong!')
    }
    setMsg('')
  }

  const sendMessage = async () => {
    if (!chat) {
      await createChat()
    } else {
      await sendMsg(chat)
    }
  }

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault()
    await sendMessage()
  }

  return (
    <form ref={formRef} onSubmit={submitForm} className={'flex w-full px-20'}>
      <Toast></Toast>
      <textarea
        onKeyDown={handleKeyDown}
        required
        id='description'
        name='description'
        placeholder={'New message...'}
        className=' block  w-full resize-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
        value={msg}
        onChange={handleChange}
        maxLength={300}
      />
      <div className={'flex items-center'}>
        <button
          type='submit'
          className='ml-5 rounded-full bg-indigo-600 p-3 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          <PaperAirplaneIcon className='w-7' aria-hidden='true' />
        </button>
      </div>
    </form>
  )
}

export default NewMessage
