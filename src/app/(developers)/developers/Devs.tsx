import DevList from '@/app/(developers)/DevList'
import { getDevs } from '@/utils/supabase'

export default async function Devs() {
  const developers = await getDevs()
  return <DevList developers={developers}></DevList>
}
