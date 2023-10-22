import JobList from '@/app/(jobs)/JobList'
import { ExistingJob } from '@/utils/types'
import { getJobs } from '@/utils/supabase'

export default async function JobsWrapper() {
  const jobs: ExistingJob[] | null = await getJobs()
  return <JobList jobs={jobs}></JobList>
}
