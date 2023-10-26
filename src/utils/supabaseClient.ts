'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Company, User } from '@/utils/types'

const supabase = createClientComponentClient()

const updateUserData = async (params: User) => {
  const { data, error } = await supabase
    .from('users')
    .update(params)
    .eq('id', params.id)
  if (error) {
    throw error
  } else {
    return data
  }
}
const updateCompany = async (params: Company) => {
  await supabase.from('companies').update(params).eq('id', params.id)
}
const createCompany = async (params: Company) => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return
  params.admin = user.id
  const { data, error } = await supabase
    .from('companies')
    .insert(params)
    .select()
  if (error) {
    throw error
  } else {
    await supabase
      .from('users')
      .update({ company_id: data[0].id })
      .eq('id', user.id)
  }
}

const getCompanyData = async (company_id: string) => {
  const res = await supabase.from('companies').select().eq('id', company_id)
  return res.data ? res.data[0] : null
}

const supaDownload = async (url: string) => {
  const { data } = supabase.storage.from('bitbencher').getPublicUrl(url)

  window.open(data.publicUrl)
}

export {
  updateUserData,
  updateCompany,
  createCompany,
  getCompanyData,
  supaDownload,
}
