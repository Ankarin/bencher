import { getMyDevs } from '@/utils/supabase'
import DevList from '@/app/(developers)/DevList'

export default async function MyDevelopers() {
  const developers = await getMyDevs()
  return <DevList isMine={true} developers={developers}></DevList>
}
