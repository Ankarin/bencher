import { Job, Company } from '@/utils/types'
import { getJob, getCompanyData } from '@/utils/supabase'
import JobCard from '@/app/(jobs)/JobCard'

export default async function JobPage({ params }) {
  const job: Job = await getJob(params.slug)
  const myCompany: Company = await getCompanyData()

  const isMine = (): boolean => job?.company === myCompany?.id

  return (
    <div className={'mx-auto max-w-3xl p-5'}>
      {job ? (
        <div className={'grid grid-cols-1 gap-5'}>
          <JobCard job={job} isMine={isMine()}></JobCard>
        </div>
      ) : (
        <p>Job not found</p>
      )}
    </div>
  )
}
