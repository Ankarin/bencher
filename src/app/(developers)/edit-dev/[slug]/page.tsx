import DevForm from '@/app/(developers)/DevForm'
import { getCompanyData, getDev } from '@/utils/supabase'
import { Developer } from '@/utils/types'

export default async function EditDev({ params }) {
  let dev: Developer | null = await getDev(params.slug) // Provide a type annotation

  if (dev) {
    const myCompany = await getCompanyData()

    if (dev.company !== myCompany.id) {
      dev = null
    }
  }

  return (
    <div className={'mx-auto max-w-3xl p-5'}>
      {dev ? (
        <DevForm isNew={false} dev={dev}></DevForm>
      ) : (
        <p>Developer not found</p>
      )}
    </div>
  )
}
