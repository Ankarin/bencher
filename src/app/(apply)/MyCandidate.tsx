'use client'
import { ApplyTypeWithDev, Company } from '@/utils/types'
import { zust } from '@/store'
import DevCard from '@/app/(developers)/DevCard'
import ConfirmDelete from '@/components/app/Confirm'
import React from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import Toast from '@/components/app/Toast'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

export default function MyCandidate({ apply }: { apply: ApplyTypeWithDev }) {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const zustMyCompany: Company | null = zust((state) => state.myCompany)
  const isMine = zustMyCompany?.id === apply.provider
  const cancelApply = async () => {
    setOpenConfirm(true)
  }
  const [openConfirm, setOpenConfirm] = React.useState(false)
  const confirmDelete = async () => {
    const { error } = await supabase.from('applies').delete().eq('id', apply.id)
    router.refresh()
    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Apply deleted!')
    }
    setOpenConfirm(false)
  }
  return (
    <>
      <Toast />
      <ConfirmDelete
        open={openConfirm}
        setOpen={setOpenConfirm}
        confirmDelete={confirmDelete}
      />
      <DevCard
        developer={apply.developer}
        isMine={isMine}
        cancelApply={cancelApply}
      />
    </>
  )
}
