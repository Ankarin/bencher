import React from 'react'
import Filter from '@/components/app/Filter'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={'mx-auto flex max-w-5xl '}>
      <div className={'fixed w-60'}>
        <Filter />
      </div>
      <div className={' ml-60 w-full pl-10'}>{children}</div>
    </div>
  )
}
