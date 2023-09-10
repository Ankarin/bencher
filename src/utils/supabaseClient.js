'use client'
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient()



const updateUserData = async (params) => {
    const {data, error} = await supabase.from('users').update(params).eq('id', params.id)
    if(error) {
        return error
    } else {
        return data
    }
}
const updateCompany = async (params) => await supabase.from('companies').update(params).eq('id', params.id)
const createCompany = async (params) => {
    const res = await supabase.from('companies').insert(params).select()
return res
}

export { updateUserData, updateCompany, createCompany}
