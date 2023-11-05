import React, { Suspense } from 'react'
import Chats from '@/app/(messages)/messages/(chats)/Chats'
import { ExtendedChatType } from '@/utils/types'
import { getMyChats } from '@/utils/supabase'
import { getUserData } from '@/utils/supabase'
import { User } from '@/utils/types'

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userData: User | null = await getUserData()
  const initialChats: ExtendedChatType[] | [] = userData?.id
    ? await getMyChats(userData?.id)
    : []

  return (
    <div
      className={
        'mx-auto -mt-20 h-screen max-w-7xl overflow-hidden border-x border-slate-900/10   '
      }
    >
      <div className={'h-full pt-16 md:grid  md:grid-cols-7'}>
        <Chats initialChats={initialChats} />
        <div
          className={
            'col-span-5 flex flex-col items-center justify-between bg-blue-50/50 pb-12'
          }
        >
          <Suspense>{children}</Suspense>
        </div>
      </div>
    </div>
  )
}
