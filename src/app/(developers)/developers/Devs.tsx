import DevList from '@/app/(developers)/DevList'
import { getDevs } from '@/utils/supabase'
import { DevSearchParams } from '@/utils/types'

export default async function Devs({
  page,
  searchParams,
}: {
  page: number
  searchParams?: DevSearchParams
}) {
  const developers = await getDevs(page, searchParams ?? null)

  return (
    <>
      <DevList developers={developers}></DevList>
    </>
  )
}
