import JobList from '@/app/(jobs)/JobList'
import { ExistingJob } from '@/utils/types'
import { getMyJobs } from '@/utils/supabase'

export default async function MyJobsWrapper() {
  const jobs: ExistingJob[] | null = await getMyJobs()
  return <JobList jobs={jobs}></JobList>
}
