import {
  Company,
  PageProps,
  ExistingJob,
  ApplyTypeWithDev,
} from '@/utils/types'
import { getJob, getCompanyData, getMyAppliesForJob } from '@/utils/supabase'
import JobCard from '@/app/(jobs)/JobCard'
import Apply from '@/app/(apply)/Apply'
import ApplyList from '@/app/(apply)/ApplyList'

export default async function JobPage({ params }: PageProps) {
  const job: ExistingJob | null = await getJob(params.slug)
  const myCompany: Company | null = await getCompanyData()
  const myApplies: ApplyTypeWithDev[] | null = job
    ? await getMyAppliesForJob(job?.id)
    : null

  const isMine = (): boolean => job?.company === myCompany?.id

  return (
    <div className={'mx-auto max-w-3xl p-5'}>
      {job ? (
        <div>
          <JobCard job={job} isApply={false}></JobCard>

          {!isMine() && job ? (
            <>
              <div className={'flex items-center justify-between pt-4'}>
                <p className={'flex text-3xl'}>Your applies:</p>{' '}
                <Apply job={job} applies={myApplies ?? []} />
              </div>
              {myApplies ? <ApplyList applies={myApplies} /> : ''}
            </>
          ) : (
            ''
          )}
        </div>
      ) : (
        <p>Job not found</p>
      )}
    </div>
  )
}
