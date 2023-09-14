'use server'
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs";
import {cookies} from 'next/headers'

const getSupabase = async () => {
    return createServerComponentClient({cookies});
}
const supabase = await getSupabase()

const getUser = async () => {
    const {data} = await supabase.auth.getUser()
    return data.user
}

const getUserData = async (uid) => {
    const {data} = await supabase.from('users').select().eq('id', uid)
    return data[0]
}
const getCompanyData = async (company_id) => {
    const res = await supabase.from('companies').select().eq('id', company_id)
    return res.data[0]
}

const getCompanies = async () => {
    const res = await supabase.from('companies').select()
    return res.data
}


export {getUser, getUserData, getCompanyData, getCompanies}
