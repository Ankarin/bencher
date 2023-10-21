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
import Apply from '@/app/(apply)/Apply'
import ApplyList from '@/app/(apply)/ApplyList'
import Candidates from '@/app/(jobs)/Candidates'

export default async function JobPage({ params }: PageProps) {
  const job: ExistingJob | null = await getJob(params.slug)
  const myCompany: Company | null = await getCompanyData()
  const isMine = (): boolean => job?.company === myCompany?.id

  let applies: ApplyTypeWithDev[] | null

  if (!isMine() && job) {
    applies = await getMyAppliesForJob(job?.id)
  } else if (isMine() && job) {
    applies = await getAppliesForJob(job?.id)
  } else applies = null

  return (
    <div className={'mx-auto max-w-3xl p-5'}>
      {job ? (
        <div>
          <JobCard job={job} isApply={false}></JobCard>

          {!isMine() && job ? (
            <>
              <div className={'flex items-center justify-between pt-4'}>
                <p className={'flex text-3xl'}>Your applies:</p>{' '}
                <Apply job={job} applies={applies ?? []} />
              </div>

              <ApplyList applies={applies ?? []} />
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
