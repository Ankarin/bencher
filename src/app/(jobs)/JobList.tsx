import { Company, ExistingJob } from '@/utils/types'
import JobCard from '@/app/(jobs)/JobCard'
import { getCompanyData } from '@/utils/supabase'

export default async function JobList({ jobs }: { jobs: ExistingJob[] }) {
  const myCompany: Company | null = await getCompanyData()
  return (
    <div className='mx-auto my-5 grid  max-w-3xl gap-3 md:my-10  '>
      {jobs?.map((job, key) => (
        <JobCard
          key={key}
          job={job}
          isMine={myCompany?.id === job.company}
        ></JobCard>
      ))}
    </div>
  )
}
