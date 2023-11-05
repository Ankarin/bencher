'use server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import {
  Company,
  ExistingDeveloper,
  User,
  ExistingJob,
  ApplyTypeWithDev,
  Message,
  ChatUser,
  ChatType,
  ExtendedChatType,
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
const getDevs = async (page: number): Promise<ExistingDeveloper[]> => {
  const { data, error } = await supa()
    .from('developers')
    .select('*', { count: 'exact' })
    .eq('public', true)
    .order('created_at', { ascending: false })
    .range(...returnRange(page))
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

const getMessages = async (chatId: string): Promise<Message[] | []> => {
  const { data, error } = await supa()
    .from('messages')
    .select()
    .eq('chat', chatId)
  if (error) {
    return []
  } else {
    return data
  }
}

const getChatUser = async (id: string): Promise<ChatUser | null> => {
  const { data, error } = await supa()
    .from('users')
    .select('id, first_name, last_name, company_id(id, logo_url, name)')
    .eq('company_id', id)

  if (error) return null
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return data[0]
}

const getChat = async (
  sender_id: string,
  receiver_id: string
): Promise<ChatType | null> => {
  const { data, error } = await supa()
    .from('chats')
    .select()
    .or(`user_1.eq.${sender_id}, user_2.eq.${sender_id}`)
  if (error) return null
  if (data && data.length > 0) {
    const filtered = data.filter((chat) => {
      if (chat.user_1 === receiver_id) {
        return chat.user_2 === sender_id
      } else if (chat.user_2 === receiver_id) {
        return chat.user_1 === sender_id
      }
    })
    return filtered[0]
  } else {
    return null
  }
}

const getMyChats = async (my_id: string): Promise<ExtendedChatType[] | []> => {
  const { data, error } = await supa()
    .from('chats')
    .select(
      '*, user_1(id, first_name, last_name, company_id(id, logo_url, name)), user_2(id, first_name, last_name, company_id(id, logo_url, name))'
    )
    .or(`user_1.eq.${my_id}, user_2.eq.${my_id}`)

  if (error) {
    return []
  } else {
    return data?.map((chat) => {
      if (chat.user_1.id === my_id) {
        return { ...chat, me: chat.user_1, friend: chat.user_2 }
      } else {
        return { ...chat, me: chat.user_2, friend: chat.user_1 }
      }
    })
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
  getMessages,
  getChatUser,
  getChat,
  getMyChats,
}
