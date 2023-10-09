'use client'
import JobForm from '@/app/(requests)/add-job/JobForm'

export default function AddRequest() {
  return (
    <div className={'mx-auto max-w-5xl p-5'}>
      <JobForm isNew={true} job={null}></JobForm>
    </div>
  )
}
