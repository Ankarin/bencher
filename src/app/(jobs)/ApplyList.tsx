import { Job } from '@/utils/types'
import JobCard from '@/app/(jobs)/JobCard'

export default function JobList({
  jobs,
  isMine = false,
}: {
  jobs: Job[]
  isMine?: boolean
}) {
  return (
    <div className='mx-auto my-5 grid  max-w-3xl gap-3 md:my-10  '>
      {jobs?.map((job, key) => (
        <JobCard key={key} isMine={isMine} job={job}></JobCard>
      ))}
    </div>
  )
}
