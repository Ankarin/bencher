'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import {
  ChatType,
  ChatUser,
  Company,
  ExtendedChatType,
  Message,
  User,
} from '@/utils/types'

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

const updatePassword = async (pass: string) => {
  const { error } = await supabase.auth.updateUser({
    password: pass,
  })
  return !error
}

const changeName = async (name: string) => {
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return

  const { error } = await supabase
    .from('users')
    .update({ first_name: name })
    .eq('id', user.id)
  return !error
}
const getMyChats = async (my_id: string): Promise<ExtendedChatType[] | []> => {
  const { data, error } = await supabase
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

const getLastMessage = async (chatId: string): Promise<Message | null> => {
  const { data, error } = await supabase
    .from('messages')
    .select()
    .eq('chat', chatId)
    .order('created_at', { ascending: false })
    .limit(1)
  if (error) {
    return null
  } else {
    return data[0]
  }
}

const getMessages = async (chatId: string): Promise<Message[] | []> => {
  const { data, error } = await supabase
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
  const { data, error } = await supabase
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
  const { data, error } = await supabase
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

export {
  updateUserData,
  updateCompany,
  createCompany,
  getCompanyData,
  supaDownload,
  updatePassword,
  changeName,
  getMyChats,
  getLastMessage,
  getMessages,
  getChatUser,
  getChat,
}
