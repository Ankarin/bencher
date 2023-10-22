import { ExistingJob } from '@/utils/types'
import { getJobsIApplied } from '@/utils/supabase'
import JobList from '@/app/(jobs)/JobList'

export default async function MineApplies() {
  const jobs: ExistingJob[] | null = await getJobsIApplied()

  return <JobList jobs={jobs}></JobList>
}
