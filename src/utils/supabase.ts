'use server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Company, Developer, User } from '@/utils/types'

const supa = async () => {
  return createServerComponentClient({ cookies })
}

const getUser = async () => {
  const supabase = await supa()
  const { data } = await supabase.auth.getUser()
  console.log(data)
  if (data.user) {
    return data.user
  } else {
    return null
  }
}

const getUserData = async (): Promise<User> => {
  const supabase = await supa()
  const user = await getUser()
  if (user) {
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('id', user.id)
    if (error) throw error.message
    return data[0]
  } else {
    return null
  }
}
const getCompanyData = async (): Promise<Company> => {
  const supabase = await supa()
  const userData = await getUserData()
  if (userData && userData.company_id) {
    const { data, error } = await supabase
      .from('companies')
      .select()
      .eq('id', userData.company_id)
    if (error) throw error.message
    return data[0]
  } else {
    return null
  }
}

const getCompanies = async (): Promise<Company[]> => {
  const supabase = await supa()
  const { data, error } = await supabase.from('companies').select()
  if (error) throw error.message
  return data
}

const getMyDevs = async (): Promise<Developer[]> => {
  const supabase = await supa()
  const userData = await getUserData()
  const { data, error } = await supabase
    .from('developers')
    .select()
    .eq('company', userData.company_id)
  if (error) throw error.message
  return data
}
const getDevs = async (): Promise<Developer[]> => {
  const supabase = await supa()
  const { data, error } = await supabase.from('developers').select()
  if (error) throw error.message
  return data
}

const getDev = async (devId): Promise<Developer | null> => {
  const supabase = await supa()
  const { data, error } = await supabase
    .from('developers')
    .select()
    .eq('id', devId)
  if (error) return null
  if (data[0]) {
    return data[0]
  } else {
    return null
  }
}

export {
  getUser,
  getUserData,
  getCompanyData,
  getCompanies,
  getMyDevs,
  getDevs,
  getDev,
}
