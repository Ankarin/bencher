'use client'
import DevList from '@/app/(developers)/DevList'
import { zust } from 'src/store'

export default function MyDevelopers() {
  const developers = zust((state) => state.myDevelopers)
  return <DevList isMine={true} developers={developers}></DevList>
}
