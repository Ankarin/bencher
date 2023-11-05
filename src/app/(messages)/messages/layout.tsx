'use client'
import React from 'react'
import Chats from '@/app/(messages)/messages/(chats)/Chats'

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={
        'mx-auto -mt-20 h-screen max-w-7xl overflow-hidden border-x border-slate-900/10   '
      }
    >
      <div className={'h-full pt-16 md:grid  md:grid-cols-7'}>
        <Chats />
        <div
          className={
            'col-span-5 flex flex-col items-center justify-between bg-blue-50/50 pb-12'
          }
        >
          {children}
        </div>
      </div>
    </div>
  )
}
