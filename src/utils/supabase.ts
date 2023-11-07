'use server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import {
  Company,
  ExistingDeveloper,
  User,
  ExistingJob,
  ApplyTypeWithDev,
  DevSearchParams,
} from '@/utils/types'

const supa = () => {
  const cookieStore = cookies()
  return createServerComponentClient({ cookies: () => cookieStore })
}

const countPages = async (table: string): Promise<number> => {
  const { count, error } = await supa()
    .from(table)
    .select('*', { count: 'exact', head: true })
    .eq('public', true)
  if (error) return 0
  return Math.ceil(!count ? 1 : count / 20)
}

const returnRange = (page: number): [number, number] => {
  const lastPage = page * 20 - 1
  const firstPage = lastPage - 19
  return [firstPage, lastPage]
}

const getUser = async () => {
  const { data } = await supa().auth.getUser()
  if (data.user) {
    return data.user
  }
}

const getUserData = async (): Promise<User | null> => {
  const user = await getUser()
  if (user) {
    const { data, error } = await supa()
      .from('users')
      .select()
      .eq('id', user.id)
    if (error) throw error.message
    return data[0]
  } else return null
}
const getCompanyData = async (): Promise<Company | null> => {
  const userData = await getUserData()
  if (userData && userData.company_id) {
    const { data, error } = await supa()
      .from('companies')
      .select()
      .eq('id', userData.company_id)
    if (error) throw error.message
    return data[0]
  } else {
    return null
  }
}

const getCompanyById = async (id: string): Promise<Company> => {
  const { data, error } = await supa().from('companies').select().eq('id', id)
  if (error) throw error.message
  return data[0]
}

const getCompanies = async (page: number): Promise<Company[]> => {
  const { data, error } = await supa()
    .from('companies')
    .select()
    .order('created_at', { ascending: true })
    .range(...returnRange(page))
  if (error) throw error.message
  return data
}

const getMyDevs = async (): Promise<ExistingDeveloper[]> => {
  const userData = await getUserData()
  const { data, error } = await supa()
    .from('developers')
    .select()
    .eq('company', userData?.company_id)
    .order('created_at', { ascending: false })
  if (error) throw error.message
  return data
}
const getDevs = async (
  page: number,
  searchParams: DevSearchParams | null
): Promise<ExistingDeveloper[]> => {
  console.log(searchParams)

  // category?: string
  // english?: string
  // rate?: string
  // experience?: string
  // mainSkills?: string

  let query = supa()
    .from('developers')
    .select('*', { count: 'exact' })
    .eq('public', true)
    .order('created_at', { ascending: false })
    .range(...returnRange(page))

  if (searchParams?.category) {
    query = query.eq('category', searchParams.category)
  }
  if (searchParams?.experience) {
    query = query.gte('experience', searchParams.experience)
  }
  if (searchParams?.mainSkills) {
    query = query.contains('skills', searchParams.mainSkills.split(','))
  }
  if (searchParams?.rate) {
    query = query.lte('hourly_rate', searchParams.rate)
  }

  const { data, error } = await query
  if (error) throw error.message
  return data
}

const getDev = async (devId: string): Promise<ExistingDeveloper | null> => {
  const myCompany = await getCompanyData()
  const { data, error } = await supa()
    .from('developers')
    .select()
    .eq('id', devId)
  if (error) return null
  if (data[0] && data[0].public) {
    return data[0]
  } else if (data[0] && data[0].company === myCompany?.id) {
    return data[0]
  } else {
    return null
  }
}

const getJob = async (id: string): Promise<ExistingJob | null> => {
  const myCompany: Company | null = await getCompanyData()

  const { data, error } = myCompany?.id
    ? await supa()
        .from('jobs')
        .select('*, my_applies:applies(count), applies(count)')
        .eq('id', id)
        .filter('my_applies.provider', 'eq', myCompany?.id ?? '')
    : await supa()
        .from('jobs')
        .select('*, my_applies:applies(count), applies(count)')
        .eq('id', id)

  if (error) return null
  if (data[0] && data[0].public) {
    return data[0]
  } else if ((data[0] && data[0].company === myCompany?.id) ?? '') {
    return data[0]
  } else {
    return null
  }
}

const getDevsByCompany = async (id: string): Promise<ExistingDeveloper[]> => {
  const { data, error } = await supa()
    .from('developers')
    .select()
    .eq('company', id)
    .eq('public', true)
    .order('created_at', { ascending: false })

  if (error) throw error.message
  return data
}
const getJobs = async (page: number): Promise<ExistingJob[]> => {
  const userData = await getUserData()
  if (userData?.company_id) {
    const myCompany = await getCompanyData()
    const { data, error } = await supa()
      .from('jobs')
      .select('*, my_applies:applies(count), applies(count)')
      .filter('my_applies.provider', 'eq', myCompany?.id)
      .eq('public', true)
      .order('created_at', { ascending: false })
      .range(...returnRange(page))
    if (error) throw error.message
    return data
  } else {
    const { data, error } = await supa()
      .from('jobs')
      .select('*,  applies(count)')
      .eq('public', true)
      .order('created_at', { ascending: false })
      .range(...returnRange(page))
    if (error) throw error.message
    return data
  }
}

const getMyJobs = async (): Promise<ExistingJob[]> => {
  const userData = await getUserData()
  const { data, error } = await supa()
    .from('jobs')
    .select('*,  applies(count)')
    .eq('company', userData?.company_id)
    .order('created_at', { ascending: false })
  if (error) throw error.message
  return data
}

const getMyAppliesForJob = async (
  jobId: string
): Promise<ApplyTypeWithDev[]> => {
  const userData = await getUserData()
  const { data, error } = await supa()
    .from('applies')
    .select('*,  developer(*)')
    .eq('job', jobId)
    .eq('provider', userData?.company_id)
    .order('created_at', { ascending: true })
  if (error) throw error.message
  return data.filter((apply) => apply.developer.public)
}

const getAppliesForJob = async (jobId: string): Promise<ApplyTypeWithDev[]> => {
  const { data, error } = await supa()
    .from('applies')
    .select('*,  developer(*)')
    .eq('job', jobId)
    .order('created_at', { ascending: true })
  if (error) throw error.message
  return data.filter((apply) => apply.developer.public)
}

const getJobsIApplied = async (): Promise<ExistingJob[]> => {
  const company: Company | null = await getCompanyData()
  const { data, error } = await supa()
    .from('applies')
    .select('job')
    .eq('provider', company?.id)
    .order('created_at', { ascending: false })

  if (error) throw error.message
  else {
    const jobIds = data.map((row) => row.job)

    const { data: jobs, error: secondError } = await supa()
      .from('jobs')
      .select('*, my_applies:applies(count), applies(count)')
      .filter('my_applies.provider', 'eq', company?.id)
      .in('id', jobIds)
      .eq('public', true)
      .order('created_at', { ascending: false })

    if (secondError) throw secondError.message
    else return jobs
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
  getCompanyById,
  getDevsByCompany,
  getJob,
  getJobs,
  getMyJobs,
  getAppliesForJob,
  getMyAppliesForJob,
  getJobsIApplied,
  countPages,
}
