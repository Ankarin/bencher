import JobForm from '@/app/(jobs)/JobForm'
import { getCompanyData, getJob } from '@/utils/supabase'
import { Job } from '@/utils/types'

export default async function EditJob({ params }) {
  let job: Job | null = await getJob(params.slug) // Provide a type annotation

  if (job) {
    const myCompany = await getCompanyData()

    if (job.company !== myCompany.id) {
      job = null
    }
  }

  return (
    <div className={'mx-auto max-w-3xl p-5'}>
      {job ? <JobForm isNew={false} job={job}></JobForm> : <p>Job not found</p>}
    </div>
  )
}
