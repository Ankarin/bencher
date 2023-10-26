import {
  ApplyTypeWithDev,
  Company,
  ExistingJob,
  PageProps,
} from '@/utils/types'
import {
  getCompanyData,
  getJob,
  getAppliesForJob,
  getMyAppliesForJob,
} from '@/utils/supabase'
import JobCard from '@/app/(jobs)/JobCard'
import Apply from '@/app/(apply)/(select-dev-and-apply)/Apply'
import MyCandidates from '@/app/(apply)/MyCandidates'
import Candidates from '@/app/(apply)/Candidates'

// export const revalidate = 60
export default async function JobPage({ params }: PageProps) {
  const job: ExistingJob | null = await getJob(params.slug)
  const myCompany: Company | null = await getCompanyData()
  const isMine = (): boolean => job?.company === myCompany?.id ?? ''

  let applies: ApplyTypeWithDev[] | null

  if (!myCompany?.id && job) {
    applies = await getAppliesForJob(job?.id)
  } else if (!isMine() && job) {
    applies = await getMyAppliesForJob(job?.id)
  } else if (isMine() && job) {
    applies = await getAppliesForJob(job?.id)
  } else applies = null

  return (
    <div className={'mx-auto max-w-3xl p-5'}>
      {job ? (
        <div>
          <JobCard job={job} isApply={false} isMine={isMine()}></JobCard>

          {!isMine() && job ? (
            <>
              <div className={'flex items-center justify-between pt-4'}>
                <p className={'flex text-3xl'}>Your applies:</p>{' '}
                <Apply job={job} applies={applies ?? []} />
              </div>

              <MyCandidates applies={applies ?? []} />
            </>
          ) : (
            <Candidates applies={applies ?? []} />
          )}
        </div>
      ) : (
        <p>Job not found</p>
      )}
    </div>
  )
}
