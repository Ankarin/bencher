import JobList from '@/app/(jobs)/JobList'
import { ExistingJob } from '@/utils/types'
import { getJobs } from '@/utils/supabase'

export default async function JobsWrapper({ page }: { page: number }) {
  const jobs: ExistingJob[] | null = await getJobs(page)
  return <JobList jobs={jobs}></JobList>
}
