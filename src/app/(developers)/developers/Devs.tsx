import DevList from '@/app/(developers)/DevList'
import { getDevs } from '@/utils/supabase'

export default async function Devs({ page }: { page: number }) {
  const developers = await getDevs(page)

  return (
    <>
      <DevList developers={developers}></DevList>
    </>
  )
}
