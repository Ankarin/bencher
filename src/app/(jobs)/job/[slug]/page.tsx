import { Job, Company, PageProps } from '@/utils/types';
import { getJob, getCompanyData } from '@/utils/supabase';
import JobCard from '@/app/(jobs)/JobCard';
import Apply from '@/app/(jobs)/job/[slug]/Apply';

export default async function JobPage({ params }: PageProps) {
  const job: Job | null = await getJob(params.slug);
  const myCompany: Company | null = await getCompanyData();

  const isMine = (): boolean => job?.company === myCompany?.id;

  return (
    <div className={'mx-auto max-w-3xl p-5'}>
      {job ? (
        <div className={'grid grid-cols-1 gap-5'}>
          <JobCard job={job} isMine={isMine()} isApply={false}></JobCard>

          {!isMine() && <Apply />}
        </div>
      ) : (
        <p>Job not found</p>
      )}
    </div>
  );
}
