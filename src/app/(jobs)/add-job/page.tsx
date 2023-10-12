'use client'
import JobForm from '@/app/(jobs)/JobForm'

export default function AddRequest() {
  return (
    <div className={'mx-auto max-w-3xl p-5'}>
      <JobForm isNew={true} job={null}></JobForm>
    </div>
  )
}
