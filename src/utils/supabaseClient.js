'use client'
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'
import {getUser} from "src/utils/supabase";

const supabase = createClientComponentClient()


const getCurrentUser = async () => {
    return await supabase.auth.getUser()
}

const updateUserData = async (params) => {
    const {data, error} = await supabase.from('users').update(params).eq('id', params.id)
    if (error) {
        return error
    } else {
        return data
    }
}
const updateCompany = async (params) => await supabase.from('companies').update(params).eq('id', params.id)
const createCompany = async (params) => {
    const user = await getUser()
    params.admin = user.id
    const res = await supabase.from('companies').insert(params).select()
    await supabase.from('users').update({company_id: res.data[0].id}).eq('id', user.id);
    return res
}


export {updateUserData, updateCompany, createCompany}
